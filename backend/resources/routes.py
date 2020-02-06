from .users import UserApi, PictureApi, LoginApi, RegisterApi


def initialize_routes(api):
    api.add_resource(UserApi, '/api/user/<string:username>')
    api.add_resource(PictureApi, '/api/picture/<string:name>')
    api.add_resource(LoginApi, '/api/login')
    api.add_resource(RegisterApi, '/api/register/<string:name>')
