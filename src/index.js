
require('babel-core/register');
require('babel-polyfill');
const encryptObject = require('./lib/encryptObject');
const decryptObject = require('./lib/decryptObject');
const encryptValue = require('./lib/encryptValue');
const decryptValue = require('./lib/decryptValue');

/**
 * Crypatri Api
 * @module api
 @description
 <p>
		Please note: All methods are async and return promises
 </p>
 <p>
 All values will be encrypted as strings in the following format:

`_cryptari.[version].[encryptedDataKey].[encryptedValue].[type].[chksum]`

TODO Describe the properties once implemented

</p>
 */
module.exports =  {
	encryptValue:encryptValue,
	decryptValue:decryptValue,
	encryptObject:encryptObject,
	decryptObject:decryptObject
};

