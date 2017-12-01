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
 * @param {String} [options.local]
 * @param {String} [options.local.masterKey]
 * @returns {String}
 */
module.exports = function(config){
	let provider;
	//let env = process.env.NODE_ENV;
	if (!config){config={};}
	if (config.awsConfigured){
			console.log('using aws decryption');
			provider = AwsEncrypt(config);
			let awsDecrypt = AwsDecrypt(config);
			provider.name = 'aws';
			provider.decryptDataKey = awsDecrypt.decryptDataKey;
			provider.decrypt = awsDecrypt.decrypt;
	}else {
		console.warn('using local encryption. not intended for production use');
		provider = LocalEncrypt(config);
		provider.name = 'local';
		let localDecrypt = LocalDecrypt(config);
		provider.decryptDataKey = localDecrypt.decryptDataKey;
		provider.decrypt = localDecrypt.decrypt;
	}
	return provider;
};

