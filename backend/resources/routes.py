from .users import UserApi, LoginApi, DefaultPage


def initialize_routes(api):
    api.add_resource(LoginApi, '/login')
    api.add_resource(PostPictureAPI, '/post')
    api.add_resource(FollowUserApi, '/follow')
    api.add_resource(UserApi, '/user/<string:username>')
