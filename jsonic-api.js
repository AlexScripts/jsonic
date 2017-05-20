"use strict"

let core = require("./jsonic-core")
let fs = require("fs")

let __jsonic__ = {}

__jsonic__.object_string = function(s){
    let p = core.parse(s)
    return p
}

__jsonic__.object_file = function(f){
    try {
        let file_content = fs.readFileSync(f)
        let p = core.parse(file_content)

        return p
    }catch(e){
        console.log("An error has occurred.")
        return ""
    }
}

__jsonic__.fwrite_result = function(from, to){
  let res = __jsonic__.object_file(from)
  fs.writeFileSync(to, res)
}

__jsonic__.add_var = function(name, value){
    core.vars[name] = value
}

__jsonic__.get_var = function(name){
    return core.vars[name]
}

__jsonic__.use_file = function(name){
    core.uses(name)
}

module.exports = __jsonic__
