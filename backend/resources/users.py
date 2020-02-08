from flask import Response, request
from database.models import User
from flask_restful import Resource
from helpers.helper_methods import *

# TODO: Using the same system, we need to write more apis for all the possible routes

# Login / register route


class LoginApi(Resource):
    def post(self):
        body = request.get_json()
        fields = ['email', 'password']
        if not fields_are_in(body, fields):
            return {'error': 'Missing a field'}, 400

        user = User.objects(email=body.get('email')).first()

        if user is not None:
            user = user.to_json()
        # Missing Authorization
        return Response(user, mimetype="application/json", status=200)


class RegisterApi(Resource):
    def post(self):
        body = request.get_json()
        fields = ['email', 'username', 'fname', 'lname', 'password']
        if not fields_are_in(body, fields):
            return {'error': 'Missing a field'}, 400
        if not is_email(body.get('email')):
            return {'error': 'Invalid field email'}, 400

        user = User(**body)
        user.nb_followers = 0
        user.nb_following = 0
        user.save()

        return {'message': 'User sucessfully added to database'}, 200


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
