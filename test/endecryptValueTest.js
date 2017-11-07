const chai = require('chai');
const assert = chai.assert;
const encryptValue = require('./../src/lib/encryptValue');
const decryptValue = require('./../src/lib/decryptValue');

describe('encrypt / decrypt value', function() {
	it('can encrypt and decrypt a single string', async function() {
		let testVal = 'helloworld';
		let encrypted = await encryptValue(testVal);
		assert.equal(typeof encrypted,'string');
		let decrypted = await decryptValue(encrypted);
		assert.equal(typeof decrypted,'string');
		assert.equal(testVal,decrypted);
	});
	it('can encrypt and decrypt a single number', async function() {
		let testVal = 23.23;
		let encrypted = await encryptValue(testVal);
		assert.equal(typeof encrypted,'string');
		let decrypted = await decryptValue(encrypted);
		assert.equal(typeof decrypted,'number');
		assert.equal(testVal,decrypted);
	});
	it('can encrypt and decrypt a single date', async function() {
		let testVal = new Date();
		let encrypted = await encryptValue(testVal);
		assert.equal(typeof encrypted,'string');
		let decrypted = await decryptValue(encrypted);
		assert.equal(typeof decrypted,'object');
		assert.equal(testVal.getTime(),decrypted.getTime());
	});

});
