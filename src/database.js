/**
 * Created by toddgeist on 5/3/15.
 */

var createRequest = require('./createRequest');
var createLayout = require('./createLayout');
var FMSJSError = require('./FMSJSError');


/**
 * creates a DB object
 * @param request
 * @param dbname
 */
var db = function (postFactory, name){
    var postFactory = postFactory;
    var dbname = name;

    if(dbname === undefined){
        throw new FMSJSError('name is a required parameter')
    }

    var createScriptNamesRequest = function () {
        var opts = {
            "-db" : dbname,
            "-scriptnames" : ""
        }
        return createRequest(postFactory(), opts )
    }

    var createLayoutNamesRequest = function () {
        var opts = {
            "-db" : dbname,
            "-layoutnames" : ""
        }
        return createRequest(postFactory(), opts )
    }

    var layout = function(name){
        return createLayout(postFactory, dbname, name)
    }

    return {
        scriptnames : createScriptNamesRequest,
        layoutnames : createLayoutNamesRequest,
        layout : layout
    }


}

module.exports = db