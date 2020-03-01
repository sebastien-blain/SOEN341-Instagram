from flask import Response, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from database.models import User, Picture, Comment
from flask_restful import Resource
from helpers.helper_methods import *
import datetime


class PostPictureAPI(Resource):
    @jwt_required
    def post(self):
        body = request.get_json()
        fields = ['link', 'message']
        if not fields_are_in(body, fields):
            return {'error': 'Missing a field'}, 400
        if is_empy_or_none(dict({'link': body.get('link'), 'message': body.get('message')})):
            return {'error': 'A field is empty or None'}, 400

        # Get current requesting user
        user_id = get_jwt_identity()
        current_user = User.objects(id=user_id).first()

        if current_user is None:
            return {'error': 'Header token is not good, please login again'}, 401

        picture = {
            'user': current_user.username,
            'owner': current_user.username,
            'link': body.get('link'),
            'message': body.get('message'),
            'date': datetime.datetime.now(),
            'nb_likes': 0,
            'nb_comments': 0,
        }
        picture = Picture(**picture)
        picture.save()

        User.objects(id=user_id).update_one(push__pictures=picture)
        User.objects(id=user_id).update_one(nb_pictures=current_user.nb_pictures + 1)

        User.objects(following__in=[current_user]).update_one(push__image_queue=picture)

        return {'message': 'Picture successfully added to user {} '.format(current_user.username)}, 200


class PostCommentAPI(Resource):
    @jwt_required
    def post(self):
        body = request.get_json()
        fields = ['picture_id', 'message']
        if not fields_are_in(body, fields):
            return {'error': 'Missing a field'}, 400
        if is_empy_or_none(body):
            return {'error': 'A field is empty or None'}, 400

        # Get current requesting user
        user_id = get_jwt_identity()
        current_user = User.objects(id=user_id).first()

        if current_user is None:
            return {'error': 'Header token is not good, please login again'}, 401

        picture = Picture.objects(id=body.get('picture_id')).first()

        if picture is None:
            return {'error': 'Picture id does not exist in database'}, 401
        comment = {
            'user': current_user.username,
            'message': body.get('message')
        }

        comment = Comment(**comment)
        comment.save()

        Picture.objects(id=body.get('picture_id')).update_one(push__comments=comment)
        Picture.objects(id=body.get('picture_id')).update_one(nb_comments=picture.nb_comments + 1)

        return {'message': 'Comment successfully added to picture'}, 200

