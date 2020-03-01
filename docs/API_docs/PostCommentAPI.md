# /picture/comment

Expected header:
JWT token that identifies to a user

picture_id is found in the /feed route. Each picture have an ID.

Expected body:
```
{
    "picture_id": "5e5b0170e7105f841b06a142",
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

**2. Picture id does not exist:**
```
{'error': 'Picture id does not exist in database'}, 401

```

**3. Comment is sucessfully added to picture:**
```
{'message': 'Comment successfully added to picture'}, 200

```
