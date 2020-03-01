# /feed

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

**2. Return all images in queue of a current user:**

```
[
    {
        "owner": "Sebastien",
        "user": "Sebastien",
        "link": "www.panda.space",
        "message": "Yep this is me",
        "nb_likes": 0,
        "nb_comments": 4,
        "comments": [
            {
                "user": "1",
                "message": "This is an awesome picture"
            },
            {
                "user": "1",
                "message": "Damm son"
            },
            {
                "user": "Sebastien",
                "message": "THis is so cool"
            },
            {
                "user": "Alexia",
                "message": "THis is so cool"
            }
        ],
        "id": "5e5b0170e7105f841b06a142"
    },
    {
        "owner": "Sebastien",
        "user": "Sebastien",
        "link": "www.panda.space",
        "message": "Super duper good pic ",
        "nb_likes": 0,
        "nb_comments": 0,
        "comments": [],
        "id": "5e5b01090088ee88755f2daf"
    },
    {
        "owner": "Sebastien",
        "user": "Sebastien",
        "link": "www.panda.space",
        "message": "This is my third ",
        "nb_likes": 0,
        "nb_comments": 0,
        "comments": [],
        "id": "5e5b01010088ee88755f2dae"
    }
], 200

```