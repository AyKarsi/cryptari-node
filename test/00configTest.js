const chai = require('chai');
const assert = chai.assert;
const config = require('config');

describe('config', function() {
	it('will have properties in the aws section', async function() {
		assert.isTrue(!!config.aws, 'A aws property should be present ');
		assert.isTrue(!!config.aws.AWS_ACCESS_KEY_ID, 'A aws.AWS_ACCESS_KEY_ID property should be present ');
		assert.isTrue(!!config.aws.AWS_SECRET_ACCESS_KEY, 'A aws.AWS_SECRET_ACCESS_KEY property should be present ');
		assert.isTrue(!!config.aws.AWS_CMK_ID, 'A aws.AWS_CMK_ID property should be present ');
	});
});
