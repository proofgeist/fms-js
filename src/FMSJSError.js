/**
 * Created by toddgeist on 5/3/15.
 */


module.exports = exports = FMSJSError;

/**
 * FileMaker Error - based on https://coderwall.com/p/m3-cqw
 * @param code
 * @param msg
 * @constructor
 */
function FMSJSError(message) {
    this.message = message
    this.name = 'FMSJSError';
    const err = Error(this.message); // http://es5.github.io/#x15.11.1
    this.stack = err.stack;
}

FMSJSError.prototype = Object.create(Error.prototype);
FMSJSError.prototype.constructor = FMSJSError;