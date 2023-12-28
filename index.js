/*
    MIT License

    Copyright (c) 2023 Itzporium

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

const a=process.env["authToken"];const l=process.env["accessJSON"];if(!require("fs").existsSync("./.database.json.oydsndb")){require("fs").writeFileSync("./.database.json.oydsndb",require("crypto-js").AES.encrypt("[]",l?.toString())?.toString())}const e=require("express");const o=require("crypto-js");const u=require("fs");let s=u.readFileSync("./.database.json.oydsndb","utf-8");let t=JSON.parse(o.AES.decrypt(s,l?.toString()).toString(o.enc.Utf8));let y=new Map(t.map(e=>{return[e.key,e.value]}))||new Map;const n=e();const r=Date.now();n.use(e.json());process.on("uncaughtException",function(){});n.use((e,s,t,a)=>{if(e instanceof SyntaxError&&e.status===400&&"body"in e){return t.status(400).json({status:false,keyname:null,data:null,message:"request_error"})}});n.use((e,s,t)=>{if(e instanceof SyntaxError&&e.status===400&&"body"in e){return s.status(400).json({status:false,keyname:null,data:null,message:"request_error"})}if(e&&e["body"]){if(e["body"]["authorization"]){if(e.body["authorization"]!==a){return s.status(401).json({status:false,keyname:null,data:null,message:"authentication_failed"})}if(e.body["authorization"]===a){t()}}else{return s.status(401).json({status:false,keyname:null,data:null,message:"authentication_failed"})}}});n.post("/get",(e,s)=>{try{const t=Array.from(y).map(([e,s])=>({key:e,value:s}));s.json({status:true,keyname:null,data:t,message:"sucessfully"})}catch{s.json({status:false,keyname:null,data:null,message:"failed"})}});n.post("/set",(t,a)=>{try{if(u.existsSync("./.database.json.oydsndb")){try{let e=t.body["key"];let s=t.body["value"];y.set(t.body["key"],t.body["value"]);const n=Array.from(y).map(([e,s])=>({key:e,value:s}));u.writeFileSync("./.database.json.oydsndb",o.AES.encrypt(JSON.stringify(n),l?.toString())?.toString());a.json({status:true,keyname:t.body["key"],data:t.body["value"],message:"sucessfully"})}catch(e){a.json({status:false,keyname:null,data:null,message:"failed"})}}}catch{a.json({status:false,keyname:null,data:null,message:"failed"})}});n["delete"]("/delete",(t,a)=>{try{if(u.existsSync("./.database.json.oydsndb")){try{let e=t.body["key"];let s=null;if(y.has(t.body["key"])){s=y.get(t.body["key"]);y["delete"](t.body["key"])}const n=Array.from(y).map(([e,s])=>({key:e,value:s}));u.writeFileSync("./.database.json.oydsndb",o.AES.encrypt(JSON.stringify(n),l?.toString())?.toString());a.json({status:true,keyname:t.body["key"]||null,data:s||null,message:"sucessfully"})}catch(e){a.json({status:false,keyname:null,data:null,message:"failed"})}}}catch{a.json({status:false,keyname:null,data:null,message:"failed"})}});n.post("/has",(s,t)=>{try{if(u.existsSync("./.database.json.oydsndb")){try{let e=s.body["key"]}catch(a){t.json({status:false,keyname:null,data:null,message:"failed"})}let e=null;if(y.has(s.body["key"])){e=y.get(s.body["key"])}if(y.has(s.body["key"])){t.json({status:true,keyname:s.body["key"]||null,data:e||null,message:"sucessfully"})}else{t.json({status:false,keyname:null,data:null,message:"failed"})}}}catch{t.json({status:false,keyname:null,data:null,message:"failed"})}});n.post("/clear",(e,s)=>{try{if(u.existsSync("./.database.json.oydsndb")){y.clear();u.writeFileSync("./.database.json.oydsndb",o.AES.encrypt("[]",l?.toString())?.toString());s.json({status:true,keyname:[],data:[],message:"sucessfully"})}}catch{s.json({status:false,keyname:null,data:null,message:"failed"})}});const d=Date.now();n.listen(3e3,()=>console.log(`[Oydsn]: success, Loading took ${Date.now()-r}ms | Start time took ${Date.now()-d()}`));