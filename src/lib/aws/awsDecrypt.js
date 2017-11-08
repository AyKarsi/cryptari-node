const aesjs = require('aes-js');
const Kms = require('./kms');
const decryptDataKey = async function(kms,dataKeyEncryptedHex) {
	let encDataKeyBytes = aesjs.utils.hex.toBytes(dataKeyEncryptedHex);
	let data = await kms.decrypt({
		CiphertextBlob: Buffer(encDataKeyBytes)
		// CiphertextBlob: Buffer(encyptedDataKey, 'base64')
	}).promise();
	return data.Plaintext;
};

const decrypt = function(encryptedHex, decryptedDataKeyBytes) {
	let aesCtr = new aesjs.ModeOfOperation.ctr(decryptedDataKeyBytes);
	let bytes = aesjs.utils.hex.toBytes(encryptedHex);
	let decryptedBytes = aesCtr.decrypt(bytes);
	return aesjs.utils.utf8.fromBytes(decryptedBytes);
};

module.exports = function(config) {
	let kms = Kms(config);
	return {
		decryptDataKey:function(dataKeyEncryptedHex) {
			return decryptDataKey(kms,dataKeyEncryptedHex);
		},
		decrypt:decrypt
	};
};
