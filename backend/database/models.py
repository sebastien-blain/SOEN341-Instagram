from .db import db

# Create a class for all table that should be in the database
# Should have:
# User, picture,


class User(db.Document):
    email = db.EmailField(required=True, unique=True)
    username = db.StringField(required=True, unique=True)
    fname = db.StringField(required=True)
    lname = db.StringField()
    password = db.StringField(required=True)
    own_pictures = db.ListField()
    liked_pictures = db.ListField()
    pictures_queue = db.ListField()
    nb_followers = db.IntField()
    followers = db.ListField()
    nb_following = db.IntField()
    following = db.ListField()

# TODO


class Picture(db.Document):
    link = db.StringField()
