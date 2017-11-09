const chai = require('chai');
const assert = chai.assert;
const CryptoObject = require('./../src/lib/cryptoObject');

describe('cryptoObject', function() {
	describe('for Encryption', function() {
		it('can create a crypari encrypted string', function() {
			let cryptoObject = new CryptoObject();
			cryptoObject.dataKeyEncryptedHex = '123';
			cryptoObject.encryptedHex = '456';
			cryptoObject.type = 'string';
			assert.isTrue(cryptoObject.isValid());
			assert.isFalse(cryptoObject.canDecrypt()); // cannot decrypt because no checksum is set
			let res = cryptoObject.toString();
			assert.isTrue(!!res);
			assert.equal(typeof res, 'string');
			assert.equal(res.indexOf('_cryptari.123.456.string.'), 0);
		});
		it('will be invalid if no dataKey is given', function() {
			let cryptoObject = new CryptoObject();
			cryptoObject.encryptedHex = '456';
			cryptoObject.type = 'string';
			assert.isFalse(cryptoObject.isValid());
		});
		it('will be invalid if no encryptedValue is given', function() {
			let cryptoObject = new CryptoObject();
			cryptoObject.dataKeyEncryptedHex = '123';
			cryptoObject.type = 'string';
			assert.isFalse(cryptoObject.isValid());
		});
		it('will be invalid if no type is given', function() {
			let cryptoObject = new CryptoObject();
			cryptoObject.dataKeyEncryptedHex = '123';
			cryptoObject.encryptedHex = '456';
			assert.isFalse(cryptoObject.isValid());
		});
		it('cannot decrypt if no checksum is given', function() {
			let cryptoObject = new CryptoObject();
			cryptoObject.dataKeyEncryptedHex = '123';
			cryptoObject.encryptedHex = '456';
			assert.isFalse(cryptoObject.canDecrypt());
		});
	});
	describe('for Encryption (canDecrypt)', function() {
		it('can parse a valid cryptari string', function() {
			let cryptariString = '_cryptari.123.456.string.844093190';
			let cryptoObject = new CryptoObject(cryptariString);
			assert.equal(cryptoObject.dataKeyEncryptedHex, '123');
			assert.equal(cryptoObject.encryptedHex, '456');
			assert.equal(cryptoObject.type, 'string');
			assert.equal(cryptoObject.chkSum, '844093190');
			assert.isTrue(cryptoObject.canDecrypt());
		});
		it('will return false if the checksum does not match (datakey invalid)', function() {
			let cryptariString = '_cryptari.X123.456.string.844093190';
			let cryptoObject = new CryptoObject(cryptariString);
			assert.isFalse(cryptoObject.canDecrypt());
		});
		it('will return false if the checksum does not match (encryptedValue invalid)', function() {
			let cryptariString = '_cryptari.123.X456.string.844093190';
			let cryptoObject = new CryptoObject(cryptariString);
			assert.isFalse(cryptoObject.canDecrypt());
		});
	});
});
