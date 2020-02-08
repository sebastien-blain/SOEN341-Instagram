from .users import UserApi, LoginApi


def initialize_routes(api):
    api.add_resource(LoginApi, '/api/login')
    api.add_resource(UserApi, '/api/user/<string:username>')
