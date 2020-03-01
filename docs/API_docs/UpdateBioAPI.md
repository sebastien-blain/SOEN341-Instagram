# /user/update/bio

Expected header:
JWT token that identifies to a user

Expected body:
```
{
    "bio": "This is my bio",
}
```
Possible return message:

**1. Token is not good and does not link to an account, user need to login again:**
```
{
    "error": "Header token is not good, please login again"
}, 401
```

**2. Bio is updated:**
```
{
    "message": "Bio was sucessfully updated"
}, 200
```
