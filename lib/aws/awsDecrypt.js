const aesjs = require('aes-js');
const decryptDataKey = async function(kms, dataKeyEncryptedHex) {
	try {
		let encDataKeyBytes = aesjs.utils.hex.toBytes(dataKeyEncryptedHex);
		let data = await kms.decrypt({
			CiphertextBlob: Buffer(encDataKeyBytes)
			// CiphertextBlob: Buffer(encyptedDataKey, 'base64')
		}).promise();
		return data.Plaintext;
	} catch (ex) {
		console.log('error aws decrypt', ex);
		return ex;
	}
};

const decrypt = function(kms, encryptedHex, decryptedDataKeyBytes) {
	try {
		let aesCtr = new aesjs.ModeOfOperation.ctr(decryptedDataKeyBytes);
		let bytes = aesjs.utils.hex.toBytes(encryptedHex);
		let decryptedBytes = aesCtr.decrypt(bytes);
		return aesjs.utils.utf8.fromBytes(decryptedBytes);
	} catch (ex) {
		console.log('error aws decrypt', ex);
		return ex;
	}
};

module.exports = async function(kms) {
	return {
		decryptDataKey: async function(dataKeyEncryptedHex) {
			return await decryptDataKey(kms, dataKeyEncryptedHex);
		},
		decrypt: function(dataKey, encryptedHex) {
			return decrypt(kms, dataKey, encryptedHex);
		}
	};
};

module.exports['@async'] = false;
module.exports['@singleton'] = true;
module.exports['@require'] = ['kms'];
