const chai = require('chai');
const assert = chai.assert;
const typeHandler = require('./../src/lib/typeHandler');
describe('typeHandler', function() {
	describe('forEncryption',function() {
		it('can parse a string', async function() {
			let res = typeHandler.forEncryption('hello');
			assert(!!res);
			assert.equal(res.valString,'hello');
			assert.equal(res.type, 'string');
		});
		it('can parse a date', async function() {
			let date = new Date();
			let res = typeHandler.forEncryption(date);
			assert(!!res);
			assert.equal(res.valString,date.getTime().toString());
			assert.equal(res.type, 'date');
		});
		it('can parse a number', async function() {
			let num = 3.144;
			let res = typeHandler.forEncryption(num);
			assert(!!res);
			assert.equal(res.valString,num.toString());
			assert.equal(res.type, 'number');
		});
	});
	describe('fromEncryption',function() {
		it('can parse a string', async function() {
			let res = typeHandler.forEncryption('hello');
			assert(!!res);
			assert.equal(res.valString,'hello');
			assert.equal(res.type, 'string');

			let res2 = typeHandler.fromEncryption(res.valString,res.type);
			assert.equal(typeof res2, 'string');
			assert.equal(res2, 'hello');


		});
		it('can parse a date', async function() {
			let date = new Date();
			let res = typeHandler.forEncryption(date);
			assert(!!res);
			assert.equal(res.valString,date.getTime().toString());
			assert.equal(res.type, 'date');

			let res2 = typeHandler.fromEncryption(res.valString,res.type);
			assert.equal(typeof res2, 'object');
			assert.equal(res2.getTime(), date.getTime());

		});
		it('can parse a number', async function() {
			let num = 3.147;
			let res = typeHandler.forEncryption(num);
			assert(!!res);
			assert.equal(res.valString,num.toString());
			assert.equal(res.type, 'number');

			let res2 = typeHandler.fromEncryption(res.valString,res.type);
			assert.equal(typeof res2, 'number');
			assert.equal(res2, num);

		});
	});

});
