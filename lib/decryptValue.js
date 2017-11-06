const encryptionProvider = require('./encryptionProvider');
const decryptarify = require('./decryptarify');
const typeHandler = require('./typeHandler');

const decryptValue = async function(encrypteString) {
	let cp = decryptarify.toEncryptedObject(encrypteString);
	let dk = await encryptionProvider.decryptDataKey(cp.dataKey);
	let decrypted = encryptionProvider.decrypt(cp.encryptedValue,dk);
	var finalVal = typeHandler.fromEncryption(decrypted,cp.type);
	return finalVal;
};
module.exports = decryptValue;

