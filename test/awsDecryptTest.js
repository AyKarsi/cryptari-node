const chai = require('chai');
const assert = chai.assert;
const proxyquire = require('proxyquire');
describe('aws decryptDataKey', function() {
	it('will throw an exception if an invalid configuration is given', async function() {
		var stubs = {
			'./awsConfig': {'@noCallThru': true}
		};
		const awsDecrypt = proxyquire('./../src/lib/aws/awsDecrypt', stubs);
		let err;
		try {
			await awsDecrypt.decryptDataKey();
		} catch (e) {
			err = e;
		}
		assert.isTrue(!!err);
	});
});
describe('aws decrypt', function() {
	it('will throw an exception if an invalid encryption key is given', async function() {
		const awsDecrypt = require('./../src/lib/aws/awsDecrypt');
		let err;
		try {
			await awsDecrypt.decrypt('123','rubbish');
		} catch (e) {
			err = e;
		}
		assert.isTrue(!!err);
	});
});
