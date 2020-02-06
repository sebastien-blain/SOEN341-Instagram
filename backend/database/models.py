from .db import db

# Create a class for all table that should be in the database


class User(db.Document):
    email = db.EmailField(required=True, unique=True)
    username = db.StringField(required=True, unique=True)
    fname = db.StringField(required=True)
    lname = db.StringField()
    password = db.StringField(required=True, max_length=40)
    pictures = db.ListField(db.IntField())
    nb_followers = db.IntField()
    followers = db.ListField(db.StringField())
    nb_following = db.IntField()
    following = db.ListField(db.StringField())


class Comment(db.Document):
    oid = db.IntField()
    user_id = db.StringField()
    message = db.StringField()


class Picture(db.Document):
    oid = db.IntField(required=True)
    date = db.DateTimeField(required=True)
    owner = db.StringField()
    user = db.StringField(required=True)
    link = db.URLField()
    nb_likes = db.IntField()
    nb_comments = db.IntField()
    comments = db.ListField(db.IntField())


class ImageQueue(db.Document):
    user_name = db.StringField(required=True)
    pictures = db.ListField(db.IntField())
