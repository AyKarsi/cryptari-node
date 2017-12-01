const aesjs = require('aes-js');
const getMasterKey = require('./localMasterKey');

const decryptDataKey = async function(dataKeyEncryptedHex) {
	let masterKey = getMasterKey();
	if (typeof masterKey === 'string') {
		masterKey = aesjs.utils.hex.toBytes(masterKey);
	}
	let aesCtrMaster = new aesjs.ModeOfOperation.ctr(masterKey, new aesjs.Counter(5));
	let dataKeyEncryptedBytes = aesjs.utils.hex.toBytes(dataKeyEncryptedHex);
	let decryptedDataKeyBytes = aesCtrMaster.decrypt(dataKeyEncryptedBytes);
	return decryptedDataKeyBytes;
};
const decrypt = function(encryptedHex, decryptedDataKeyBytes) {
	let aesCtr = new aesjs.ModeOfOperation.ctr(decryptedDataKeyBytes);
	let encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
	let decryptedBytes = aesCtr.decrypt(encryptedBytes);
	return aesjs.utils.utf8.fromBytes(decryptedBytes);
};


module.exports = function() {
	return {
		decryptDataKey:function(dataKeyEncryptedHex) {
			return decryptDataKey(dataKeyEncryptedHex);
		},
		decrypt:decrypt
	};
};
