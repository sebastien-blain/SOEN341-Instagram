from .users import UserApi, PictureApi, LoginApi, RegisterApi


def initialize_routes(api):
    api.add_resource(LoginApi, '/api/login')
    api.add_resource(RegisterApi, '/api/register')
    api.add_resource(UserApi, '/api/user/<string:username>')
