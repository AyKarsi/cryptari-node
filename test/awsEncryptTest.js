const chai = require('chai');
const assert = chai.assert;
const proxyquire = require('proxyquire');
describe('aws generateDataKey', function() {
	it('will throw an exception if an invalid configuration is given', async function() {
		var stubs = {
			'./awsConfig': {'@noCallThru': true}
		};
		const awsEncrypt = proxyquire('./../src/lib/aws/awsEncrypt', stubs)({cmkKeyId:'123'});
		let err;
		try {
			await awsEncrypt.generateDataKey();
		} catch (e) {
			err = e;
		}
		assert.isTrue(!!err);
	});
});
describe('aws encrypt', function() {
	it('will throw an exception if an invalid encryption key is given', async function() {
		const awsConfig = require('./../src/lib/aws/awsConfig');
		const awsEncrypt = require('./../src/lib/aws/awsEncrypt')(awsConfig);
		let err;
		try {
			await awsEncrypt.encrypt({ plainBytes: 'rubbish' });
		} catch (e) {
			err = e;
		}
		assert.isTrue(!!err);
	});
});
