const jp = require('jsonpath');
const _ = require('lodash');
const decryptarify = require('./decryptarify');
const typeHandler = require('./typeHandler');

 /**
 * @alias module:api
 * @description Decrypts selected properties on a given object
 * @summary
 * <p>
 * 	The properties will be decrypted directly on the object.
 * </p>
 * <p>
 * 	Internally jsonpath(https://github.com/json-path/JsonPath) is used to locate and decrypt the properties
 * </p>
 * <p>
 * If an exception occurs:
 * <ul>
 * 	<li>options.onError === keep  (default) :  the encrypted string remains in place and encryption and encryption is aborted /li>
 * 	<li>options.onError === throw : an exception is thrown</li>
 * </ul>
 * </p>
  * @param {Object} Dto The object containing properties which need to be decrypted
 * @param {Array} propertiesToDecrypt An array containg the paths to the properties which need to be decrypted
 * @param {Object} [options]
 * @param {String} [options.onError] keep or throw
 * @returns {void}
 * @example
let obj = {
		foo: '_cryptari.123123.34521342134....',
		bar: '456'
};
await encryptObject(obj, ['foo']);
assert.equal(obj.bar, '456');
assert.equal(obj.foo '123');
*/
const decryptObject = async function(_provider,data, propertiesToDecrypt, opts) {
	if (!opts) { opts = {}; }
	// collect cryptari strings
	let cryptStrings = _.reduce(propertiesToDecrypt, (it, prop) => {
		let values = jp.query(data, prop);
		if (values && values.length) {
			it = it.concat(values);
		}
		return it;
	}, []);
	if (!cryptStrings || cryptStrings.length === 0) {
		return;
	}
	let cryptObjs = _.map(cryptStrings, (cp) => {
		return decryptarify.toEncryptedObject(cp);
	});
	try {
		let promises = _.map(cryptObjs, async(cp) => {
			return _provider.decryptDataKey(cp.dataKey);
		});
		let decDatakeys = await Promise.all(promises);
		_.each(cryptObjs, (cp, i) => {
			cp.dataKeyDecryptedBytes = decDatakeys[i];
		});
	} catch (ex) {
		if (opts.onError == 'throw') {
			throw ex;
		}
		return;
	}

	_.each(propertiesToDecrypt, (prop) => {
		let values = jp.query(data, prop);
		_.each(values, (val) => {
			let cp2 = decryptarify.toEncryptedObject(val);
			// room for improvement here
			let cpDec = _.find(cryptObjs, (cp) => {
				return cp.dataKey === cp2.dataKey;
			});
			try {
				let decrypted = _provider.decrypt(cp2.encryptedValue, cpDec.dataKeyDecryptedBytes);
				var finalVal = typeHandler.fromEncryption(decrypted, cp2.type);
				jp.apply(data, prop, () => { return finalVal; });
			} catch (ex) {
				if (opts.onError == 'throw') {
					throw ex;
				}
				jp.apply(data, prop, () => { return cp2.encryptedValue; });
			}

		});

	});
};
module.exports = function(provider){
	return function(data, propertiesToDecrypt, opts){
		return decryptObject(provider,data, propertiesToDecrypt, opts);
	};
};
