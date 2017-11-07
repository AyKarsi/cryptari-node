const chai = require('chai');
const assert = chai.assert;
const decryptarify = require('./../src/lib/decryptarify');

describe('decryptarify', function() {
	it('can turn a find _crypatri strings in a stringified object and turn them into encryption objects', async function() {
		let obj = {
			foo:'_cryptari.a123.a456.string'
		};
		let someInput =  JSON.stringify(obj);
		//cryptariString = ' _cryptari.592bfba1ce0e6030b8ab8b1c.3d44b7e812f7730430247bc3cae69fd05b.string.535487403 ';
		let matches = decryptarify.findMatches(someInput);
		assert.isTrue(!!matches);
		assert.equal(matches.length,1);

		let cryptariString = matches[0];

		let encryptedObject = decryptarify.toEncryptedObject(cryptariString);
		assert.isTrue(!!encryptedObject);

		assert.equal(encryptedObject.dataKey,'a123');
		assert.equal(encryptedObject.encryptedValue,'a456');
		assert.equal(encryptedObject.type,'string');

	});

});
