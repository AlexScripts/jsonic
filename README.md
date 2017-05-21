# <p align="center"> JSONic

<p align="center"> Short demonstration of features

## 1.JSON 


Simple properties:

```javascript
	apples 5
	bottles 4
	bananas 3
```

### <p align="center">↓</p>
```javascript
 {
	apples: 5,
	bottles: 4,
	bananas: 3  
 }
```

---

Or more compact:

```javascript
	fruits (
		apples 5
		bananas 3
	)
	bottles 4
```

### <p align="center">↓</p>
```javascript
 {
	fruits: {
		apples: 5,
		bananas: 3
	},
	bottles: 4
 }
```
---
### Lists & dicts

To define a list:

```javascript
	fruits "apples", "bananas", "oranges"
```

### <p align="center">↓</p>
```javascript
 {
	 fruits: ["apples", "bananas", "oranges"]
 }
```

To define a dict:

```javascript
	fruits (
		apples 1
		bananas 4
	)
```
### <p align="center">↓</p>
```javascript
 {
	 fruits: {
		apples: 1,
		bananas: 4
	 }
 }
```
---

### Types
JSONic support some types:

- numbers
 - floats
 - ints
- strings
- js functions

---
### String concatenation
To concat string:
```javascript
	name "Alex" + "Yurchenko"
```

### <p align="center">↓</p>
```javascript
 {
	 name: "Alex" + "Yurchenko"
 }
```
---
### Math
The math:
	
```javascript
	apples 1 + 4
	bananas 2 * ( 1 + 3 )
```

### <p align="center">↓</p>
```javascript
 {
	 apples: 5,
	 bananas: 8
 }
```
---

## 2. Own features

---

### Variables
To define variable:
	
```javascript
	some_name = "Some value"
```

Variable support list type:

```javascript
	some_name = ("Some Value", 1 + 3, "Das ist gut.")
```

To call list item:
	
```javascript
	some_name(0) # => Some Value
	some_name(1) # => 4
	...
```

---
### Comments
Single-line comment:

```javascript
	# Hello World
```

Multi-line comment:

```javascript
	#
		I am multi-line
	#
```

---

### @uses
This command imports all variables from selected file. Syntax:

```javascript
	@uses <file>
```

Example:

##### demo/math.jsonic

```javascript
	PI_SHORT = 3.14
	PI_LONG = 3.14159265359
```

##### demo/app.jsonic

```javascript
	@uses math
	PI_nums PI_SHORT
	PI_numl PI_LONG
```

### <p align="center">↓</p>
```javascript
 {
	 PI_nums: 3.14,
	 PI_numl: 3.14159265359
 }
```

Or shortly:

##### demo/math.jsonic

```javascript
	PI = (3.14, 3.14159265359)
```

##### demo/app.jsonic

```javascript
	@uses math
	PI_nums PI(0)
	PI_numl PI(1)
```

### <p align="center">↓</p>
```javascript
 {
	 PI_nums: 3.14,
	 PI_numl: 3.14159265359
 }
```
---

### Functions

##### [!] The functions is not fully tested feature, and not fully supports by JS API.

Call JS function from global space. To define a function, use add_var.

Syntax:
``` javascript
variable = <name> <arguments>!
```

#### Example:

###### demo.js
```javascript
let jsonic = require("./jsonic")
jsonic.add_var("log", function(text){
	console.log(text)
	return '""' // return must be quoted, we returning JSON content.
})
jsonic.object_file("demo.jsonic")
```

###### demo.jsonic
```javascript
# Call log
call_example log "Hi"!
```

### <p align="center">↓</p>
```javascript
 alex-pc:~demos$ node demo.js
 Hi
```
---

### String concatenation types
JSONic has many concatenation types, separated by result of parsing:

- & symbol
```
	"Hello" & " " & "World" # => "Hello World"
```

- \+ sign

```
	"Hello" + "World" # => "Hello" + "World"
```

- And nq-concat(not quoted) in arguments of function.  

---

### Marks
The new update of JSONic is a marks. Mark contain part of code, that not parsed if found, but if call, replaces itself to parsed content. @uses imports all marks in including file.

#### Syntax:

When create:

```
<name> { <block> }
```

When call:

```
<name>?
```

