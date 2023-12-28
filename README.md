# OydsnDB
 A simple expressjs database.

`index.js`: It's used for hosting the database and is minimized.
`indexOriginal.js`: This is the database server, but not minimized.

# Settings
Add a `.env` file or use some hosting services, and add environment variables named:\
"authToken" for the access token to the database, the **password** to login.\
"accessJSON" is the password to encrypt the JSON. Make sure to make it different so no one can decrypt it. **Remember to make it different from authToken; Just generate it randomly.**

- Use `index.js` to host, and add these environment variables.

# Server Response
The server will only respond with codes: 200, 400, 401.\

Server's Response (JSON):
```json
{
    "status": false,          <= Status, success is true, and failure is false
    "keyname": null,          <= keyname only for /set, /has, /delete, /clear
    "data": null,             <= Data return from the server from requests like /get, /has, ... It also includes the list "keyname" too
    "message": "..."          <= Success and error code
}
```

All messages:
- request_error: Means your JSON format is not correct.
- authentication_failed: The password to access the database is incorrect or not valid. Normally, the status code responds back with 401.
- successfully: The request that you sent is successful, no error.
- failed: There might be a server issue.

# What's .database.json.oydsndb?
- This file is an encrypted version of the database code. The "." before it makes the file invisible to ensure you can't touch it.
**Don't delete any characters** inside **the file** or else **all of your data will be corrupted**.

# Note
I might not continue to update this project anymore. :(
But It's still work so don't worry, I only update when the project have issue.

Check out my page: https://codernocook.github.io/

You can replace this database with a better one.\
I made this database because I want to have a better storage and make self-hosting easier.