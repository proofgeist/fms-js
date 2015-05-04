/**
 * Created by toddgeist on 5/3/15.
 */

var chai = require('chai');
var should = chai.should();

var fms =  require('../index');
var config = require('./config')


global.connection = fms.connection(config);

global.test = {
    dbname : 'ContactsTest',
    layoutname : 'Contacts',
    findRecordID : '0AD880FE-9B4A-A93D-4FF1-81130554CA52'
};