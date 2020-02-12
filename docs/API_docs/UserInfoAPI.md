# /user/<username>

IS A GET

Expected header:
JWT token that identifies to a user

No Expected body:

Possible return message:

**1. Token is not good and does not link to an account, user need to login again:**
```
{
    "error": "Header token is not good, please login again"
}, 401
```

**2. <username> is not valid:**

```
{'error': 'User {} does not exist'.format(username)}, 401

```

**3. <username> is valid, return whole info about user:**

```
{
    "_id": {
        "$oid": "5e43132fe3fc7eea4a59b5a4"
    },
    "username": "Arianne",
    "pictures": [
        {
            "_id": {
                "$oid": "5e431352e3fc7eea4a59b5a5"
            },
            "date": {
                "$date": 1581436162806
            },
            "owner": "Arianne",
            "user": "Arianne",
            "link": "picture 1",
            "message": "Awesome",
            "nb_likes": 0,
            "nb_comments": 0,
            "comments": []
        },
        {
            "_id": {
                "$oid": "5e43136de3fc7eea4a59b5a6"
            },
            "date": {
                "$date": 1581436189333
            },
            "owner": "Arianne",
            "user": "Arianne",
            "link": "New pic",
            "message": "Super duper good pic",
            "nb_likes": 0,
            "nb_comments": 0,
            "comments": []
        }
    ],
    "nb_followers": 0,
    "followers": [],
    "nb_following": 1,
    "following": [
        {
            "$oid": "5e431326e3fc7eea4a59b5a3"
        }
    ],
    "already_follow": false
}, 200

```