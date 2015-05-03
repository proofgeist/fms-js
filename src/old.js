/**
 * Created by toddgeist on 3/30/15.
 */

'use strict'
var request = require('superagent');
var _ = require('lodash');
var is = require('is');
var xml2jsParser = require('superagent-xml2jsparser');
var FileMakerError = require('./FileMakerError');
var END_POINT = '/fmi/xml/fmresultset.xml'



/**
 * creates a FMS Connection
 * @param options
 * @returns {{post: Request, query: Function}}
 */
var connection = function (options) {

    var url = options.url;
    var protocol = options.protocol || 'http';
    var userName = options.userName;
    var password = options.password;

    /**
     * creates a Post Request
     * @returns {Request}
     */
    var createPostRequest = function () {
        var post = request
            .post(protocol + '://' + url + END_POINT)
            .auth(userName, password)
            .accept('xml')
            .parse(xml2jsParser);
        return post
    };

    /**
     * returns a raw query object. use ".send" to send it.
     * @param options
     * @returns {{send}|{send: Function}}
     */
    var query = function query(options){
        return createQuery(createPostRequest(), options)
    };


    /**
     * returns a query object that is fixed to the given DB and Layout
     * @param db
     * @param layout
     * @returns {{create: Function}}
     */
    var layout = function (db, layout) {
        var db = db ;
        var layout = layout

        /**
         * returns a "Create" request. use .send(cb) to send it to the server
         * @param data
         * @returns {{send}|{send: Function}}
         */
        var newRec = function (data) {
            data['-db'] = db;
            data['-lay'] = layout;
            data['-new'] = ''
            return createQuery(createPostRequest(), data)
        };

        var edit = function (data) {
            data['-db'] = db;
            data['-lay'] = layout;
            data['-edit'] = ''
            return createQuery(createPostRequest(), data)
        };

        var findAll = function () {
            var opts = {}
            opts['-db'] = db;
            opts['-lay'] = layout;
            opts['-findall'] = ''
            return createQuery(createPostRequest(), opts)
        }

        var find = function (findObject) {
            var opts = findObject
            opts['-db'] = db;
            opts['-lay'] = layout;
            opts['-find'] = ''
            return createQuery(createPostRequest(), opts)
        }

        return {
            create : newRec,
            new : newRec,
            findAll : findAll,
            find : find,
            edit : edit
        }

    };

    var version = function(){
        return createQuery(createPostRequest(), {})
    };

    return {
        version : version,
        query : query,
        layout : layout
    }

};

/**
 * creates a query object
 * @param post
 * @param options
 * @returns {{send: Function}}
 */
var createQuery = function (post, options) {

    var options = options
    var post = post
        .send(options)
        .set('Content-Type', 'application/x-www-form-urlencoded');


    var send = function(cb){
        post.end(function (err, response) {
            if(err) return cb(err)

            var fmResponse = parseFMResponse(response.body.fmresultset);
            if (is.instance (fmResponse, FileMakerError)) {
                fmResponse.url = post.req.path
                cb ( fmResponse )
            }else{
                cb (null, fmResponse )
            }
        })
    };

    var set = function(name, value){
        options[name]=value
        return this
    }

    return {
        send : send,
        set : set
    }
};

var parseFMResponse = function (fmresultset) {
    var error = fmresultset.error[0].$.code
    if(error != 0  && error != 401){
        return new FileMakerError(error,'')
    }
    var recordset = fmresultset.resultset[0]
    var records = recordset.record
    var data
    if (records){
        data = records.map(function (record) {
            var obj = remapFields(record.field);

            var relatedSets = record.relatedset
            if(relatedSets){
                obj.relatedSets = handleRelatedSets(relatedSets)
            }
            obj.mod_id= record.$['mod-id'];
            obj.record_id = record.$['record-id'];
            return obj
        })
    }else{
        data = [];
    }


    return {
        totalRecords : recordset.$.count ,
        error : error,
        fetchSize : recordset.$['fetch-size'],
        data : data
    }

};

var remapFields = function (fields) {
    var obj = {};
    fields.forEach(function (field) {
        obj[field.$.name] = field.data[0]
    });
    return obj
};

var handleRelatedSets = function(relatedSets){
    var result = [];
    relatedSets.forEach(function(relatedSet){
        var obj = {
            count: relatedSet.$.count,
            table: relatedSet.$.table
        }
        var records = relatedSet.record
        var data
        if (records){
            data = records.map(function (record) {
                var obj = remapFields(record.field);
                obj.mod_id= record.$['mod-id'];
                obj.record_id = record.$['record-id'];
                return obj
            })
        }else{
            data = [];
        }

        obj.data = data
        result.push(obj)
    })

    return result

}

module.exports =  {
    connection : connection
};
