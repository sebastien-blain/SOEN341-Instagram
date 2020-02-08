##API DOC

# /api/login

No expected header
Expected body:
{
    username: "Sebastien",
    password: "supercomplicatedpassword"
}

Possible return message:

1. User does not exist in database:
{
    message: "User Sebastien sucessfully added to the database"
}, 200
2. Password does not match the username provided:
{
    error: "Password does not match username"
}, 401
3. User is already in database and password matches:
{
    message: "User Sebastien has log in"
}, 200
4. The body sent is missing either fields username or password:
{
    error: "Missing a field"
}, 400