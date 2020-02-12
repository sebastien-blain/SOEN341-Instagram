from flask_mongoengine import MongoEngine
from pymongo import MongoClient

client = MongoClient()


# To clear the local database at the start of the server to avoid conflict in changing databases tables
def delete_db():
    client.drop_database('mypanda')
    mypanda = client['mypanda']
    collections = mypanda.collection_names()
    for collection_name in collections:
        mypanda[collection_name].remove()


#delete_db()
db = MongoEngine()


def initialize_db(app):
    db.init_app(app)
