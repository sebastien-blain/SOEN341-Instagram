from .users import LoginApi, DefaultPage, SearchUserAPI, FollowUserApi, FeedAPI, UserInfoAPI
from .pictures import PostPictureAPI


def initialize_routes(api):
    api.add_resource(DefaultPage, '/')
    api.add_resource(FeedAPI, '/feed')
    api.add_resource(LoginApi, '/login')
    api.add_resource(PostPictureAPI, '/post')
    api.add_resource(FollowUserApi, '/follow')
    api.add_resource(SearchUserAPI, '/search')
    api.add_resource(UserInfoAPI, '/user/<username>')
