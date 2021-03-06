const typeHandler = require('./typeHandler');
const CryptoObject = require('./CryptoObject');

/**
 * @memberOf Cryptari
 * @instance
 * @description Encrypts Strings, Dates, Arrays or Numbers
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
		let co = new CryptoObject(value);
		if (co.isValid()){
			// value is encrypted allready return the same value.
			return value;
		}
		const dataKey = await provider.generateDataKey();
		let encObject = typeHandler.forEncryption(value);
		if (!encObject) {
			// always return the original value if typeHandling fails
			return value;
		}
		let cryptoObject = provider.encrypt(dataKey, encObject);
		if (cryptoObject){
			return cryptoObject.toString();
		}
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
