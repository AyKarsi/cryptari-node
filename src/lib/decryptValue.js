const encryptionProvider = require('./encryptionProvider');
const decryptarify = require('./decryptarify');
const typeHandler = require('./typeHandler');

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
