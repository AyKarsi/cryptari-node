const aesjs = require('aes-js');
const crypto = require('crypto');
const getMasterKey = require('./localMasterKey');
const encrypt = require('./../encryptValueWithDataKey');

const generateDataKey = async function() {
	let masterKey = getMasterKey();

	if (typeof masterKey === 'string') {
		masterKey = aesjs.utils.hex.toBytes(masterKey);
	}
	var textBytes = crypto.randomBytes(32);
	var aesCtr = new aesjs.ModeOfOperation.ctr(masterKey, new aesjs.Counter(5));
	var encryptedBytes = aesCtr.encrypt(textBytes);
	var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

	return {
		plainBytes: textBytes,
		encryptedHex: encryptedHex,
		KeyId: 123
	};
};

module.exports = function() {
	return {
		getMasterKey:getMasterKey,
		generateDataKey:function() {
			return generateDataKey();
		},
		encrypt:encrypt
	};
};
