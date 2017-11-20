const aesjs = require('aes-js');
const Kms = require('./kms');
const encrypt = require('./../encryptValueWithDataKey');

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
