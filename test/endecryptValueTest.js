const chai = require('chai');
const assert = chai.assert;
const ioc = require('electrolyte');
ioc.use(ioc.dir(__dirname + './../lib'));
ioc.use(ioc.node_modules());

describe('encrypt / decrypt value', function() {
	var encryptValue,decryptValue;
	before(async function() {
		encryptValue = await ioc.create('encryptValue');
		decryptValue = await ioc.create('decryptValue');
	});
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
