# OydsnDB
A simple Express.js database.

`oydsndb_client.js` is the client that can connect to the database.\
`oydsndb_clientOriginal.js` is the original code, not minimized.\
`index.js` is the database server.\
`indexOriginal.js` is for hosting the database; it's not minimized.

# Settings
Add a `.env` file, or use some hosting services, and add an environment variable named:\
"authToken" for the access token to the database, the **password** to log in.\
"accessJSON" is the password to encrypt the JSON. Make sure to make it different so no one can decrypt it. **Remember to make it different from authToken; just generate it randomly**.

- Use `index.js` to host and add these environment variables.

# What are the "client" and "server" branches?
- Check the "client" branch and download the file "oydsndb_client.js" to use in your project.
- Check the "server" branch and download all the files in that directory to host the server.

Make sure the database server is on a different server, not in the same hosting node or project.\
Your "oydsndb_client.js" is used to connect to the database and fetch data.\
All explanations are inside these branches; you can check them out.

# Note
I might not continue to update this project anymore. :(
But it still works, so don't worry; I only update when the project has an issue.

Check out my page: https://codernocook.github.io/

You can replace this database with a better one.\
I made this database because I wanted to have better storage and make self-hosting easier.