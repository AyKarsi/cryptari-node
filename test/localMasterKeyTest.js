const chai = require('chai');
const assert = chai.assert;
const LocaMasterKey = require('./../src/lib/local/localMasterKey');

describe('localMasterKey', function() {
	it('will return the "default" masterKey if no options are given', async function() {
		let key = LocaMasterKey();
		assert.equal(key,'0102030405060708090a0b0c0d0e0f10');
	});
	it('will return given masterKey if options are given', async function() {
		let key = LocaMasterKey({local:{masterKey:'1102030405060708090a0b0c0d0e0f10'}});
		assert.equal(key,'1102030405060708090a0b0c0d0e0f10');
	});
});
