# Suggested template for the images

Images will be store in the database using this template

```JSON
"image": {
  "date": "datetimeformat",
  "owner": "Bob",
  "user": {
    username
  },
  "link": "www.example.com/image1",
  "message": "...",
  "nb_likes": "5",
  "nb_coments": "2",
  "comments": [
    {
      "user": "Mia",
      "comment": "..."
    },
    {
      "user": "Khalifa",
      "comment": "..."
    },
  ],
}
```
