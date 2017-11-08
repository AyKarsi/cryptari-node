const AwsEncrypt = require('./aws/awsEncrypt');
const AwsDecrypt = require('./aws/awsDecrypt');
const LocalEncrypt = require('./local/localEncrypt');
const LocalDecrypt = require('./local/localDecrypt');

/**
 * @alias module:api
 * @description creates a new cryptari instance
 *
 * @param {Object} [options]
 * @param {String} [options.aws]
 * @param {String} [options.aws.accessKeyId]
 * @param {String} [options.aws.secretAccessKey]
 * @param {String} [options.aws.region]
 * @returns {String}
 */
module.exports = function(config){
	let encryptor;
	let env = process.env.NODE_ENV;
	if (!config){config={};}
	if (config.awsConfigured && env !== 'test'){
			console.log('using aws decryption');
			encryptor = AwsEncrypt(config);
			let awsDecrypt = AwsDecrypt(config);
			encryptor.decryptDataKey = awsDecrypt.decryptDataKey;
			encryptor.decrypt = awsDecrypt.decrypt;
	}else {
		console.warn('using local encryption. not intended for production use');
		encryptor = LocalEncrypt(config);
		let localDecrypt = LocalDecrypt(config);
		encryptor.decryptDataKey = localDecrypt.decryptDataKey;
		encryptor.decrypt = localDecrypt.decrypt;
	}
	return encryptor;
};

