import unittest
import json
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_restful import Api
from flask_cors import CORS, cross_origin

import sys
sys.path.append('../')
from database.db import initialize_db
from resources.routes import initialize_routes


class TestStringMethods(unittest.TestCase):

    def setUp(self):
        app = Flask(__name__)
        CORS(app)
        app.config['JWT_SECRET_KEY'] = 'idbfiw724yr4fn3y5gt754tbhi54bth45b'
        api = Api(app)

        bcrypt = Bcrypt(app)
        jwt = JWTManager(app)

        app.config['MONGODB_SETTINGS'] = {
            'host': 'mongodb://localhost/mypanda'
        }

        initialize_db(app)
        initialize_routes(api)
        app.config['TESTING'] = True
        app.config['DEBUG'] = False
        self.app = app.test_client()
        self.assertEqual(app.debug, False)

    def test_main_page(self):
        response = self.app.get('/', follow_redirects=True)
        self.assertEqual(response.status_code, 200)



if __name__ == '__main__':
    unittest.main()