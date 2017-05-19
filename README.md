# <p align="center">JSONic

<p align="center"> Short demonstration of features

___

## 1.JSON 

---
Simple properties:

	apples 5
	bottles 4
	bananas 3
  
  
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

	fruits (
		apples 5
		bananas 3
	)
	bottles 4
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

	fruits "apples", "bananas", "oranges"

### <p align="center">↓</p>
```javascript
 {
	 fruits: ["apples", "bananas", "oranges"]
 }
```

To define a dict:

	fruits (
		apples 1
		bananas 4
	)
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

---
### String concatenation
To concat string:
	
	name "Alex" + "Yurchenko"

### <p align="center">↓</p>
```javascript
 {
	 name: "Alex" + "Yurchenko"
 }
```
---
### Math
The math:
	
	apples 1 + 4
	bananas 2 * ( 1 + 3 )

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
	
	some_name = "Some value"

Variable support list type:

	some_name = ("Some Value", 1 + 3, "Das ist gut.")

To call list item:
	
	some_name(0) # => Some Value
	some_name(1) # => 4
	...

---
### Comments
Single-line comment:

	# Hello World

Multi-line comment:

	#
		I am multi-line
	#

---

### @uses
This command imports all variables from selected file. Syntax:
	
	@uses <file>

Example:

##### demo/math.jsonic
	PI_SHORT = 3.14
	PI_LONG = 3.14159265359

##### demo/app.jsonic
	@uses math
	PI_nums PI_SHORT
	PI_numl PI_LONG

### <p align="center">↓</p>
```javascript
 {
	 PI_nums: 3.14,
	 PI_numl: 3.14159265359
 }
```

Or shortly:
##### demo/math.jsonic
	PI = (3.14, 3.14159265359)

##### demo/app.jsonic
	@uses math
	PI_nums PI(0)
	PI_numl PI(1)

### <p align="center">↓</p>
```javascript
 {
	 PI_nums: 3.14,
	 PI_numl: 3.14159265359
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
This function reads file content and returns parsed JSON object. Syntax:
	
	jsonic.object_file(<path>)
	
### jsonic.object_string
Parse given string and return JSON object. Syntax:

	jsonic.object_string(<string>)

Example:
```javascript
 let jsonic = require("./jsonic")
 let string = "apples 1 bananas 3"
 let obj = jsonic.object_string(string)

 console.log(obj["apples"] + "\n" + obj["bananas"]) // => 1 \n 3
```

### jsonic.add_var
Add variable to global space. Syntax:
	
	jsonic.add_var(<name>, <value>)

### jsonic.get_var
Gets var from global space. Syntax:
	
	jsonic.get_var(<name>)

### jsonic.use_file
Use file like @uses. Syntax:
		
	jsonic.use_file(<name(without ".jsonic", in curr dir>)

---
### If some not works, say me.
I fix MANY bugs after some time. Test it with fun!

---
(C) Alexey Yurchenko, 2017
