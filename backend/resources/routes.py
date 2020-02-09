from .users import UserApi, LoginApi, FollowUserApi
from .pictures import PostPictureAPI


def initialize_routes(api):
    api.add_resource(LoginApi, '/api/login')
    api.add_resource(PostPictureAPI, '/api/post')
    api.add_resource(FollowUserApi, '/api/follow')
    api.add_resource(UserApi, '/api/user/<string:username>')
