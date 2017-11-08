const encryptionProvider = require('./encryptionProvider');
const decryptarify = require('./decryptarify');
const typeHandler = require('./typeHandler');

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
const decryptValue = async function(encryptedString, opts) {
	if (!opts) { opts = {}; }
	try {
		let cp = decryptarify.toEncryptedObject(encryptedString);
		if (!cp || cp === encryptedString) {
			// always return the original value if decryptarification fails
			return encryptedString;
		}
		let dk = await encryptionProvider.decryptDataKey(cp.dataKey);
		if (!dk) {
			return encryptedString;
		}
		let decrypted;
		decrypted = encryptionProvider.decrypt(cp.encryptedValue, dk);
		if (!decrypted) {
			return encryptedString;
		}
		var finalVal = typeHandler.fromEncryption(decrypted, cp.type);
		return finalVal;
	} catch (ex) {
		if (opts.onError == 'throw') {
			throw ex;
		}
		return encryptedString;
	}
};
module.exports = decryptValue;
