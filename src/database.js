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
var db = function (request, name){
    var request = request;
    var dbname = name;

    if(dbname === undefined){
        throw new FMSJSError('name is a required parameter')
    }

    var createScriptNamesRequest = function () {
        var opts = {
            "-db" : dbname,
            "-scriptnames" : ""
        }
        return createRequest(request, opts )
    }

    var createLayoutNamesRequest = function () {
        var opts = {
            "-db" : dbname,
            "-layoutnames" : ""
        }
        return createRequest(request, opts )
    }

    var layout = function(name){
        return createLayout(request, dbname, name)
    }

    return {
        scriptnames : createScriptNamesRequest,
        layoutnames : createLayoutNamesRequest,
        layout : layout
    }


}

module.exports = db