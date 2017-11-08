
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
 */
module.exports =  {
	encryptValue:encryptValue,
	decryptValue:decryptValue,
	encryptObject:encryptObject,
	decryptObject:decryptObject
};

