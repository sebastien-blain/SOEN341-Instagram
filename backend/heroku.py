from flask import Flask
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from database.db import initialize_db
from flask_restful import Api
from resources.routes import initialize_routes
from flask_cors import CORS, cross_origin
import os

heroku = Flask(__name__)
CORS(heroku)
heroku.config.from_envvar('ENV_FILE_LOCATION')
api = Api(heroku)

bcrypt = Bcrypt(heroku)
jwt = JWTManager(heroku)

host = os.getenv('MONGODB_HOST')

heroku.config['MONGODB_SETTINGS'] = {
    'host': host,
    'retryWrites': 'false'
}

initialize_db(heroku)

initialize_routes(api)
