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

**2. Picture is added to database and to image queue of followers:**
```
[
    {
        "_id": {
            "$oid": "5e40bfa170fa2346c2eada8a"
        },
        "username": "David"
    },
    {
        "_id": {
            "$oid": "5e40bfa670fa2346c2eada8b"
        },
        "username": "Phiong"
    }
], 200
```
