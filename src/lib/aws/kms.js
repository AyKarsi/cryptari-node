const AWS = require('aws-sdk');
const config = require('config');
let region = 'eu-central-1';
if (config && config.aws && config.aws.AWS_REGION) {
	region = config.aws.AWS_REGION;
}
AWS.config.update({region: region});
module.exports = new AWS.KMS();
