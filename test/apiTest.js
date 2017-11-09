const chai = require('chai');
const assert = chai.assert;
const Api = require('../src/index');
describe('api creation', function() {
	it('can create the api',  function() {
		let api = Api({});
		assert.equal(api.providerName,'local');
		assert.equal(typeof api.encryptValue,'function');
		assert.equal(typeof api.decryptValue,'function');
		assert.equal(typeof api.encryptObject,'function');
		assert.equal(typeof api.decryptObject,'function');
	});
	it('can create an api with aws',  function() {
		const awsConfig = require('./../src/lib/aws/awsConfig');
		let api = Api(awsConfig);
		assert.equal(api.providerName,'aws');
		assert.equal(typeof api.encryptValue,'function');
		assert.equal(typeof api.decryptValue,'function');
		assert.equal(typeof api.encryptObject,'function');
		assert.equal(typeof api.decryptObject,'function');
	});
});
