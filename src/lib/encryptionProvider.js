const AwsEncrypt = require('./aws/awsEncrypt');
const AwsDecrypt = require('./aws/awsDecrypt');
const LocalEncrypt = require('./local/localEncrypt');
const LocalDecrypt = require('./local/localDecrypt');

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
		provider = LocalEncrypt(config);
		provider.name = 'local';
		let localDecrypt = LocalDecrypt(config);
		provider.decryptDataKey = localDecrypt.decryptDataKey;
		provider.decrypt = localDecrypt.decrypt;
	}
	return provider;
};