###### marks.jsonic 
```
	fruit_factories {
		apples (
			name "Giga-Factory"
			address "Carl St. 55"
		)
		bananas (
			name "Banana-Factory"
			address "Carl St. 53"
		)
	}
```

###### demo.jsonic

```
	@uses marks
	fruit_factories?
```

###### demo.js

```
	let jsonic = require("jsonic-preprocessor")
	jsonic.fwrite_result("demo.jsonic", "demo.json")
```

###### Terminal

```bash
alex-pc:~demos$ node demo.js
alex-pc:~demos$
```

### <p align="center">↓</p>

###### demo.json
```javascript
{
	"apples": {	
		"name": "Giga-Factory",
		"address": "Carl St. 55"
	},
	"bananas": {	
		"name": "Banana-Factory",
		"address": "Carl St. 53"
	}
}
```

---
## JavaScript API

---

### Require
To require jsonic api:
```javascript
 let jsonic = require("./jsonic")
```

### jsonic.object_file
This function reads file content and returns JSON string. Syntax:
	
```javascript
	jsonic.object_file(<path>)
```
	
### jsonic.object_string
Parses given string and returns JSON string. Syntax:

```javascript
	jsonic.object_string(<path>)
```

Example:

```javascript
 let jsonic = require("./jsonic")
 let string = "apples 1 bananas 3"
 let obj = JSON.parse(jsonic.object_string(string))

 console.log(obj["apples"] + "\n" + obj["bananas"]) // => 1 \n 3
```

### jsonic.add_var
Add variable or function to global space. Syntax:
	
```
	jsonic.add_var(<name>, <value>)
```

### jsonic.get_var
Gets var from global space. Syntax:

```
	jsonic.get_var(<name>)
```

### jsonic.use_file
Use file like @uses. Syntax:

```
	jsonic.use_file(<name(without ".jsonic", in curr dir>)
```

---

### jsonic.fwrite_result
Write result of preprocessing to file

Syntax:
```
	jsonic.fwrite_result(<from>, <to>)
```

### jsonic.init_fns
Initialize all additional functions.

Syntax:
```
	jsonic.init_fns()
```

---

## Additional functions

---

### math
Have some math functions:

- math.abs a!
- math.acos a!
- math.asin a!
- math.atan a!
- math.atan2 a,b!
- math.ceil a!
- math.cos a!
- math.exp a!  
- math.floor a! 
- math.log a!
- math.max a,b!
- math.min a,b!
- math.pow a,b!
- math.random!
- math.round a!
- math.sin a!
- math.sqrt a!
- math.tan a!

### print
The `print` command gets all arguments and print it:

```
print "Hello World", 4, 3 + 3! # => Hello World 4 6
```

### date
Parses given template and returns date result. Template syntax:

- d - day
- m - month
- n - minute
- y - year
- h - hour

Other characters will be ignored.

#### Example:
```
	curr_date = date "h:m"!
	print curr_date! # => 12:05
```

---

## Changelog

---
#### 1.0.0
First version.

#### 1.1.0
Fixed some documentation bugs.

#### 1.1.1
Fixed not-defined error when calling jsonic.

#### 1.2.1
Fixed:

- Documentation
- Some other bugs

Added:

- Function calling
- Great formatting
-  object_string, object_file returns preprocessed string

Removed:

- JSON object returning in object_string, object_file methods.

### 1.2.2
Fixed:

- Documentation

### 1.3.2

Fixed:

- When call just first function works
- Documentation
- Other bugs

Added:

- New concatenation type
- Marks
- API Updates
- Additional functions

---

### Will be added

Site: 

- JSONic live editing

Preprocessor:

- Function creating

Opportunity to create function inside .jsonic file without JS.

#### Example:

```javascript
Math.PI {
	ret 3.14
}

demo Math.PI! # => demo: 3.14
```

#### And more, like IF, ELSE, ELSIF, etc...

---
### If some not works, say me.
#### Documentation may not finished
I fix MANY bugs after some time. Test it with fun!
Waiting for YouTube tutorials on Russian. After some time on English.

#### P.S: my english is not good, plz sorry for errors.

---
- [GitHub Page](https://alexscripts.github.io/jsonic/)
- [GitHub Source](https://github.com/AlexScripts/jsonic)
- [NPM](https://www.npmjs.com/package/jsonic-preprocessor)

(C) Alexey Yurchenko, 2017
