
module.exports = async function(encryptionProvider, decryptarify,typeHandler) {
	const decryptValue = async function(encrypteString) {
		let cp = decryptarify.toEncryptedObject(encrypteString);
		let dk = await encryptionProvider.decryptDataKey(cp.dataKey);
		let decrypted = encryptionProvider.decrypt(cp.encryptedValue,dk);
		var finalVal = typeHandler.fromEncryption(decrypted,cp.type);
		return finalVal;
	};
	return decryptValue;
};

module.exports['@async'] = false;
module.exports['@singleton'] = true;
module.exports['@require'] = ['encryptionProvider', 'decryptarify','typeHandler'];
