const aesjs = require('aes-js');
const kms = require('./kms');
const config = require('./awsConfig');
let keyId = config.cmkKeyId;

const params = {
	KeyId: keyId,
	KeySpec: 'AES_256'
};

const encrypt = function(dataKey, encObject) {
	try {
		let aesCtr = new aesjs.ModeOfOperation.ctr(dataKey.plainBytes);
		let encryptedBytes = aesCtr.encrypt(encObject.valBytes);
		let enc = aesjs.utils.hex.fromBytes(encryptedBytes);
		return {
			dataKeyEncryptedHex: dataKey.encryptedHex,
			encryptedHex: enc,
			type: encObject.type
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
