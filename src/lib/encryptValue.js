const cryptarify = require('./cryptarify');
const typeHandler = require('./typeHandler');
/**
 * @alias module:api
 * @description Encrypts (nearly) any value
 *
 * @param {String|Date|Array|Number|Object} Value The unencrypted value. This value must be "stringifyable".
 * @param {Object} [options]
 * @param {String} [options.onError] keep or throw
 * @returns {String}
 * @summary
 * <p>
 * 	Returns an encrypted string of the given value
 * </p>
 * <p>
 * 	The given value must a value which can be converted into string.
 * </p>
 * <p>
 * 	Please be aware that to persist the value, a type change might be needed in your database.
 * </p>
  * <p>
 * If an exception occurs:
 * <ul>
 * 	<li>options.onError === keep  (default) :  the unencrypted string is returned</li>
 * 	<li>options.onError === throw : an exception is thrown</li>
 * </ul>
 * </p>
 @example
 let encrypted = await encryptValue(someValue);
 assert.equal(typeof encrypted,'string');
 assert.equal(encrypted.indexOf('_cryptari'),0);
 */
const encryptValue = async function(provider,value,opts) {
	if (!opts) { opts = {};}
	try {
		const dataKey = await provider.generateDataKey();
		let encObject = typeHandler.forEncryption(value);
		if (!encObject) {
			// always return the original value if typeHandling fails
			return value;
		}
		let encryptedObject = provider.encrypt(dataKey, encObject);
		let encString = cryptarify(encryptedObject);
		return encString;
	}catch(ex) {
		if (opts.onError == 'throw') {
			throw ex;
		}
		return value;
	}
};
module.exports = function(provider){
	return function(value, opts){
		return encryptValue(provider,value,opts);
	};
};
