from .users import UserApi, LoginApi, DefaultPage


def initialize_routes(api):
    api.add_resource(DefaultPage, '/')
    api.add_resource(LoginApi, '/login')
    api.add_resource(UserApi, '/user/<string:username>')
