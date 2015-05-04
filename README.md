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