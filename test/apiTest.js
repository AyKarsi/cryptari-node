const chai = require('chai');
const assert = chai.assert;
const Api = require('../src/index');
const awsConfig = require('./../src/lib/aws/awsConfig');
describe('api creation', function() {
	it('can create the api',  function() {
		let api = Api({});
		assert.equal(api.providerName,'local');
		assert.equal(typeof api.encryptValue,'function');
		assert.equal(typeof api.decryptValue,'function');
		assert.equal(typeof api.encryptObject,'function');
		assert.equal(typeof api.decryptObject,'function');
	});
	it('can create an api with aws',  function() {
		let api = Api(awsConfig);
		assert.equal(api.providerName,'aws');
		assert.equal(typeof api.encryptValue,'function');
		assert.equal(typeof api.decryptValue,'function');
		assert.equal(typeof api.encryptObject,'function');
		assert.equal(typeof api.decryptObject,'function');
	});
});


describe('api integration tests', function() {
	describe('local',function() {
		it('can encrypt and decrypt a value', async function() {
			let api = Api({});
			assert.equal(api.providerName,'local');
			let testValue = 'hello';
			let enc = await api.encryptValue(testValue);
			let dec = await api.decryptValue(enc);
			assert.equal(testValue,dec);
		});
		it('can encrypt and decrypt a object', async function() {
			let api = Api({});
			assert.equal(api.providerName,'local');
			let testObject = {
				foo:'123',
				bar:'345'
			};
			await api.encryptObject(testObject,['foo']);
			await api.decryptObject(testObject,['foo']);
			assert.equal(testObject.foo,'123');
		});
	});
	describe('aws',function() {
		it('can encrypt and decrypt a value', async function() {
			let api = Api(awsConfig);
			assert.equal(api.providerName,'aws');
			let testValue = 'hello';
			let enc = await api.encryptValue(testValue);
			let dec = await api.decryptValue(enc);
			assert.equal(testValue,dec);
		});
		it('can encrypt and decrypt a object', async function() {
			let api = Api(awsConfig);
			assert.equal(api.providerName,'aws');
			let testObject = {
				foo:'123',
				bar:'345'
			};
			await api.encryptObject(testObject,['foo']);
			await api.decryptObject(testObject,['foo']);
			assert.equal(testObject.foo,'123');
		});
	});
});
