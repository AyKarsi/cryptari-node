const aesjs = require('aes-js');
const kms = require('./kms');
const config = require('./awsConfig');

const generateDataKey = async function() {
	let keyId = config.cmkKeyId;
	const params = {
		KeyId: keyId,
		KeySpec: 'AES_256'
	};
	let data = await kms.generateDataKey(params).promise();
	let encryptedHex = aesjs.utils.hex.fromBytes(data.CiphertextBlob);
	return {
		plainBytes: data.Plaintext,
		encryptedHex: encryptedHex,
		KeyId: data.KeyId
	};
};

const encrypt = function(dataKey, encObject) {
	let aesCtr = new aesjs.ModeOfOperation.ctr(dataKey.plainBytes);
	let encryptedBytes = aesCtr.encrypt(encObject.valBytes);
	let enc = aesjs.utils.hex.fromBytes(encryptedBytes);
	return {
		dataKeyEncryptedHex: dataKey.encryptedHex,
		encryptedHex: enc,
		type: encObject.type
	};
};


module.exports = {
	generateDataKey: generateDataKey,
	encrypt: encrypt
};
