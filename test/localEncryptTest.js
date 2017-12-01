const chai = require('chai');
const assert = chai.assert;
const proxyquire = require('proxyquire');
const aesjs = require('aes-js');
describe('local generateDataKey', function() {
	// it.only('can use a provided hex string as master key', async function() {
	// 	var x =
	// 	console.log('x',x);
	// 	var stubs = {
	// 		'./localMasterKey': function() {
	// 			return ['1', 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]; // this is an invalid key
	// 		}
	// 	};
	// 	const localEncrypt = proxyquire('./../src/lib/local/localEncrypt', stubs);
	// 	let err;
	// 	try {
	// 		await localEncrypt.generateDataKey();
	// 	} catch (e) {
	// 		err = e;
	// 	}
	// 	assert.isTrue(!!err);
	// });
	it('will throw an exception if an invalid encryption key is given', async function() {
		var stubs = {
			'./localMasterKey': function() {
				return ['1', 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]; // this is an invalid key
			}
		};
		const localEncrypt = proxyquire('./../src/lib/local/localEncrypt', stubs);
		let err;
		try {
			await localEncrypt.generateDataKey();
		} catch (e) {
			err = e;
		}
		assert.isTrue(!!err);
	});
});
describe('local encrypt', function() {
	it('will throw an exception if an invalid encryption key is given', async function() {
		const localEncrypt = require('./../src/lib/local/localEncrypt');
		let err;
		try {
			await localEncrypt.encrypt({ plainBytes: 'rubbish' });
		} catch (e) {
			err = e;
		}
		assert.isTrue(!!err);
	});
});
