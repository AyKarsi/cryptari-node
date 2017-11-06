module.exports = async function(encryptionProvider,cryptarify) {
	const encryptValue = async function(value) {
		const dataKey = await encryptionProvider.generateDataKey();
		let encryptedObject = encryptionProvider.encrypt(dataKey, value);
		let encString = cryptarify(encryptedObject);
		return encString;
	};
	return encryptValue;
};

module.exports['@async'] = false;
module.exports['@singleton'] = true;
module.exports['@require'] = ['encryptionProvider','cryptarify'];
