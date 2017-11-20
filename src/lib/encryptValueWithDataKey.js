const CryptoObject = require('./CryptoObject');
const aesjs = require('aes-js');

module.exports = function(dataKey, encObject) {
	let aesCtr = new aesjs.ModeOfOperation.ctr(dataKey.plainBytes);
	let encryptedBytes = aesCtr.encrypt(encObject.valBytes);
	let enc = aesjs.utils.hex.fromBytes(encryptedBytes);
	let co = new CryptoObject();
	co.encryptedHex = enc;
	co.dataKeyEncryptedHex = dataKey.encryptedHex;
	co.type = encObject.type;
	return co;
};
