const AWS = require('aws-sdk');
module.exports = function(config) {
	let aws;
	debugger;
	if (config.awsConfigured){
		aws = new AWS.KMS(config);
	}
	return aws;
};
