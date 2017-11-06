const AWS = require('aws-sdk');
const config = require('config');
AWS.config.update({region: config.aws.AWS_REGION});
module.exports = new AWS.KMS();
