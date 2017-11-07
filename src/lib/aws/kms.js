const AWS = require('aws-sdk');
const config = require('./awsConfig');
let aws;
if (config.awsConfigured){
	aws = new AWS.KMS(config);
}
module.exports = aws;
