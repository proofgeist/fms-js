/**
 * Created by toddgeist on 5/3/15.
 */
'use strict'
var _ = require('lodash');
var is = require('is');

var FileMakerServerError = require('./FileMakerServerError');


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
            if (is.instance (fmResponse, FileMakerServerError)) {
                fmResponse.url = post.req.url
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


/**
 * handle the response from the request
 * @param fmresultset
 * @returns {*}
 */
var parseFMResponse = function (fmresultset) {
    var error = fmresultset.error[0].$.code
    if(error != 0  && error != 401){
        return new FileMakerServerError(error,'')
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


/**
 * change the Object structure into { field : value, field2 , value2 }
 * @param fields
 * @returns {{}}
 */
var remapFields = function (fields) {
    var obj = {};
    fields.forEach(function (field) {
        obj[field.$.name] = field.data[0]
    });
    return obj
};


/**
 * handle all the relatedSets ie Portals
 * @param relatedSets
 * @returns {Array}
 */
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


module.exports = createQuery