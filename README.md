# OydsnDB
 A simple expressjs database.

`oydsndb_client.js`: This file is for the client that can connect to the database.\
`oydsndb_clientOriginal.js`: This file contains the original code, not minimized.

# What's oydsndb_client.js
`oydsndb_client.js` is used to connect to the database server. 
`oydsndb_clientOriginal` is the original version without being minimized.

You can import it by:
```js
const database = require("./client.js")(authToken, accessToken); // You can change the name as you like.
```

Functions:
```js
/* Explains
key: The name you choose to save data in the database.
value: The actual data you want to store in the database. You can later retrieve this data by using .get and specifying the key.
callback: It can include a boolean (true/false) indicating success, data in JSON format, or undefined (no data found),
If your callback returns: {"success": "false", "code": "cannot_connect_database"}, it means that your database URL is not valid or cannot be connected.
*/

.set(key, value, callback: function; "function(data) => {}") // <= Set data to the database.

.has(key, callback: (data: boolean) => {}) // <= Check if data exists in the database.

.get(key, callback: (data) => {}) // <= Get data with the key. The data will return `undefined` if the data does not exist.

.getAll(callback: (data) => {}) // <= Get all data, including key and value.

.delete(key, callback: function; "function(data) => {}") // <= Delete a key (including value).

.clear(callback: (data) => {}, { "force": true }) // <= This action is harmful to the database. It will delete all data. The "force" inside the object ensures that you do not delete it by mistake.
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

# Note
I might not continue to update this project anymore. :(
But It's still work so don't worry, I only update when the project have issue.

Check out my page: https://codernocook.github.io/

You can replace this database with a better one.\
I made this database because I want to have a better storage and make self-hosting easier.