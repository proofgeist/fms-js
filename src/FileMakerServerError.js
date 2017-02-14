/**
 * Created by toddgeist on 3/31/15.
 */
module.exports = exports = FileMakerServerError;

/**
 * FileMaker Error - based on https://coderwall.com/p/m3-cqw
 * @param code
 * @param msg
 * @constructor
 */
function FileMakerServerError(code, url) {
  this.url = url;
  this.error = code;
  this.message = getMessge(code);
  this.name = 'FileMakerServerError';
  console.log('FileMaker Error Code: ',error);
  const err = Error(this.message); // http://es5.github.io/#x15.11.1
  this.stack = err.stack;
  this.isTransient = isTransient(code);
}

FileMakerServerError.prototype = Object.create(Error.prototype);
FileMakerServerError.prototype.constructor = FileMakerServerError;

function isTransient(error){
  return  (error === '401' || error === '8003' || error === '301')
}

function getMessge(errorCode){
  var returnString = "";

  var errNo = parseInt(errorCode);
  switch (errNo)
  {
    case -1:  returnString="Unknown error";  break;
    case 0:  returnString="No error";  break;
    case 1:  returnString="User canceled action";  break;
    case 2:  returnString="Memory error";  break;
    case 3:  returnString="Command is unavailable (for example, wrong operating system, wrong mode, etc.)";  break;
    case 4:  returnString="Command is unknown";  break;
    case 5:  returnString="Command is invalid (for example, a Set Field script step does not have a calculation specified)";  break;
    case 6:  returnString="File is read-only";  break;
    case 7:  returnString="Running out of memory";  break;
    case 8:  returnString="Empty result";  break;
    case 9:  returnString="Insufficient privileges";  break;
    case 10:  returnString="Requested data is missing";  break;
    case 11:  returnString="Name is not valid";  break;
    case 12:  returnString="Name already exists";  break;
    case 13:  returnString="File or object is in use";  break;
    case 14:  returnString="Out of range";  break;
    case 15:  returnString="Can't divide by zero";  break;
    case 16:  returnString="Operation failed, request retry (for example, a user query)";  break;
    case 17:  returnString="Attempt to convert foreign character set to UTF-16 failed";  break;
    case 18:  returnString="Client must provide account information to proceed";  break;
    case 19:  returnString="String contains characters other than A-Z, a-z, 0-9 (ASCII)";  break;
    case 100:  returnString="File is missing";  break;
    case 101:  returnString="Record is missing";  break;
    case 102:  returnString="Field is missing";  break;
    case 103:  returnString="Relationship is missing";  break;
    case 104:  returnString="Script is missing";  break;
    case 105:  returnString="Layout is missing";  break;
    case 106:  returnString="Table is missing";  break;
    case 107:  returnString="Index is missing";  break;
    case 108:  returnString="Value list is missing";  break;
    case 109:  returnString="Privilege set is missing";  break;
    case 110:  returnString="Related tables are missing";  break;
    case 111:  returnString="Field repetition is invalid";  break;
    case 112:  returnString="Window is missing";  break;
    case 113:  returnString="Function is missing";  break;
    case 114:  returnString="File reference is missing";  break;
    case 130:  returnString="Files are damaged or missing and must be reinstalled";  break;
    case 131:  returnString="Language pack files are missing (such as template files)";  break;
    case 200:  returnString="Record access is denied";  break;
    case 201:  returnString="Field cannot be modified";  break;
    case 202:  returnString="Field access is denied";  break;
    case 203:  returnString="No records in file to print, or password doesn't allow print access";  break;
    case 204:  returnString="No access to field(s) in sort order";  break;
    case 205:  returnString="User does not have access privileges to create new records; import will overwrite existing data";  break;
    case 206:  returnString="User does not have password change privileges, or file is not modifiable";  break;
    case 207:  returnString="User does not have sufficient privileges to change database schema, or file is not modifiable";  break;
    case 208:  returnString="Password does not contain enough characters";  break;
    case 209:  returnString="New password must be different from existing one";  break;
    case 210:  returnString="User account is inactive";  break;
    case 211:  returnString="Password has expired";  break;
    case 212:  returnString="Invalid user account and/or password. Please try again";  break;
    case 213:  returnString="User account and/or password does not exist";  break;
    case 214:  returnString="Too many login attempts";  break;
    case 215:  returnString="Administrator privileges cannot be duplicated";  break;
    case 216:  returnString="Guest account cannot be duplicated";  break;
    case 217:  returnString="User does not have sufficient privileges to modify administrator account";  break;
    case 300:  returnString="File is locked or in use";  break;
    case 301:  returnString="Record is in use by another user";  break;
    case 302:  returnString="Table is in use by another user";  break;
    case 303:  returnString="Database schema is in use by another user";  break;
    case 304:  returnString="Layout is in use by another user";  break;
    case 306:  returnString="Record modification ID does not match";  break;
    case 400:  returnString="Find criteria are empty";  break;
    case 401:  returnString="No records match the request";  break;
    case 402:  returnString="Selected field is not a match field for a lookup";  break;
    case 403:  returnString="Exceeding maximum record limit for trial version of FileMaker Pro";  break;
    case 404:  returnString="Sort order is invalid";  break;
    case 405:  returnString="Number of records specified exceeds number of records that can be omitted";  break;
    case 406:  returnString="Replace/Reserialize criteria are invalid";  break;
    case 407:  returnString="One or both match fields are missing (invalid relationship)";  break;
    case 408:  returnString="Specified field has inappropriate data type for this operation";  break;
    case 409:  returnString="Import order is invalid";  break;
    case 410:  returnString="Export order is invalid";  break;
    case 412:  returnString="Wrong version of FileMaker Pro used to recover file";  break;
    case 413:  returnString="Specified field has inappropriate field type";  break;
    case 414:  returnString="Layout cannot display the result";  break;
    case 415:  returnString="Related Record Required";  break;
    case 500:  returnString="Date value does not meet validation entry options";  break;
    case 501:  returnString="Time value does not meet validation entry options";  break;
    case 502:  returnString="Number value does not meet validation entry options";  break;
    case 503:  returnString="Value in field is not within the range specified in validation entry options";  break;
    case 504:  returnString="Value in field is not unique as required in validation entry options";  break;
    case 505:  returnString="Value in field is not an existing value in the database file as required in validation entry options";  break;
    case 506:  returnString="Value in field is not listed on the value list specified in validation entry option";  break;
    case 507:  returnString="Value in field failed calculation test of validation entry option";  break;
    case 508:  returnString="Invalid value entered in Find mode";  break;
    case 509:  returnString="Field requires a valid value";  break;
    case 510:  returnString="Related value is empty or unavailable";  break;
    case 511:  returnString="Value in field exceeds maximum number of allowed characters";  break;
    case 600:  returnString="Print error has occurred";  break;
    case 601:  returnString="Combined header and footer exceed one page";  break;
    case 602:  returnString="Body doesn't fit on a page for current column setup";  break;
    case 603:  returnString="Print connection lost";  break;
    case 700:  returnString="File is of the wrong file type for import";  break;
    case 706:  returnString="EPSF file has no preview image";  break;
    case 707:  returnString="Graphic translator cannot be found";  break;
    case 708:  returnString="Can't import the file or need color monitor support to import file";  break;
    case 709:  returnString="QuickTime movie import failed";  break;
    case 710:  returnString="Unable to update QuickTime file reference because the database file is read-only";  break;
    case 711:  returnString="Import translator cannot be found";  break;
    case 714:  returnString="Password privileges do not allow the operation";  break;
    case 715:  returnString="Specified Excel worksheet or named range is missing";  break;
    case 716:  returnString="A SQL query using DELETE, INSERT, or UPDATE is not allowed for ODBC import";  break;
    case 717:  returnString="There is not enough XML/XSL information to proceed with the import or export";  break;
    case 718:  returnString="Error in parsing XML file (from Xerces)";  break;
    case 719:  returnString="Error in transforming XML using XSL (from Xalan)";  break;
    case 720:  returnString="Error when exporting; intended format does not support repeating fields";  break;
    case 721:  returnString="Unknown error occurred in the parser or the transformer";  break;
    case 722:  returnString="Cannot import data into a file that has no fields";  break;
    case 723:  returnString="You do not have permission to add records to or modify records in the target table";  break;
    case 724:  returnString="You do not have permission to add records to the target table";  break;
    case 725:  returnString="You do not have permission to modify records in the target table";  break;
    case 726:  returnString="There are more records in the import file than in the target table. Not all records were imported";  break;
    case 727:  returnString="There are more records in the target table than in the import file. Not all records were updated";  break;
    case 729:  returnString="Errors occurred during import. Records could not be imported";  break;
    case 730:  returnString="Unsupported Excel version. (Convert file to Excel 7.0 (Excel 95), Excel 97, 2000, or XP format and try again)";  break;
    case 731:  returnString="The file you are importing from contains no data";  break;
    case 732:  returnString="This file cannot be inserted because it contains other files";  break;
    case 733:  returnString="A table cannot be imported into itself";  break;
    case 734:  returnString="This file type cannot be displayed as a picture";  break;
    case 735:  returnString="This file type cannot be displayed as a picture. It will be inserted and displayed as a file";  break;
    case 800:  returnString="Unable to create file on disk";  break;
    case 801:  returnString="Unable to create temporary file on System disk";  break;
    case 802:  returnString="Unable to open file";  break;
    case 803:  returnString="File is single user or host cannot be found";  break;
    case 804:  returnString="File cannot be opened as read-only in its current state";  break;
    case 805:  returnString="File is damaged; use Recover command";  break;
    case 806:  returnString="File cannot be opened with this version of FileMaker Pro";  break;
    case 807:  returnString="File is not a FileMaker Pro file or is severely damaged";  break;
    case 808:  returnString="Cannot open file because access privileges are damaged";  break;
    case 809:  returnString="Disk/volume is full";  break;
    case 810:  returnString="Disk/volume is locked";  break;
    case 811:  returnString="Temporary file cannot be opened as FileMaker Pro file";  break;
    case 813:  returnString="Record Synchronization error on network";  break;
    case 814:  returnString="File(s) cannot be opened because maximum number is open";  break;
    case 815:  returnString="Couldn't open lookup file";  break;
    case 816:  returnString="Unable to convert file";  break;
    case 817:  returnString="Unable to open file because it does not belong to this solution";  break;
    case 819:  returnString="Cannot save a local copy of a remote file";  break;
    case 820:  returnString="File is in the process of being closed";  break;
    case 821:  returnString="Host forced a disconnect";  break;
    case 822:  returnString="FMI files not found; reinstall missing files";  break;
    case 823:  returnString="Cannot set file to single-user, guests are connected";  break;
    case 824:  returnString="File is damaged or not a FileMaker file";  break;
    case 900:  returnString="General spelling engine error";  break;
    case 901:  returnString="Main spelling dictionary not installed";  break;
    case 902:  returnString="Could not launch the Help system";  break;
    case 903:  returnString="Command cannot be used in a shared file";  break;
    case 904:  returnString="Command can only be used in a file hosted under FileMaker Server";  break;
    case 905:  returnString="No active field selected; command can only be used if there is an active field";  break;
    case 920:  returnString="Can't initialize the spelling engine";  break;
    case 921:  returnString="User dictionary cannot be loaded for editing";  break;
    case 922:  returnString="User dictionary cannot be found";  break;
    case 923:  returnString="User dictionary is read-only";  break;
    case 951:  returnString="An unexpected error occurred (returned only by web-published databases)";  break;
    case 954:  returnString="Unsupported XML grammar (returned only by web-published databases)";  break;
    case 955:  returnString="No database name (returned only by web-published databases)";  break;
    case 956:  returnString="Maximum number of database sessions exceeded (returned only by web-published databases)";  break;
    case 957:  returnString="Conflicting commands (returned only by web-published databases)";  break;
    case 958:  returnString="Parameter missing (returned only by web-published databases)";  break;
    case 971:  returnString="The user name is invalid.";  break;
    case 972:  returnString="The password is invalid.";  break;
    case 973:  returnString="The database is invalid.";  break;
    case 974:  returnString="Permission Denied.";  break;
    case 975:  returnString="The field has restricted access.";  break;
    case 976:  returnString="Security is disabled.";  break;
    case 977:  returnString="Invalid client IP address.";  break;
    case 978:  returnString="The number of allowed guests has been exceeded";  break;
    case 1200:  returnString="Generic calculation error";  break;
    case 1201:  returnString="Too few parameters in the function";  break;
    case 1202:  returnString="Too many parameters in the function";  break;
    case 1203:  returnString="Unexpected end of calculation";  break;
    case 1204:  returnString="Number, text constant, field name or '(' expected";  break;
    case 1205:  returnString="Comment is not terminated with '*/'";  break;
    case 1206:  returnString="Text constant must end with a quotation mark";  break;
    case 1207:  returnString="Unbalanced parenthesis";  break;
    case 1208:  returnString="Operator missing, function not found or '(' not expected";  break;
    case 1209:  returnString="Name (such as field name or layout name) is missing";  break;
    case 1210:  returnString="Plug-in function has already been registered";  break;
    case 1211:  returnString="List usage is not allowed in this function";  break;
    case 1212:  returnString="An operator (for example, +, -, *) is expected here";  break;
    case 1213:  returnString="This variable has already been defined in the Let function";  break;
    case 1214:  returnString="AVERAGE, COUNT, EXTEND, GETREPETITION, MAX, MIN, NPV, STDEV, SUM and GETSUMMARY: expression found where a field alone is needed";  break;
    case 1215:  returnString="This parameter is an invalid Get function parameter";  break;
    case 1216:  returnString="Only Summary fields allowed as first argument in GETSUMMARY";  break;
    case 1217:  returnString="Break field is invalid";  break;
    case 1218:  returnString="Cannot evaluate the number";  break;
    case 1219:  returnString="A field cannot be used in its own formula";  break;
    case 1220:  returnString="Field type must be normal or calculated";  break;
    case 1221:  returnString="Data type must be number, date, time, or timestamp";  break;
    case 1222:  returnString="Calculation cannot be stored";  break;
    case 1223:  returnString="The function referred to does not exist";  break;
    case 1400:  returnString="ODBC driver initialization failed; make sure the ODBC drivers are properly installed";  break;
    case 1401:  returnString="Failed to allocate environment (ODBC)";  break;
    case 1402:  returnString="Failed to free environment (ODBC)";  break;
    case 1403:  returnString="Failed to disconnect (ODBC)";  break;
    case 1404:  returnString="Failed to allocate connection (ODBC)";  break;
    case 1405:  returnString="Failed to free connection (ODBC)";  break;
    case 1406:  returnString="Failed check for SQL API (ODBC)";  break;
    case 1407:  returnString="Failed to allocate statement (ODBC)";  break;
    case 8003:  returnString="Record is locked. Similar to 301";  break;
  }
  return returnString;
}
