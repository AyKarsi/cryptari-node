const chai = require('chai');
const assert = chai.assert;
const jp = require('jsonpath');
const ioc = require('electrolyte');
ioc.use(ioc.dir(__dirname + './../lib'));
ioc.use(ioc.node_modules());


describe('encryptObject', function() {
	var encryptObject,decryptarify;
	const userRecordExample = require('./sampleData/userRecordExample');
	before(async function() {
		encryptObject = await ioc.create('encryptObject');
		decryptarify = await ioc.create('decryptarify');
	});
	it('can encrypt a single property on a obejct', async function() {
		let obj = {
			foo:'123',
			bar:'456'
		};
		await encryptObject(obj,['foo']);
		assert.equal(obj.bar,'456');
		assert.isTrue(!!obj.foo,'foo should have a value');
		assert.equal(obj.foo.indexOf('_cryptari'),0);
	});
	it('can encrypt a single date property on a obejct', async function() {
		let obj = {
			foo:'123',
			date: new Date()
		};
		await encryptObject(obj,['date']);
		assert.equal(obj.foo,'123');
		assert.isTrue(!!obj.date,'foo should have a value');
		assert.equal(obj.date.indexOf('_cryptari'),0);
	});
	it('can encrypt properties on complex nested object ', async function() {
		let obj = userRecordExample;
		let grossPath = '$..properties[?(@.key=="employee.remuneration.salary.gross")].value';
		let endPath = '$..properties[?(@.key=="employee.remuneration.salary.end")].value';
		let propToEncryp = [];
		propToEncryp.push(grossPath);
		propToEncryp.push(endPath);

		await encryptObject(obj,propToEncryp);

		let grossValues = jp.query(obj, grossPath);
		let endValues = jp.query(obj, endPath);

		assert.equal(grossValues.length,1);
		assert.equal(endValues.length,1);

		let grossEnc = grossValues[0];
		let endEnc = grossValues[0];

		assert.equal(grossEnc.indexOf('_cryptari'),0);
		assert.equal(endEnc.indexOf('_cryptari'),0);

		let grossEncObj = decryptarify.toEncryptedObject(grossEnc);
		let endEncObj = decryptarify.toEncryptedObject(endEnc);

		assert.isTrue(!!grossEncObj.dataKey);
		assert.isTrue(!!grossEncObj.encryptedValue);
		assert.isTrue(!!endEncObj.dataKey);
		assert.isTrue(!!endEncObj.encryptedValue);
	});
});
