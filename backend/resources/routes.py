from .users import LoginApi, DefaultPage, SearchUserAPI, FollowUserApi, FeedAPI, UserInfoAPI, UnfollowUserApi, UpdateBioAPI
from .pictures import PostPictureAPI, PostCommentAPI, PostLikeAPI


def initialize_routes(api):
    api.add_resource(DefaultPage, '/')
    api.add_resource(FeedAPI, '/feed')
    api.add_resource(LoginApi, '/login')
    api.add_resource(PostPictureAPI, '/post')
    api.add_resource(FollowUserApi, '/follow')
    api.add_resource(UnfollowUserApi, '/unfollow')
    api.add_resource(SearchUserAPI, '/search')
    api.add_resource(UserInfoAPI, '/user/<username>')
    api.add_resource(UpdateBioAPI, '/user/update/bio')
    api.add_resource(PostCommentAPI, '/picture/comment')
    api.add_resource(PostLikeAPI, '/picture/like')
