const encryptionProvider = require('./encryptionProvider');
const cryptarify = require('./cryptarify');

const encryptValue = async function(value) {
	const dataKey = await encryptionProvider.generateDataKey();
	let encryptedObject = encryptionProvider.encrypt(dataKey, value);
	let encString = cryptarify(encryptedObject);
	return encString;
};
module.exports = encryptValue;
