const encryptionProvider = require('./encryptionProvider');
const cryptarify = require('./cryptarify');
const typeHandler = require('./typeHandler');

const encryptValue = async function(value) {
	const dataKey = await encryptionProvider.generateDataKey();
	let encObject = typeHandler.forEncryption(value);
	if (!encObject) {
		// always return the original value if typeHandling fails
		return value;
	}
	let encryptedObject = encryptionProvider.encrypt(dataKey, encObject);
	let encString = cryptarify(encryptedObject);
	return encString;
};
module.exports = encryptValue;
