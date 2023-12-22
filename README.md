# PangeaDB
 A simple expressjs database.

`client.js` is for the client that can connect to the database.\
`index.js` the database server.\
`minimized.js` is for hosting database, it's minimized.

# Settings
Add a `.env` file, or use some hosting services, and add environment variable named:\
"authToken" for access token to the database.\
"accessJSON" is the password encrypt the json, make sure to make it different so no one can decrypt it.

- Use `minimized.js` to host, and add these enviroment variables.

# What's client.js
`client.js` use to connect to database server.

You can import it by:
```js
local database = require("./client.js")(authToken, accessJSON); // You can change the name like how you name it.
```

Functions:
.set(key : the name what you want to save to database, value : the value save with the key, callback: function; "function(data) => {}") <= Set data to database
.has(key : the name what you want to check in the database, function(data : boolean) => {}", the data is boolean: true/false) <= Check if data exist in database
.get(key : the name what you want get in database, callback: function; "function(data) => {}") <= Get data with the key. The data will return `undefined` if the data not exist.
.getAll(callback: function; "function(data) => {}") <= Get all data include key and value.
.del(key : the name what you want to remove the value and key in database, callback: function; "function(data) => {}") <= Delete a key (include value)
.clear(callback: function; "function(data) => {}") <= this action is harmful to database, It will delete all data.
