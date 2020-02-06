from flask import Response, request
from database.models import User
from flask_restful import Resource


# TODO: Using the same system, we need to write more apis for all the possible routes

# Login / register route

class LoginApi(Resource):
    def post(self, user):
        body = request.get_json()
        email = body.email
        print(email)
        print(username)


class RegisterApi(Resource):
    def post(self, name):
        body = request.get_json()
        email = body['email']
        print(email)
        # print(email)
        # print(username)


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


class PictureApi(Resource):
    def get(self, name):
        # Looks into database and gets the object where name=name
        user = Picture.objects.get(name=name).to_json()
        # Returns the user object
        return Response(user, mimetype="application/json", status=200)

    def post(self, name):
        body = request.get_json()
        # Should check if name not already in the database, because name is unique
        user = Picture(**body).save()
        id = user.id
        return {'id': str(id)}, 200
