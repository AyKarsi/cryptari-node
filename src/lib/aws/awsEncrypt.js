const aesjs = require('aes-js');
const Kms = require('./kms');

const generateDataKey = async function(kms,keyId) {
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

module.exports = function(config) {
	let kms = Kms(config);
	let keyId = config.cmkKeyId;
	return {
		generateDataKey:function() {
			return generateDataKey(kms,keyId);
		},
		encrypt:encrypt
	};
};
