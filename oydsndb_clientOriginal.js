/*
    MIT License

    Copyright (c) 2023 itzporium

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

// Fetch api from nodejs started from 
try {
    if (process.versions.node.split('.').map(Number) && process.versions.node.split('.').map(Number)[0] && process.versions.node.split('.').map(Number)[1]) {
        const nodejs_version = process.versions.node.split('.').map(Number);
    
        if (nodejs_version[0] < 18 && nodejs_version[1] < 19) fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
    }
} catch {};

// isJson?
const isJSON = (check_str) => {
    try {
        JSON.parse(check_str);
    } catch {
        return false;
    }

    return true;
}

module.exports = function(db, authkey) {
    return {
        set(key, value, callback) {
            try {
                if (db) {
                    let bodyfetch = {
                        "authorization": authkey,
                        "key": key,
                        "value": value
                    }
                    fetch(db + "/set", { method: "POST", body: JSON.stringify(bodyfetch), headers: { 'Content-Type': 'application/json' }}).then((res) => res.text()).then((json_str) => {
                        if (isJSON(json_str) === true) {
                            let json = JSON.parse(json_str);

                            if (json["status"] === false) if (callback !== undefined && callback !== null) return callback(false);
                            if (json["status"] === true) if (callback !== undefined && callback !== null) return callback(json);
                        } else if (isJSON(json_str) === false) {
                            if (callback !== undefined && callback !== null) return callback(undefined);
                        }
                    })
                }
            } catch {
                if (callback !== undefined && callback !== null) return callback(undefined);
            }
        },
        has(key, callback) {
            try {
                if (db) {
                    let bodyfetch = {
                        "authorization": authkey,
                        "key": key
                    }
                    fetch(db + "/has", { method: "POST", body: JSON.stringify(bodyfetch), headers: { 'Content-Type': 'application/json' }}).then((res) => res.text()).then((json_str) => {
                        if (isJSON(json_str) === true) {
                            let json = JSON.parse(json_str);

                            if (json["status"] === false) if (callback !== undefined && callback !== null) return callback(false);
                            if (json["status"] === true) if (callback !== undefined && callback !== null) return callback(true);
                        } else if (isJSON(json_str) === false) {
                            if (callback !== undefined && callback !== null) return callback(undefined);
                        }
                    })
                }
            } catch {
                if (callback !== undefined && callback !== null) return callback(undefined);
            }
        },
        get(key, callback) {
            try {
                if (db) {
                    let bodyfetch = {
                        "authorization": authkey,
                        "key": key
                    }
                    fetch(db + "/has", { method: "POST", body: JSON.stringify(bodyfetch), headers: { 'Content-Type': 'application/json' }}).then((res) => res.text()).then((json_str) => {
                        if (isJSON(json_str) === true) {
                            let json = JSON.parse(json_str);

                            if (json["status"] === false) if (callback !== undefined && callback !== null) return callback(null);
                            if (json["data"]) {
                                if (callback !== undefined && callback !== null) return callback(json["data"]);
                            } else {
                                if (callback !== undefined && callback !== null) return callback(null);
                            }
                        } else if (isJSON(json_str) === false) {
                            if (callback !== undefined && callback !== null) return callback(undefined);
                        }
                    })
                }
            } catch {
                if (callback !== undefined && callback !== null) return callback(undefined);
            }
        },
        getAll(callback) {
            let bodyfetch = {
                "authorization": authkey
            }
            fetch(db + "/get", { method: "POST", body: JSON.stringify(bodyfetch), headers: { 'Content-Type': 'application/json' }}).then((res) => res.text()).then((json_str) => {
                if (isJSON(json_str) === true) {
                    let json = JSON.parse(json_str);
                    
                    if (json["status"] === false) if (callback !== undefined && callback !== null) return callback(null);
                    if (json["data"]) {
                        if (callback !== undefined && callback !== null) return callback(json["data"]);
                    } else {
                        if (callback !== undefined && callback !== null) return callback(null);
                    }
                } else if (isJSON(json_str) === false) {
                    if (callback !== undefined && callback !== null) return callback(undefined);
                }
            })
        },
        delete(key, callback) {
            try {
                let bodyfetch = {
                    "authorization": authkey,
                    "key": key
                }
                if (db) {
                    fetch(db + "/delete", { method: "DELETE", body: JSON.stringify(bodyfetch), headers: { 'Content-Type': 'application/json' }}).then((res) => res.text()).then((json_str) => {
                        if (isJSON(json_str) === true) {
                            let json = JSON.parse(json_str);

                            if (json["status"] === false) if (callback !== undefined && callback !== null) return callback(false);
                            if (json ["status"] === true) if (callback !== undefined && callback !== null) return callback(json);
                        } else if (isJSON(json_str) === false) {
                            if (callback !== undefined && callback !== null) return callback(undefined);
                        }
                    })
                }
            } catch {
                if (callback !== undefined && callback !== null) return callback(undefined);
            }
        },
        clear(key, callback, signature) {
            if (signature && typeof(signature) === "object" && Array.isArray(signature) === false && signature["force"] === true) {
                try {
                    let bodyfetch = {
                        "authorization": authkey,
                        "key": key
                    }
                    if (db) {
                        fetch(db + "/clear", { method: "POST", body: JSON.stringify(bodyfetch), headers: { 'Content-Type': 'application/json' }}).then((res) => res.text()).then((json_str) => {
                            if (isJSON(json_str) === true) {
                                let json = JSON.parse(json_str);

                                if (json["status"] === false) if (callback !== undefined && callback !== null) return callback(false);
                                if (json ["status"] === true) if (callback !== undefined && callback !== null) return callback(json);
                            } else if (isJSON(json_str) === false) {
                                if (callback !== undefined && callback !== null) return callback(undefined);
                            }
                        })
                    }
                } catch {
                    if (callback !== undefined && callback !== null) return callback(undefined);
                }
            }
        }
    }
}
