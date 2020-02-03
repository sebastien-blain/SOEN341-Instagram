from .users import UserApi, PictureApi


def initialize_routes(api):
    api.add_resource(UserApi, '/api/user/<string:name>')
    api.add_resource(PictureApi, '/api/picture/<string:name>')
