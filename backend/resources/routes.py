from .users import UserApi, LoginApi, DefaultPage


def initialize_routes(api):
<<<<<<< HEAD
    api.add_resource(DefaultPage, '/')
    api.add_resource(LoginApi, '/login')
=======
    api.add_resource(LoginApi, '/login')
    api.add_resource(PostPictureAPI, '/post')
    api.add_resource(FollowUserApi, '/follow')
>>>>>>> 93bbf08e8d2b52b0c56d1b3ef01818c019703bd4
    api.add_resource(UserApi, '/user/<string:username>')
