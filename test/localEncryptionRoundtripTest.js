const chai = require('chai');
const assert = chai.assert;
const localEncrypt = require('./../src/lib/local/localEncrypt');
const localDecrypt = require('./../src/lib/local/localDecrypt');
describe('local encrypt/decrypt roundtrip', function() {
	describe('can encrypt and decrypt a string',function() {
		it('can retrieve a key, if given a clientId and a resourceId', async function() {
			let dataKey = await localEncrypt.generateDataKey();
			assert.isTrue(!!dataKey);
			assert.equal(typeof dataKey.plainBytes, 'object');
			assert.equal(typeof dataKey.encryptedHex, 'string');

			let testString = 'test123';
			let res = await localEncrypt.encrypt(dataKey,testString);
			assert.isTrue(!!res);
			assert.equal(typeof res.dataKeyEncryptedHex, 'string');
			assert.equal(typeof res.encryptedHex, 'string');
			assert.equal(res.type, 'string');
			let decryptedDatakey = await localDecrypt.decryptDataKey(res.dataKeyEncryptedHex);
			let decrypted = await localDecrypt.decrypt(res.encryptedHex,decryptedDatakey);
			assert.equal(decrypted,testString);
		});
	});
});
