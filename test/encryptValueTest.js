const chai = require('chai');
const assert = chai.assert;
const provider = require('./../src/lib/encryptionProvider')();
const encryptValue = require('./../src/lib/encryptValue')(provider);

describe('encrypt value - error handling', function() {
	describe('default error handling',function() {
		it('will return undefined if an undefined value is given', async function() {
			let testVal = undefined;
			let encrypted = await encryptValue(testVal);
			assert.equal(encrypted,testVal);
		});
		it('will return null if an null value is given', async function() {
			let testVal = null;
			let encrypted = await encryptValue(testVal);
			assert.equal(encrypted,testVal);
		});
	});
	describe('onError:throw',function() {
		let opts =  {
			onError:'throw'
		};
		it('will throw an error if an exception occurs during encryption', async function() {
			provider.generateDataKey = function() {
				throw 'unhandled';
			};
			const encryptValue = require('./../src/lib/encryptValue')(provider);
			let testVal = undefined;
			let err;
			try {
				await encryptValue(testVal,opts);
			} catch (e) {
				err = e;
			}
			assert.isTrue(!!err);
		});
	});
});
