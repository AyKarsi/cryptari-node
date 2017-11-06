const awsEncrypt = require('./aws/awsEncrypt');
const awsDecrypt = require('./aws/awsDecrypt');
const localEncrypt = require('./local/localEncrypt');
const localDecrypt = require('./local/localDecrypt');
const config = require('config');
var encryptor;
console.log('config',config);
if (config.useLocal) {
	console.log('using local encryption. not intended for production use');
	encryptor = localEncrypt;
	encryptor.decryptDataKey = localDecrypt.decryptDataKey;
	encryptor.decrypt = localDecrypt.decrypt;
} else {
	if (config.aws.AWS_SECRET_ACCESS_KEY) {
		console.log('using aws decryption');
		encryptor = awsEncrypt;
		encryptor.decryptDataKey = awsDecrypt.decryptDataKey;
		encryptor.decrypt = awsDecrypt.decrypt;
	}
}
if (!encryptor) {
	throw 'No encryption provider was defined';
}
module.exports = encryptor;

