/**
 * Created by toddgeist on 5/4/15.
 */


fms = require('fms-js');

var options = {
    url : '<filemaker.server.url.or.address>' ,
    userName : "userName",
    password : "password"
};

var connection = fms.connection(options);

var findAllRequest = connection.db('contacts').layout('webContacts').findall();
findAllRequest.send(function(err, result){
    console.log(result)
});
