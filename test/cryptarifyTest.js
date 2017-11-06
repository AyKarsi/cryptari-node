const chai = require('chai');
const assert = chai.assert;
const cryptarify = require('./../lib/cryptarify');

describe('cryptarify', function() {
	it('can create a crypari encrypted string', async function() {
		let encObject =  {
			dataKeyEncryptedHex:'123',
			encryptedHex:'456',
			type:'string'
		};
		let res = cryptarify(encObject);
		assert.isTrue(!!res);
		assert.equal(typeof res, 'string');
		assert.equal(res, '_cryptari.123.456.string');
	});
	it('will return null if no encryptedValue is given', async function() {
		let encObject =  {
			encryptedHex:'456',
			type:'string'
		};
		let res = cryptarify(encObject);
		assert.isTrue(!res);
	});
	it('will return null if no dataKey is given', async function() {
		let encObject =  {
			dataKeyEncryptedHex:'456',
			type:'string'
		};
		let res = cryptarify(encObject);
		assert.isTrue(!res);
	});
});
