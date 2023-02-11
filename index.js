const express = require("express");
const fs = require("fs");
let db = require("./database.json");

let localdb = new Map(
    db.map(obj => {
      return [obj.key, obj.value];
    }),
) || new Map();

const app = express();

app.listen(3000, () => console.log("InjectDB is RUNNING!"))

/* feature
- get/{info}
- save{info: can be array}
- delete: {info}

if info is not vaild, it will return undefined
*/

app.use(express.json()); // this method allow you to post

app.get("/get", (req, res) => {
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
            message: "failled",
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
                message: "failled",
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
            message: "failled",
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
                message: "failled",
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
            message: "failled",
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
                message: "failled",
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
                message: "failled",
            })
        }
    } catch {
        res.json({
            status: false,
            keyname: null,
            data: null,
            message: "failled",
        })
    }
})