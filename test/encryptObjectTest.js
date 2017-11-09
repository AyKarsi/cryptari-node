const chai = require('chai');
const assert = chai.assert;
const jp = require('jsonpath');
const provider = require('./../src/lib/encryptionProvider')();
const encryptObject = require('./../src/lib/encryptObject')(provider);
const CryptoObject = require('./../src/lib/cryptoObject');
const userRecordExample = require('./sampleData/userRecordExample');
const proxyquire = require('proxyquire');

describe('encryptObject', function() {
	it('can encrypt a single property on a object', async function() {
		let obj = {
			foo:'123',
			bar:'456'
		};
		await encryptObject(obj,['foo']);
		assert.equal(obj.bar,'456');
		assert.isTrue(!!obj.foo,'foo should have a value');
		assert.equal(obj.foo.indexOf('_cryptari'),0);
	});
	it('can encrypt a single date property on a object', async function() {
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

		let grossEncObj = new CryptoObject(grossEnc);
		let endEncObj = new CryptoObject(endEnc);

		assert.isTrue(!!grossEncObj.dataKeyEncryptedHex);
		assert.isTrue(!!grossEncObj.encryptedHex);
		assert.isTrue(!!endEncObj.dataKeyEncryptedHex);
		assert.isTrue(!!endEncObj.encryptedHex);
	});
	describe('onError: keep (default) ',function() {
		it('will  return the original value if an error occurs during encryption', async function() {
			var stubs = {
				'./typeHandler': {
					forEncryption:function() {
						throw 'unhandled';
					}
				}
			};
			const encryptObject = proxyquire('./../src/lib/encryptObject', stubs);
			let obj = {
				foo:'123',
				date: new Date()
			};
			await encryptObject(obj,['foo']);
			assert.equal(obj.foo,'123');
		});
	});
	describe('onError:throw',function() {
		let opts =  {
			onError:'throw'
		};
		it('will throw an error if an exception occurs during encryption', async function() {
			var stubs = {
				'./typeHandler': {
					forEncryption:function() {
						throw 'unhandled';
					}
				}
			};
			const encryptObject = proxyquire('./../src/lib/encryptObject', stubs)(provider);
			let err;
			try {
				let obj = {
					foo:'123',
					date: new Date()
				};
				await encryptObject(obj,['date'],opts);

			} catch (e) {
				err = e;
			}
			assert.isTrue(!!err);
		});
	});
});

