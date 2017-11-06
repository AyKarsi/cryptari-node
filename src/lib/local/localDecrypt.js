const aesjs = require('aes-js');
const getMasterKey = require('./localMasterKey');

const decryptDataKey = async function(dataKeyEncryptedHex) {
	try {
		let masterKey = getMasterKey();
		let aesCtrMaster = new aesjs.ModeOfOperation.ctr(masterKey, new aesjs.Counter(5));
		let dataKeyEncryptedBytes = aesjs.utils.hex.toBytes(dataKeyEncryptedHex);
		let decryptedDataKeyBytes = aesCtrMaster.decrypt(dataKeyEncryptedBytes);
		return decryptedDataKeyBytes;
	} catch (ex) {
		console.log('error decrypting ', ex);
		return ex;
	}
};
const decrypt = function(encryptedHex, decryptedDataKeyBytes) {
	try {
		let aesCtr = new aesjs.ModeOfOperation.ctr(decryptedDataKeyBytes);
		let encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
		let decryptedBytes = aesCtr.decrypt(encryptedBytes);
		return aesjs.utils.utf8.fromBytes(decryptedBytes);
	} catch (ex) {
		console.log('error decrypting ', ex);
		return ex;
	}
};

module.exports = {
	decryptDataKey: decryptDataKey,
	decrypt: decrypt
};
