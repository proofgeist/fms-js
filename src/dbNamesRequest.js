/**
 * Created by toddgeist on 5/3/15.
 */
'use strict'
var createQuery = require('./createRequest');

/**
 * creates a query request with no options
 * @param request
 * @returns {*}
 */
module.exports = function (request) {

    return createQuery(request, {'-dbnames' : '' } );

}