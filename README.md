# OydsnDB
 A simple expressjs database.

`oydsndb_client.js` is for the client that can connect to the database.\
`oydsndb_clientOriginal.js` is for the original code, not minimized.\

# What's oydsndb_client.js
`oydsndb_client.js` use to connect to database server.
`oydsndb_clientOriginal` is the original version without minimized.

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

# Note
I might not continue to update this project anymore. :(
But It's still work so don't worry, I only update when the project have issue.

Check out my page: https://codernocook.github.io/

You can replace this database with a better one.\
I made this database because I want to have a better storage and make self-hosting easier.