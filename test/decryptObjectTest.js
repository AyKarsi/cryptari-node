const chai = require('chai');
const assert = chai.assert;
const jp = require('jsonpath');
const ioc = require('electrolyte');
ioc.use(ioc.dir(__dirname + './../lib'));
ioc.use(ioc.node_modules());


describe('decryptObject', function() {
	var encryptObject, decryptObject;
	var decryptarify;
	const userRecordExample = require('./sampleData/userRecordExample');
	before(async function() {
		encryptObject = await ioc.create('encryptObject');
		decryptObject = await ioc.create('decryptObject');
		decryptarify = await ioc.create('decryptarify');
	});
	it('can decrypt a single property on a obejct', async function() {
		let obj = {
			foo: '123',
			bar: '456'
		};
		await encryptObject(obj, ['foo']);
		assert.equal(obj.bar, '456');
		assert.isTrue(!!obj.foo, 'foo should have a value');
		assert.equal(obj.foo.indexOf('_cryptari'), 0);

		await decryptObject(obj, ['foo']);
		assert.equal(obj.bar, '456');
		assert.equal(obj.foo, '123');


	});
	// it.only('can decrypt a single date property on a obejct', async function() {
	// 	let date =  new Date();
	// 	let obj = {
	// 		foo:'123',
	// 		date: date
	// 	};
	// 	await encryptObject(obj,['date']);
	// 	assert.equal(obj.foo,'123');
	// 	assert.isTrue(!!obj.date,'date should have a value');
	// 	assert.equal(obj.date.indexOf('_cryptari'),0);

	// 	await decryptObject(obj,['date']);
	// 	assert.equal(obj.foo,'123');
	// 	assert.isTrue(!!obj.date,'date should have a value');
	// 	assert.equal(obj.date.getTime(),date.getTime());


	// });


	it('can decrypt properties on complex nested object ', async function() {
		let obj = userRecordExample;
		let grossPath = '$..properties[?(@.key=="employee.remuneration.salary.gross")].value';
		let endPath = '$..properties[?(@.key=="employee.remuneration.salary.end")].value';
		let propToEncryp = [];
		propToEncryp.push(grossPath);
		propToEncryp.push(endPath);
		await encryptObject(obj, propToEncryp);

		await decryptObject(obj, propToEncryp);

		let grossValues = jp.query(obj, grossPath);
		let endValues = jp.query(obj, endPath);
		assert.equal(grossValues[0],'4500');
		assert.equal(endValues[0],'123');
	});

	it('can decrypt properties on complex nested object containing multiple keys ', async function() {
		let obj = userRecordExample;
		let grossPath = '$..properties[?(@.key=="employee.remuneration.salary.gross")].value';
		let endPath = '$..properties[?(@.key=="employee.remuneration.salary.end")].value';
		let propToEncryp = [];
		propToEncryp.push(grossPath);
		propToEncryp.push(endPath);
		await encryptObject(obj, [grossPath]);
		await encryptObject(obj, [endPath]);

		let grossValues = jp.query(obj, grossPath);
		let endValues = jp.query(obj, endPath);

		let grossCp = decryptarify.toEncryptedObject(grossValues[0]);
		let endCp = decryptarify.toEncryptedObject(endValues[0]);

		assert.isFalse(grossCp.dataKey === endCp.dataKey,'should have different data keys');

		await decryptObject(obj, propToEncryp);
		grossValues = jp.query(obj, grossPath);
		endValues = jp.query(obj, endPath);

		assert.equal(grossValues[0],'4500');
		assert.equal(endValues[0],'123');
	});
});
