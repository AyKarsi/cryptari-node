const chai = require('chai');
const assert = chai.assert;
const proxyquire = require('proxyquire');
describe('local decryptDataKey', function() {
	it('will throw an exception if an invalid encryption key is given', async function() {
		var stubs = {
			'./localMasterKey': function() {
				return ['1', 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]; // this is an invalid key
			}
		};
		const localDecrypt = proxyquire('./../src/lib/local/localDecrypt', stubs);
		let err;
		try {
			await localDecrypt.decryptDataKey();
		} catch (e) {
			err = e;
		}
		assert.isTrue(!!err);
	});
});
describe('local decrypt', function() {
	it('will throw an exception if an invalid encryption key is given', async function() {
		const localDecrypt = require('./../src/lib/local/localDecrypt');
		let err;
		try {
			await localDecrypt.decrypt('123','rubbish');
		} catch (e) {
			err = e;
		}
		assert.isTrue(!!err);
	});
});
