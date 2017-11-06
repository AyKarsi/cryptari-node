const AWS = require('aws-sdk');
module.exports = function(config) {
	AWS.config.update({region: config.aws.AWS_REGION});
	return new AWS.KMS();
};

module.exports['@async'] = false;
module.exports['@singleton'] = true;
module.exports['@require'] = ['config'];
