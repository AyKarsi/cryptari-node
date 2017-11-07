const chai = require('chai');
const assert = chai.assert;
const encryptValue = require('./../src/lib/encryptValue');

describe('encrypt value - error handling', function() {
	it('will return undefined if an undefined value is given', async function() {
		let testVal = undefined;
		let encrypted = await encryptValue(testVal);
		assert.equal(encrypted,testVal);
	});
	it('will return null if an null value is given', async function() {
		let testVal = null;
		let encrypted = await encryptValue(testVal);
		assert.equal(encrypted,testVal);
	});
});
