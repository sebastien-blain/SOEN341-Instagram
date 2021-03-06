from .db import db
from flask_bcrypt import generate_password_hash, check_password_hash
# Create a class for all table that should be in the database


class User(db.Document):
    username = db.StringField(required=True, unique=True)
    password = db.StringField(required=True)
    bio = db.StringField()
    nb_pictures = db.IntField()
    pictures = db.ListField(db.ReferenceField('Picture'), reverse_delete_rule=db.PULL)
    nb_followers = db.IntField()
    followers = db.ListField(db.ReferenceField('User'), reverse_delete_rule=db.PULL)
    nb_following = db.IntField()
    following = db.ListField(db.ReferenceField('User'), reverse_delete_rule=db.PULL)
    image_queue = db.ListField(db.ReferenceField('Picture'), reverse_delete_rule=db.PULL)
    nb_login = db.IntField()
    dates = db.ListField(db.StringField())
    
    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf-8')

    def check_password(self, password):
        return check_password_hash(self.password, password)


class Comment(db.Document):
    user = db.StringField()
    message = db.StringField()


class Picture(db.Document):
    date = db.DateTimeField(required=True)
    owner = db.StringField()
    user = db.StringField()
    link = db.StringField()
    message = db.StringField()
    nb_likes = db.IntField()
    nb_comments = db.IntField()
    comments = db.ListField(db.ReferenceField(
        'Comment', reverse_delete_rule=db.PULL))
    liked_by = db.ListField(db.StringField())


Picture.register_delete_rule(Comment, 'added_picture', db.CASCADE)
User.register_delete_rule(Picture, 'user', db.CASCADE)
