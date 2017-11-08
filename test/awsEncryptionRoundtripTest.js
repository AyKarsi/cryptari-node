const chai = require('chai');
const assert = chai.assert;
const awsConfig = require('../src/lib/aws/awsConfig');
const awsEncrypt = require('../src/lib/aws/awsEncrypt')(awsConfig);
const awsDecrypt = require ('../src/lib/aws/awsDecrypt')(awsConfig);
const typeHandler = require('../src/lib/typeHandler');

describe('aws encrypt/decrypt roundtrip', function() {
	describe('can encrypt and decrypt a string',function() {
		it('can retrieve a key, if given a clientId and a resourceId', async function() {
			if (!awsConfig.awsConfigured){
				console.warn('no aws keys configured. skipping aws tests');
				return;
			}
			let dataKey = await awsEncrypt.generateDataKey();
			let testString = 'test123';
			let encObject = typeHandler.forEncryption(testString);
			let res = await awsEncrypt.encrypt(dataKey,encObject);
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
