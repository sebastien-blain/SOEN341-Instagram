# /search

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

**2. List of users:**
```
[
    {
        "_id": {
            "$oid": "5e5b000fd017f8ca30a115f2"
        },
        "username": "Sebastien",
        "bio": "Welcome to mypanda space!!",
        "nb_pictures": 5,
        "already_follow": true
    },
    {
        "_id": {
            "$oid": "5e5b002fd017f8ca30a115f4"
        },
        "username": "Phong",
        "bio": "Welcome to mypanda space!!",
        "nb_pictures": 0,
        "already_follow": false
    }
], 200
```
