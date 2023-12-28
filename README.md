# OydsnDB
 A simple expressjs database.

`index.js` the database server.\
`indexOriginal.js` is for hosting database, it's minimized.

# Settings
Add a `.env` file, or use some hosting services, and add environment variable named:\
"authToken" for access token to the database, the **password** to login.\
"accessJSON" is the password encrypt the json, make sure to make it different so no one can decrypt it. **Remember to make it different from authToken, Just generate it randomly**.

- Use `minimized.js` to host, and add these enviroment variables.

# Server Response
Server will only response with code: 200, 400, 401\n

Server's Response (JSON):
```json
{
    status: false,          <= Status, success is true, and failure is false
    keyname: null,          <= keyname only for /set, /has, /delete, /clear
    data: null,             <= Data return from server from request like /get, /has, ... It also from the list "keyname" too
    message: "...",         <= Success, and error code
}
```

All messages:
- request_error: Meaning your JSON format is not correct.
- authentication_failed: The password access to database is incorrect, not valid. Normal the status code response back with `401`.
- sucessfully: The request that you sent is success, no error.
- failed: It might be server's issue.

# What's .database.json.oydsndb?
This file is an encrypted version of the database code.\
The "." before it make the file invisible to make sure you can't touch it.\
**Don't delete any character** inside **the file** or else **all of your data will be corrupted**.

# Note
I might not continue to update this project anymore. :(
But It's still work so don't worry, I only update when the project have issue.

Check out my page: https://codernocook.github.io/

You can replace this database with a better one.\
I made this database because I want to have a better storage and make self-hosting easier.