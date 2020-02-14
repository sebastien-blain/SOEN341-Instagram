# /unfollow

Expected header:
JWT token that identifies to a user

Expected body:
username of the user to unfollow
```
{
    "unfollow": "Sebastien",
}
```
Possible return message:

**1. Token is not good and does not link to an account, user need to login again:**
```
{
    "error": "Header token is not good, please login again"
}, 401
```

**2. User provided in body does not exist:**
```
{
    "error": "User Sebastien does not exist"
}, 401
```

**3. User tried to unfollow itself:**
```
{
    "error": "User cannot unfollow itself"
}, 401
```

**4. User tried to unfollow someone he does not follow:**
```
{
    "message": "User Phong does not follow Sebastien"
}, 200
```

**5. User successfully unfollows someone:**
```
{
    "message": "User Sebastien has unfollow Phong"
}, 200
```
