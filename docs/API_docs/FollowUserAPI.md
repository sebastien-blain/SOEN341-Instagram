# /follow

Expected header:
JWT token that identifies to a user

Expected body:
username of the user to follow
```
{
    "follow": "Sebastien",
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

**3. User tried to follow itself:**
```
{
    "error": "User cannot follow itself"
}, 401
```

**4. User tried to follow someone he already follows:**
```
{
    "message": "User Phong is already following Sebastien"
}, 200
```

**5. User successfully follows someone:**
```
{
    "message": "User Sebastien is now following Phong"
}, 200
```
