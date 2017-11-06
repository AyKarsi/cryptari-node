const aesjs = require('aes-js');
const kms = require('./kms');
const typeHandler = require('./../typeHandler');
const config = require('config');
let keyId;
if (config && config.aws && config.aws.AWS_REGION) {
	keyId = config.aws.AWS_CMK_ID;
}

const params = {
	KeyId: keyId,
	KeySpec: 'AES_256'
};

const encrypt = function(dataKey, secretValue) {
	try {
		let encVal = typeHandler.forEncryption(secretValue);
		let aesCtr = new aesjs.ModeOfOperation.ctr(dataKey.plainBytes);
		let bytes = aesjs.utils.utf8.toBytes(encVal.valString);
		let encryptedBytes = aesCtr.encrypt(bytes);
		let enc = aesjs.utils.hex.fromBytes(encryptedBytes);
		return {
			dataKeyEncryptedHex: dataKey.encryptedHex,
			encryptedHex: enc,
			type: encVal.type
		};
	} catch (ex) {
		return ex;
	}
};

const generateDataKey = async function() {
	try {
		let data = await kms.generateDataKey(params).promise();
		let encryptedHex = aesjs.utils.hex.fromBytes(data.CiphertextBlob);
		return {
			plainBytes: data.Plaintext,
			encryptedHex: encryptedHex,
			KeyId: data.KeyId
		};
	} catch (ex) {
		console.log('error generating datakey', ex);
	}
};

module.exports = {
	generateDataKey: generateDataKey,
	encrypt: encrypt
};
