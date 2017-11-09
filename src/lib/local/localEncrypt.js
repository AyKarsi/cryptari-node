const aesjs = require('aes-js');
const crypto = require('crypto');
const getMasterKey = require('./localMasterKey');
const CryptoObject = require('./../CryptoObject');

const generateDataKey = async function() {
	let masterKey = getMasterKey();
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

const encrypt = function(dataKey, encObject) {
	let aesCtr = new aesjs.ModeOfOperation.ctr(dataKey.plainBytes);
	let encryptedBytes = aesCtr.encrypt(encObject.valBytes);
	let enc = aesjs.utils.hex.fromBytes(encryptedBytes);
	let co = new CryptoObject();
	co.encryptedHex = enc;
	co.dataKeyEncryptedHex = dataKey.encryptedHex;
	co.type = encObject.type;
	return co;
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
