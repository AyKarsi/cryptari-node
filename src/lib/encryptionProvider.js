const awsConfig = require('./aws/awsConfig');
const awsEncrypt = require('./aws/awsEncrypt');
const awsDecrypt = require('./aws/awsDecrypt');
const localEncrypt = require('./local/localEncrypt');
const localDecrypt = require('./local/localDecrypt');

let encryptor;
let env = process.env.NODE_ENV;
if (awsConfig.awsConfigured && env !== 'test'){
		console.log('using aws decryption');
		encryptor = awsEncrypt;
		encryptor.decryptDataKey = awsDecrypt.decryptDataKey;
		encryptor.decrypt = awsDecrypt.decrypt;
}else {
	console.warn('using local encryption. not intended for production use');
	encryptor = localEncrypt;
	encryptor.decryptDataKey = localDecrypt.decryptDataKey;
	encryptor.decrypt = localDecrypt.decrypt;
}
module.exports = encryptor;

