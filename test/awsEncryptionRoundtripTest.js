const chai = require('chai');
const assert = chai.assert;
const awsEncrypt = require('../lib/aws/awsEncrypt');
const awsDecrypt = require ('../lib/aws/awsDecrypt');


describe('aws encrypt/decrypt roundtrip', function() {
	describe('can encrypt and decrypt a string',function() {
		it('can retrieve a key, if given a clientId and a resourceId', async function() {
			let dataKey = await awsEncrypt.generateDataKey();
			let testString = 'test123';
			let res = await awsEncrypt.encrypt(dataKey,testString);
			assert.isTrue(!!res);
			assert.equal(typeof res.dataKeyEncryptedHex, 'string');
			assert.equal(typeof res.encryptedHex, 'string');
			assert.equal(res.type, 'string');
			let decryptedKey = await awsDecrypt.decryptDataKey(res.dataKeyEncryptedHex,res.encryptedHex);
			let decrypted = await awsDecrypt.decrypt(res.encryptedHex,decryptedKey);
			assert.equal(decrypted,testString);
		});
	});
});
