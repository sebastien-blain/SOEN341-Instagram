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

    def login(self, username, password):
        return self.app.post(
            '/login',
            data=json.dumps(dict(username=username, password=password)),
            mimetype='application/json')
    
    def test_correct_login(self):
        response = self.login('Sebastien', 'Password')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'token', response.data)

    def test_incorrect_login(self):
        self.login('Alexia', 'Password')
        response = self.login('Alexia', 'BadPassword')
        self.assertEqual(response.status_code, 401)
        self.assertIn(b'Password does not match username', response.data)

    def follow(self, username, token):
        return self.app.post(
            '/follow',
            data=json.dumps(dict(follow=username)),
            headers={"Authorization":"Bearer {}".format(token)},
            mimetype='application/json')
    
    def test_follow_unknown_user(self):
        res = self.login('Phong', 'Hello')
        token = json.loads(res.data)['token']
        response = self.follow('Unknown', token)
        self.assertEqual(response.status_code, 401)
        self.assertIn(b'User Unknown does not exist', response.data)

    def test_follow_own_user(self):
        res = self.login('Phong1', 'Hello')
        token = json.loads(res.data)['token']
        response = self.follow('Phong1', token)
        self.assertEqual(response.status_code, 401)
        self.assertIn(b'User cannot follow itself', response.data)

    def test_follow_already_followed_user(self):
        self.login('unk', 'Hello')
        res = self.login('Phong2', 'Hello')
        token = json.loads(res.data)['token']
        self.follow('unk', token)
        response = self.follow('unk', token)
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'User Phong2 is already following unk', response.data)

    def test_follow_correct(self):
        self.login('Sebas', 'Hello')
        res = self.login('Phong3', 'Hello')
        token = json.loads(res.data)['token']
        response = self.follow('Sebas', token)
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'User Phong3 is now following Sebas', response.data)

    def search(self, token):
        return self.app.get(
            '/search',
            headers={"Authorization":"Bearer {}".format(token)},
            mimetype='application/json')
    
    def test_search(self):
        res = self.login('Sebas1', 'Hello')
        token = json.loads(res.data)['token']
        response = self.search(token)
        self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()