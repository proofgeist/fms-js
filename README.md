# fms-js
node and browser connection for FileMaker Server

### Status: 2 - unstable
The api is under development and may change. Backwards compatibility will be maintained if feasible. See [node stability ratings](https://gist.github.com/isaacs/1776425)

### Installation
fms-js can be installed using npm 

`npm install fms-js`

### Usage
Once installed you can require the fms object, and start to use it

```javascript
var fms = require('fms-js');

// create a connection object

var connection = fms.connection({
	url : '<url>',
	userName : 'username',
	password : 'password'
});

//use the connection object to create requests
var listDBNamesRequest = connection.dbnames();

//and send it to FileMaker Server
//all request are asynchronous. 
//Pass the callback to the 'send()' method

listDBNamesRequest.send(callback)

```

The API is chainable. So you can do some fun expressive things.  The following will find the first 10 contacts who have the firstName 'todd"

```javascript
connection
	.db('Contacts')
	.layout('contacts')
	.find({
		'firstName' : 'todd'
	})
	.set('-max', 10)
	.send(callback)

```
You can keep a reference to any point in the chain. So this is the equivilent of the above

```javascript
var db = connection.db('Contacts');
var layout = db.layout('contacts');
var findRequest = layout.find({
		'firstName' : 'todd'
	})
var findRequestFirstTen = findRequest.set('-max', 10)
findRequestFirstTen.send(callback)
```

### General Concepts
fms-js uses the same commands and parameters as the XML Gateway provided by the FileMaker Server. They are just exposed in a more fluent chainable way.

The API creates requests which you then send to the server

All requests made to the FileMaker Server are asynchronous. That means they will take a 'callback'.  The callback gets two parameters, the first is an error, the second is the result.  This is standard node callback style.

Example: Get all script names from the contactsTest db.

```javascript
connection
	.db('contactTest')
	.scriptnames()
	.send(function(err, result){
		//err will be null on a succesful request
		//err will contain an Error when it fails
		
		//result be null on error
		//result will contains the request result on success
	})
```
### API

##### fms.connection( {options} )

* Options

	* url - the url or ip address of the server
	* username - the userName
	* password -  the password

* Returns
	* a connection object


##### connection.dbnames()

* No parameters
* returns a request for all database names on the server. Send it with .send()

##### connection.db(databasename)

* Takes the database name
* Returns a DB object

##### db.scriptnames()
* No parameters
* returns a request for all script names in the file. Send it with .send()

##### db.layoutnames()
* No parameters
* returns a request for all layouts in the file. Send it with .send()

##### db.layout(layoutname)

* Takes the layout name
* Returns a Layout object

##### layout.query(options)
* takes an options object containing the name values pairs from the xml gateway
* returns a request object. send it with .send()

This can be used to perform any layout based request. You provide the name value pairs in the form of an object.  For example this object

```javascript
{
	'-scriptname' : "RunOnFoundSet"
	'-max' : 100
	'-findall' : ''
}
```
would return an Request Object that would return the first 100 records on the layout, and a run a script called "RunOnFoundSet".  For more information on what options are available see the XML Web Publishing Guide for FileMaker Server.

The rest of the API provides short hand methods on top of this query

##### layout.find({criteria})
* takes an object with field name and field value pairs
* returns a request object. send it with .send

##### layout.findall({options})
* takes an options object with any of the query modifiers like '-max', '-sort'
* returns a request object that finds all records on the layout. send it with .send

##### layout.findany({options})
* takes an options object with any of the query modifiers like '-max', '-sort'
* returns a request object that finds a random record. send it with .send

##### layout.create({options})
* takes an options object with all data and query options
* returns a request object that will create a record. send it with .send

##### layout.edit({options})
* takes an options object with all data and query options. IT MUST include the recid field
* returns a request object that will edit a record. send it with .send

##### layout.delete({options})
* takes an options object with all data and query options. IT MUST include the recid field
* returns a request object that will delete the record. send it with .send

##### request.set(name, value)
* parmaters
	* name - the name of the option to set
	* value - the value to set it to
* Returns
	* the request object 

you can use this to modify a request before sending it. It will override any options that were sent in before. For example, give a findall request in the variable 'request'

```javascript
request
	.set('-max', 100)
	.set('-sortfield', 'lastName')
	.set('-sortorder, 'ascend' )
	.send(callback)
```
would set the max returned to 100, and the sort to lastName ascending, before sending it with .send(callback). This gives you another more fluent way of building up requests.

##### request.send(callback)
* parameter
	* callback - the function to run when the request is complete.

