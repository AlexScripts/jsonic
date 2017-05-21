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
        console.log("An error has occurred on line " + e.location.start.line + ", char " + e.location.start.column + ".")
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

__jsonic__.init_fns = function(){

    /* Output */

    __jsonic__.add_var("print", function(){
        for(let i = 0; i < arguments.length; i++){
            console.log(arguments[i])
        }
    })

    let math = {}

    math.abs = function(a){
        return Math.abs(a)        
    }
    math.acos = function(a){
        return Math.abs(a)        
    }
    math.asin = function(a){
        return Math.abs(a)        
    }
    math.atan = function(a){
        return Math.abs(a)        
    }
    math.atan2 = function(a, b){
        return Math.atan2(a, b)        
    }
    math.ceil = function(a){
        return Math.ceil(a)        
    }
    math.cos = function(a){
        return Math.cos(a)        
    }
    math.exp = function(a){
        return Math.exp(a)        
    }
    math.floor = function(a){
        return Math.floor(a)        
    }
    math.log = function(a){
        return Math.log(a)        
    }
    math.max = function(a, b){
        return Math.max(a, b)        
    }
    math.min = function(a, b){
        return Math.min(a, b)        
    }
    math.pow = function(a, b){
        return Math.pow(a, b)        
    }
    math.random = function(){
        return Math.random()
    }
    math.round = function(a){
        return Math.round(a)        
    }
    math.sin = function(a){
        return Math.sin(a)        
    }
    math.sqrt = function(a){
        return Math.sqrt(a)        
    }
    math.cbrt = function(a){
        return Math.cbrt(a)
    }
    math.tan = function(a){
        return Math.tan(a)        
    }
    __jsonic__.add_var("math", math)

    let date__ = new Date()

    let date = function(str){
        let ret = ""

        for(let i = 0; i < str.length; i++){
            /* Numbers */
            if(str.charAt(i) == "d"){ // day
                ret += date__.getDay()
            }else if(str.charAt(i) == "m"){ // month
                ret += date__.getUTCMonth() < 10 ? "0" + date__.getUTCMonth() : date__.getUTCMonth()
            }else if(str.charAt(i) == "h"){ // hour
                ret += date__.getHours() < 10 ? "0" + date__.getHours() : date__.getHours()
            }else if(str.charAt(i) == "n"){ // minute
                ret += date__.getUTCMinutes() < 10 ? "0" + date__.getUTCMinutes() : date__.getUTCMinutes()
            }else if(str.charAt(i) == "y"){ // year
                ret += date__.getFullYear()
            }else{
                ret += str.charAt(i)
            }
        }

        return ret
    }

    __jsonic__.add_var("date", date)
}

module.exports = __jsonic__
