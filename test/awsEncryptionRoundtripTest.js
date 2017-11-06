const chai = require('chai');
const assert = chai.assert;
const ioc = require('electrolyte');
ioc.use(ioc.dir(__dirname + './../lib'));
ioc.use(ioc.dir(__dirname + './../lib/aws'));
ioc.use(ioc.node_modules());


describe('aws encrypt/decrypt roundtrip', function() {
	var awsEncrypt,awsDecrypt;
	before(async function(){
		awsEncrypt = await ioc.create('awsEncrypt');
		awsDecrypt = await ioc.create('awsDecrypt');
	});
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
