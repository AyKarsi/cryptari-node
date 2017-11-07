const chai = require('chai');
const assert = chai.assert;
const decryptValue = require('./../src/lib/decryptValue');

describe('decrypt value - error handling', function() {
	it('will return undefined if an undefined value is given', async function() {
		let testVal = undefined;
		let encrypted = await decryptValue(testVal);
		assert.equal(encrypted,testVal);
	});
	it('will return null if an null value is given', async function() {
		let testVal = null;
		let encrypted = await decryptValue(testVal);
		assert.equal(encrypted,testVal);
	});
	it('will return the original string if a non-encrypted string is given', async function() {
		let testVal = 'hello';
		let encrypted = await decryptValue(testVal);
		assert.equal(encrypted,testVal);
	});
	it('will return the original string if a invalid cryptari string is given', async function() {
		let testVal = '_cryptari.123a.13a.string';
		let encrypted = await decryptValue(testVal);
		assert.equal(encrypted,testVal);
	});
});
