# /api/post

Expected header:
JWT token that identifies to a user

Expected body:
```
{
    "link": "s3 url link",
    "message": "Message of picture",
}
```
Possible return message:

**1. Token is not good and does not link to an account, user need to login again:**
```
{
    "error": "Header token is not good, please login again"
}, 401
```

**2. Picture is added to database and to image queue of followers:**
```
{
    "message": "Picture successfully added to user Sebastien"
}, 200
```
