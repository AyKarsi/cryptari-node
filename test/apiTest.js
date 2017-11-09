const chai = require('chai');
const assert = chai.assert;
const Api = require('../src/index');
describe('construtor', function() {
	it('will throw an exception if an invalid configuration is given',  function() {
		let api = Api({});
		assert.equal(typeof api.encryptValue,'function');
		assert.equal(typeof api.decryptValue,'function');
		assert.equal(typeof api.encryptObject,'function');
		assert.equal(typeof api.decryptObject,'function');
	});
});
