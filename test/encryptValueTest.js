const chai = require('chai');
const assert = chai.assert;
const encryptValue = require('./../src/lib/encryptValue');
const proxyquire = require('proxyquire');

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
			var stubs = {
				'./encryptionProvider': {
					generateDataKey:function() {
						throw 'unhandled';
					}
				}
			};
			const encryptValue = proxyquire('./../src/lib/encryptValue', stubs);
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
