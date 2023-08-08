// The password
const authToken = "the token here or env token"
const accessJSON_key = "this is the key, we gonna use to encrypt and decrypt data and save to a file, you can set this with authToken too";

// Create database file, if not found
if (!require("fs").existsSync("./database.json.itzporium")) {
    require("fs").writeFileSync("./database.json.itzporium", require("crypto-js").AES.encrypt("[]", accessJSON_key?.toString())?.toString());
}

// Database Variable
const express = require("express");
const cryptojs = require("crypto-js");
const fs = require("fs");

let db_require = fs.readFileSync("./database.json.itzporium", "utf-8");
let db = JSON.parse(cryptojs.AES.decrypt(db_require, accessJSON_key?.toString()).toString(cryptojs.enc.Utf8));

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
    - [400]: "request_error", meaning the request sent to the server having error, like bad json format
    - [200]: "sucessfully", meaning the request is vaild. Now you will have access to the database

    === Configuration ===
    - The "authToken" variable is the password access to database, you can set it as a env token to secure your token

    If info is not vaild, it will return `undefined`.
*/

// Error handler
process.on("uncaughtException", function() { /*console.log("[expressDB]: error found!")*/ })

// Bad json format
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({
            status: false,
            keyname: null,
            data: null,
            message: "request_error",
        })
    }
})

// Authentication
app.use((req, res, next) => {
    if (req instanceof SyntaxError && req.status === 400 && "body" in req) {
        return res.status(400).json({
            status: false,
            keyname: null,
            data: null,
            message: "request_error",
        })
    }
    
    if (req && req["body"]) {
        if (req["body"]["authorization"]) {
            if (req.body["authorization"] !== authToken) {
                return res.status(401).json({
                    status: false,
                    keyname: null,
                    data: null,
                    message: "authentication_failed",
                });
            }
            if (req.body["authorization"] === authToken) {
                next();
            }
        } else {
            return res.status(401).json({
                status: false,
                keyname: null,
                data: null,
                message: "authentication_failed",
            });
        }
    }
})

app.post("/get", (req, res) => {
    try {
        // check if the db is exits
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
        if (fs.existsSync("./database.json.itzporium")) {
            try {
                let test1 = req.body["key"];
                let test2 = req.body["value"];

                localdb.set(req.body["key"], req.body["value"])
    
                const arr = Array.from(localdb).map(([key, value]) => ({
                    key,
                    value,
                }));
        
                fs.writeFileSync("./database.json.itzporium", cryptojs.AES.encrypt(JSON.stringify(arr), accessJSON_key?.toString())?.toString());
        
                res.json({
                    status: true,
                    keyname: req.body["key"],
                    data: req.body["value"],
                    message: "sucessfully",
                })
            } catch (err) {
                res.json({
                    status: false,
                    keyname: null,
                    data: null,
                    message: "failed",
                })
            }
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

app.delete("/del", (req, res) => {
    try {
        // check if the db is exits
        if (fs.existsSync("./database.json.itzporium")) {
            try {
                let test1 = req.body["key"];

                let localdbdata = null;
    
                if (localdb.has(req.body["key"])) {
                    localdbdata = localdb.get(req.body["key"])
                    localdb.delete(req.body["key"]);
                }
        
                const arr = Array.from(localdb).map(([key, value]) => ({
                    key,
                    value,
                }));
        
                fs.writeFileSync("./database.json.itzporium", cryptojs.AES.encrypt(JSON.stringify(arr), accessJSON_key?.toString())?.toString());
        
                res.json({
                    status: true,
                    keyname: req.body["key"] || null,
                    data: localdbdata || null,
                    message: "sucessfully",
                })
            } catch (err) {
                res.json({
                    status: false,
                    keyname: null,
                    data: null,
                    message: "failed",
                })
            }
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

app.post("/has", (req, res) => {
    try {
        // check if the db is exits
        if (fs.existsSync("./database.json.itzporium")) {
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
        if (fs.existsSync("./database.json.itzporium")) {
            localdb.clear(); // clear everything have in it local database
            fs.writeFileSync("./database.json.itzporium", cryptojs.AES.encrypt("[]", accessJSON_key?.toString())?.toString()); // clear the stored json database

            res.json({
                status: true,
                keyname: [],
                data: [],
                message: "sucessfully",
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
