const typeHandler = require('./typeHandler');
const CryptoObject = require('./CryptoObject');

/**
 * @alias module:api
 * @description Decrypts an encrypted string and returns the original typed value.
 *
 * @param {String} encryptedString the encrypted string
 * @param {Object} [options]
 * @param {String} [options.onError] keep or throw
 * @returns {String|Date|Array|Number|Object}
 * @summary
 * <p>
 *	Returns the unecrypted value of the original type
 * </p>
 * <p>
 * If an exception occurs:
 * <ul>
 * 	<li>options.onError === keep  (default) :  the encrypted string is returned</li>
 * 	<li>options.onError === throw : an exception is thrown</li>
 * </ul>
 * </p>
 * @example
 // encrypt a date
 let today = new Date();
 let encrypted = await encryptValue(today);
 assert.equal(typeof encrypted,'string');
 assert.equal(encrypted.indexOf('_cryptari'),0);

 // decryption starts here
 let decrypted = await decryptValue(encrypted);
 assert.equal(decrypted.getTime(), today.getTime());
 */
const decryptValue = async function(provider,encryptedString, opts) {
	if (!opts) { opts = {}; }
	try {
		let cryptoObject = new CryptoObject(encryptedString);
		if (!cryptoObject.isValid()) {
			// always return the original value if decryptarification fails
			return encryptedString;
		}
		let dk = await provider.decryptDataKey(cryptoObject.dataKeyEncryptedHex);
		if (!dk) {
			return encryptedString;
		}
		let decrypted;
		decrypted = provider.decrypt(cryptoObject.encryptedHex, dk);
		if (!decrypted) {
			return encryptedString;
		}
		var finalVal = typeHandler.fromEncryption(decrypted, cryptoObject.type);
		return finalVal;
	} catch (ex) {
		if (opts.onError == 'throw') {
			throw ex;
		}
		return encryptedString;
	}
};
module.exports = function(provider){
	return function(encryptedString, opts){
		return decryptValue(provider,encryptedString, opts);
	};
};
