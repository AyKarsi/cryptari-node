
require('babel-core/register');
require('babel-polyfill');
const encryptObject = require('./lib/encryptObject');
const decryptObject = require('./lib/decryptObject');
const encryptValue = require('./lib/encryptValue');
const decryptValue = require('./lib/decryptValue');
const enryptionProvider = require('./lib/encryptionProvider');
const awsConfig = require('./lib/aws/awsConfig');

/**
 * Crypatri Api
 * @module api
 @description
 <p>
		Please note: All methods are async and return promises
 </p>
# Encrypted Values
 <p>
 All values will be encrypted as strings in the following format:

`_cryptari.[version].[encryptedDataKey].[encryptedValue].[type].[chksum]`

TODO Describe the properties once implemented

</p>
 */
// module.exports =  {
// 	encryptValue:encryptValue,
// 	decryptValue:decryptValue,
// 	encryptObject:encryptObject,
// 	decryptObject:decryptObject
// };


module.exports = function(opts){
	if (!opts) {opts = awsConfig;}
	let provider =  new enryptionProvider(opts);
	return {
		encryptValue:encryptValue(provider),
		decryptValue:decryptValue(provider),
		encryptObject:encryptObject(provider),
		decryptObject:decryptObject(provider)
	};
};

