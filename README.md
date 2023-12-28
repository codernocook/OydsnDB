# OydsnDB
 A simple expressjs database.

`client.js` is for the client that can connect to the database.\
`clientOriginal.js` is for the original code, not minimized.\
`index.js` the database server.\
`minimized.js` is for hosting database, it's minimized.

# Settings
Add a `.env` file, or use some hosting services, and add environment variable named:\
"authToken" for access token to the database, the **password** to login.\
"accessJSON" is the password encrypt the json, make sure to make it different so no one can decrypt it. **Remember to make it different from authToken, Just generate it randomly**.

- Use `minimized.js` to host, and add these enviroment variables.

# What's client.js
`client.js` use to connect to database server.

You can import it by:
```js
const database = require("./client.js")(authToken, accessToken); // You can change the name like how you name it.
```

Functions:
```js
/* Explains
key : the name what you want to save to databas
*/

.set(key, value, callback: function; "function(data) => {}") // <= Set data to database.

.has(key, callback: (data : boolean) => {}) // <= Check if data exist in database.

.get(key, callback: (data) => {}) // <= Get data with the key. The data will return `undefined` if the data not exist.

.getAll(callback: (data) => {}) // <= Get all data include key and value.

.delete("key : the name what you want to remove the value and key in database", callback: function; "function(data) => {}") // <= Delete a key (include value).

.clear(callback: (data) => {}, { "force": true }) // <= this action is harmful to database, It will delete all data. The "force" inside object is make sure that you not delete it by mistake.
```

Example (with explanations):
```js
const database = require("./client.js")(https://authToken, accessToken); // You can change the name like how you name it.

const user = "User0";
const data = {
 "job": "Manager",
 "pet": "no pet",
 "age": 1000
}

database.set(user, data, () => {}); // Set data to database
database.get(user, (data_from_database) => {
    console.log(data_from_database)
    /* Output
    {
    "job": "Manager",
    "pet": "no pet",
    "age": 1000
    }
    */
})
```

# Server Return
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

# Note
I might not continue to update this project anymore. :(
But It's still work so don't worry, I only update when the project have issue.

Check out my page: https://codernocook.github.io/

You can replace this database with a better one.\
I made this database because I want to have a better storage and make self-hosting easier.