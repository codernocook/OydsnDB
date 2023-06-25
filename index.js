const express = require("express");
const fs = require("fs");
let db = require("./database.json");
const authtoken = "the token here or env token"

let localdb = new Map(
    db.map(obj => {
      return [obj.key, obj.value];
    }),
) || new Map();

const app = express();

// Starting Server
const before_runTime = Date.now();
app.listen(3000, () => console.log(`[expressDB]: success, took ${Date.now() - before_runTime}ms!`));
app.use(express.json());

/* 
    === Feature ===
    - [POST]    /get     {key: the name of saved infomation, authorization: the password to database}.
    - [POST]    /has     {key: the name of saved infomation (check if the key is exist), authorization: the password to database}.
    - [POST]    /set     {key: the name you want to save in database, value: the data you want (just call the key and the /get will throw data), authorization: the password to database}.
    - [DELETE]  /del  {key: the name of saved infomation to delete, authorization: the password to database}.
    - [POST]    /clear   {authorization: the password to database}.

    === Status Code ===
    - [401]: "authentication_failed", meaning the password to access the database is missing or not vaild.
    - [501]: "request_error", meaning the request sent to the server having error, like unfinish json can (crash the database: already have error handler, so you don't need to scare about that).
    - [200]: "sucessfully", meaning the request is vaild. Now you will have access to the database

    === Configuration ===
    - The "authtoken" variable is the password access to database, you can set it as a env token to secure your token

    If info is not vaild, it will return `undefined`.
*/


// Error handler
process.on('uncaughtException', function() { /*console.log("[expressDB]: error found!")*/ })

// Authentication
app.use((req, res, next) => {
    try {
        const jsonTesting_handler = JSON.parse(req);
    } catch {
        res.status(500).json({
            status: false,
            keyname: null,
            data: null,
            message: "request_error",
        })
    }
    try {req} catch {
        res.status(500).json({
            status: false,
            keyname: null,
            data: null,
            message: "request_error",
        })
    }
    if (req) {
        if (req.body["authorization"]) {
            if (req.body["authorization"] && req.body["authorization"] !== authtoken) {
                res.status(401).json({
                    status: false,
                    keyname: null,
                    data: null,
                    message: "authentication_failed",
                })
                return;
            }
            if (req.body["authorization"] && req.body["authorization"] === authtoken) {
                next();
            }
        } else {
                res.status(401).json({
                    status: false,
                    keyname: null,
                    data: null,
                    message: "authentication_failed",
                })
                return;
        }
    }
})

app.post("/get", (req, res) => {
    try {
        // check if the db is exits
        const execpath = `./database.json`
        const decodeinfo = Array.from(localdb).map(([key, value]) => ({
            key,
            value,
        }));

        res.json({
            status: true,
            keyname: null,
            data: decodeinfo,
            message: "sucessfully",
        })
    } catch {
        res.json({
            status: false,
            keyname: null,
            data: null,
            message: "failed",
        })
    }
})

app.post("/set", (req, res) => {
    try {
        // check if the db is exits
        const execpath = `./database.json`
        let decodeinfo = db

        try {
            let test1 = req.body["key"]
            let test2 = req.body["value"];
        } catch (err) {
            res.json({
                status: false,
                keyname: null,
                data: null,
                message: "failed",
            })
        }

        localdb.set(req.body["key"], req.body["value"])

        const arr = Array.from(localdb).map(([key, value]) => ({
            key,
            value,
        }));

        fs.writeFileSync('./database.json', JSON.stringify(arr));

        res.json({
            status: true,
            keyname: req.body["key"],
            data: req.body["value"],
            message: "sucessfully",
        })
    } catch {
        res.json({
            status: false,
            keyname: null,
            data: null,
            message: "failed",
        })
    }
})

app.delete("/del", (req, res) => {
    try {
        // check if the db is exits
        const execpath = `./database.json`
        let decodeinfo = db;

        try {
            let test1 = req.body["key"]
        } catch (err) {
            res.json({
                status: false,
                keyname: null,
                data: null,
                message: "failed",
            })
        }

        let localdbdata = null;

        if (localdb.has(req.body["key"])) {
            localdbdata = localdb.get(req.body["key"])
            localdb.delete(req.body["key"]);
        }

        const arr = Array.from(localdb).map(([key, value]) => ({
            key,
            value,
        }));

        fs.writeFileSync('./database.json', JSON.stringify(arr));

        res.json({
            status: true,
            keyname: req.body["key"] || null,
            data: localdbdata || null,
            message: "sucessfully",
        })
    } catch {
        res.json({
            status: false,
            keyname: null,
            data: null,
            message: "failed",
        })
    }
})

app.post("/has", (req, res) => {
    try {
        // check if the db is exits
        const execpath = `./database.json`
        let decodeinfo = db;

        try {
            let test1 = req.body["key"]
        } catch (err) {
            res.json({
                status: false,
                keyname: null,
                data: null,
                message: "failed",
            })
        }

        let localdbdata = null;

        if (localdb.has(req.body["key"])) {
            localdbdata = localdb.get(req.body["key"])
        }

        if (localdb.has(req.body["key"])) {
            res.json({
                status: true,
                keyname: req.body["key"] || null,
                data: localdbdata || null,
                message: "sucessfully",
            })
        } else {
            res.json({
                status: false,
                keyname: null,
                data: null,
                message: "failed",
            })
        }
    } catch {
        res.json({
            status: false,
            keyname: null,
            data: null,
            message: "failed",
        })
    }
})

app.post("/clear", (req, res) => {
    try {
        // check if the db is exits
        const execpath = `./database.json`
        let decodeinfo = db;

        localdb.clear(); // clear everything have in it local database
        fs.writeFileSync("./database.json", "[]"); // clear the stored json database

        res.json({
            status: true,
            keyname: [],
            data: [],
            message: "sucessfully",
        })
    } catch {
        res.json({
            status: false,
            keyname: null,
            data: null,
            message: "failed",
        })
    }
})
