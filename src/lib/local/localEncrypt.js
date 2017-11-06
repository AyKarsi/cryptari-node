const aesjs = require('aes-js');
const crypto = require('crypto');
const getMasterKey = require('./localMasterKey');
const typeHandler = require('./../typeHandler');

const encrypt = function(dataKey, secretValue) {
	try {
		let encVal = typeHandler.forEncryption(secretValue);
		let secretBytes = aesjs.utils.utf8.toBytes(encVal.valString);
		let aesCtr = new aesjs.ModeOfOperation.ctr(dataKey.plainBytes);
		let encryptedBytes = aesCtr.encrypt(secretBytes);
		let enc = aesjs.utils.hex.fromBytes(encryptedBytes);
		return {
			dataKeyEncryptedHex: dataKey.encryptedHex,
			encryptedHex: enc,
			type: encVal.type
		};
	} catch (ex) {
		console.log('local encryption error:', ex);
		return ex;
	}
};
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

module.exports = {
	generateDataKey: generateDataKey,
	encrypt: encrypt
};
