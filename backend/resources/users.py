from flask import Response, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from database.models import User
from flask_restful import Resource
from helpers.helper_methods import *
import datetime

# TODO: Using the same system, we need to write more apis for all the possible routes

# Login / register route


class LoginApi(Resource):
    def post(self):
        body = request.get_json()
        fields = ['username', 'password']
        if not fields_are_in(body, fields):
            return {'error': 'Missing a field'}, 400
        if is_empy_or_none(body):
            return {'error': 'A field is empty or None'}, 400

        user = User.objects(username=body.get('username')).first()
        if user is None:
            new_user = {
                'username': body.get('username'),
                'password': body.get('password'),
                'nb_followers': 0,
                'nb_following': 0,
            }
            new_user = User(**new_user)
            new_user.hash_password()
            new_user.save()
            expires = datetime.timedelta(hours=3)
            access_token = create_access_token(identity=str(new_user.id), expires_delta=expires)
            return {'token': access_token}, 200
        authorized = user.check_password(body.get('password'))
        if not authorized:
            return {'error': 'Password does not match username'}, 401
        if authorized:
            expires = datetime.timedelta(hours=3)
            access_token = create_access_token(identity=str(user.id), expires_delta=expires)
            return {'token': access_token}, 200


class FollowUserApi(Resource):
    @jwt_required
    def post(self):
        body = request.get_json()
        fields = ['follow']
        if not fields_are_in(body, fields):
            return {'error': 'Missing a field'}, 400
        if is_empy_or_none(body):
            return {'error': 'A field is empty or None'}, 400

        # Get current requesting user
        user_id = get_jwt_identity()
        current_user = User.objects(id=user_id).first()

        if current_user is None:
            return {'error': 'Header token is not good, please login again'}, 401
        
        # Get the user we want to follow
        new_follower = User.objects(username=body.get('follow')).first()
        if new_follower is None:
            return {'error': 'User {} does not exist'.format(body.get('follow'))}, 401

        if new_follower.username == current_user.username:
            return {'error': 'User cannot follow itself'}, 401

        for f in current_user.following:
            if f == new_follower:
                return {'message': 'User {} is already following {}'.format(current_user.username, new_follower.username)}, 200

        User.objects(id=user_id).update_one(push__following=new_follower)
        User.objects(username=body.get('follow')).update_one(push__followers=current_user)
        current_user.update(nb_following=current_user.nb_following + 1)
        new_follower.update(nb_followers=new_follower.nb_followers + 1)

        return {'message': 'User {} is now following {}'.format(current_user.username, new_follower.username)}, 200


class UserApi(Resource):
    @jwt_required
    def get(self, username):
        # Looks into database and gets the object where name=name
        user = User.objects.get(username=username).to_json()
        # Returns the user object
        return Response(user, mimetype="application/json", status=200)

    @jwt_required
    def post(self, username):
        uid = get_jwt_identity()
        u = User.objects.get(id=uid)
        # Should check if name not already in the database, because name is unique
        # user = User(**body).save()
        return {'id': u.to_json()}, 200

# Search an account route, will return a list of user with almost same name

# Fetch image queue of user homepage

# Fetch user page, display all his picture, with comments all inside

# Post a picture, look at same picture, add to user and add to followers queue

# Follow someone, add them to your following, add you to their followers and add their picture to your queue
