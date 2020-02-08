from flask import Response, request
from database.models import User
from flask_restful import Resource
from helpers.helper_methods import *

# TODO: Using the same system, we need to write more apis for all the possible routes

# Login / register route


class LoginApi(Resource):
    def post(self):
        body = request.get_json()
        fields = ['username', 'password']
        if not fields_are_in(body, fields):
            return {'error': 'Missing a field'}, 400

        user = User.objects(username=body.get('username')).first()
        if user is None:
            new_user = {
                'username': body.get('username'),
                # Will add a hash password for security in the future
                'password': body.get('password'),
                'nb_followers': 0,
                'nb_following': 0,
            }
            new_user = User(**new_user)
            new_user.save()
            # Will change for the token created with authorization
            return {'message': 'User {} sucessfully added to the database'.format(new_user.username)}, 200
        # Will change to hashed password int he future
        user_password = body.get('password')
        if user_password != user.password:
            return {'error': 'Password does not match username'}, 200
        if user_password == user.password:
            # Will change for the token created with authorization
            return {'message': 'User {} has login'.format(user.username)}, 200


class UserApi(Resource):
    def get(self, username):
        # Looks into database and gets the object where name=name
        user = User.objects.get(username=username).to_json()
        # Returns the user object
        return Response(user, mimetype="application/json", status=200)

    def post(self, username):
        body = request.get_json()
        # Should check if name not already in the database, because name is unique
        user = User(**body).save()
        id = user.id
        return {'id': str(id)}, 200

# Search an account route, will return a list of user with almost same name

# Fetch image queue of user homepage

# Fetch user page, display all his picture, with comments all inside

# Post a picture, look at same picture, add to user and add to followers queue

# Follow someone, add them to your following, add you to their followers and add their picture to your queue
