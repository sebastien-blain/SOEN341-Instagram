from flask import Response, request
from database.models import User, Picture
from flask_restful import Resource


# TODO: Using the same system, we need to write more apis for all the possible routes

class UserApi(Resource):
    def get(self, name):
        # Looks into database and gets the object where name=name
        user = User.objects.get(name=name).to_json()
        # Returns the user object
        return Response(user, mimetype="application/json", status=200)

    def post(self, name):
        body = request.get_json()
        # Should check if name not already in the database, because name is unique
        user = User(**body).save()
        id = user.id
        return {'id': str(id)}, 200

# TODO: Make multiple apis for the different utilities


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
