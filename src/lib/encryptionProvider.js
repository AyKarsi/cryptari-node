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
 * @param {String} [options.aws.accessKeyId] The IAM user Access ID (who has access to the below key). If present CRYPTARI_AWS_ACCESS_KEY_ID Env Variable will be given precendce.
 * @param {String} [options.aws.secretAccessKey] The matching secret for the IAM user. If present CRYPTARI_AWS_SECRET_ACCESS_KEY Env Variable will be given precendce.
 * @param {String} [options.aws.cmkKeyId] The AWS KMS Key Id. If present CRYPTARI_AWS_CMK_ID Env Variable will be given precendce.
 * @param {String} [options.aws.region] The region where the AWS KMS key is stored. If present CRYPTARI_AWS_REGION Env Variable will be given precendce.
 * @param {String} [options.local]
 * @param {String} [options.local.masterKey] a 16 Byte HexString  used for encrypting locally. If present CRYPTARI_LOCAL_MASTERKEY env variable will be given precedence.
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

