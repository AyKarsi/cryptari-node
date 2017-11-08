const AWS = require('aws-sdk');
module.exports = function(config) {
	let aws;
	if (config.awsConfigured){
		aws = new AWS.KMS(config);
	}
	return aws;
};
