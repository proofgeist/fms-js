/**
 * Created by toddgeist on 5/3/15.
 */

var creatRequest = require('./createRequest');
var _ = require('lodash');

/**
 * creates a layout object
 *
 * The layout object can be used to create requests
 * with a set of factory functions. Those requests
 * can be sent by calling <request>.send( callback )
 *
 * @param request
 * @param dbname
 * @param name
 * @returns {{query: Function, findany: Function, find: Function, create: Function, new: Function, edit: Function, remove: Function, delete: Function}}
 */
var createLayout = function(request, dbname, name){

    var request = request;
    var dbname = dbname;
    var name = name

    var baseOptions = function () {
        return {
            "-db" : dbname,
            "-lay" : name
        }
    }

    /**
     * creates a generic query request. you will have to provide all options
     * @param options
     * @returns {*}
     */
    var query = function (options) {
        var requestOptions = baseOptions()
        requestOptions = _.extend(requestOptions, options)

        return creatRequest(request,requestOptions)
    }

    /**
     * creates a findany request
     * @param options
     * @returns {*}
     */
    var findany = function (options) {
        var requestOptions = baseOptions()
        requestOptions = _.extend(requestOptions, options)
        requestOptions['-findany'] = ''
        return creatRequest(request, requestOptions )
    }

    /**
     * creates a findall request
     * @param options
     * @returns {*}
     */
    var findall = function (options) {
        var requestOptions = baseOptions()
        requestOptions = _.extend(requestOptions, options)
        requestOptions['-findall'] = ''
        return creatRequest(request, requestOptions)
    }

    /**
     * creates a find request
     * @param criteria
     * @param options
     * @returns {*}
     */
    var find = function (criteria, options) {
        var requestOptions = baseOptions()
        requestOptions = _.extend(requestOptions, criteria)
        requestOptions = _.extend(requestOptions, options)
        requestOptions['-find'] = ''
        return creatRequest(request, requestOptions )
    }

    /**
     * creates a create record request
     * @param data
     * @param options
     * @returns {*}
     */
    var create = function(data, options){
        var requestOptions = baseOptions()
        requestOptions = _.extend(requestOptions, data)
        requestOptions = _.extend(requestOptions, options)
        requestOptions['-new'] = '';
        return creatRequest(request, requestOptions )
    }

    /**
     * creates an edit request
     * @param data
     * @param options
     * @returns {*}
     */
    var edit = function(data, options){
        var requestOptions = baseOptions()
        requestOptions = _.extend(requestOptions, data)
        requestOptions = _.extend(requestOptions, options)
        requestOptions['-edit'] = '';
        return creatRequest(request, requestOptions );
    }

    /**
     * creates a delete record request
     * @param recordid
     * @param options
     * @returns {*}
     */
    var remove = function(recordid, options){
        var requestOptions = baseOptions()
        requestOptions = _.extend(requestOptions, options)
        requestOptions['-recid'] = recordid;
        requestOptions['-edit'] = '';
        return creatRequest(request, requestOptions );
    }

    return {
        query : query,
        findany : findall,
        find : find,
        create : create,
        new : create,
        edit : edit,
        remove : remove,
        delete : remove

    }

}

module.exports = createLayout