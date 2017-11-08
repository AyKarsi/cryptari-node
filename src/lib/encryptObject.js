const jp = require('jsonpath');
const _ = require('lodash');
const cryptarify = require('./cryptarify');
const typeHandler = require('./typeHandler');
/**
 * @alias module:api
 * @description Encrypts selected properties on a given object
 * @summary
 * <p>
 * 	The objects properties will be encrypted directly. Regarding type conversion and persitance the same rules as for encryptValue apply.
 * </p>
 * <p>
 * 	Internally jsonpath(https://github.com/json-path/JsonPath) is used located the properties
 * </p>
 * <p>
 * If an exception occurs:
 * <ul>
 * 	<li>options.onError === keep  (default) :  the encrypted string remains in place and we will attempt to encrypt further properties </li>
 * 	<li>options.onError === throw : an exception is thrown</li>
 * </ul>
 * </p>
 * @param {Object} Dto The object containing properties which need to be encrypted
 * @param {Array} propertiesToEncrypt An array containg the paths to the properties which need to be encrypted
 * @param {String} [options.onError] keep or throw
 * @returns {void}
* @example
let obj = {
		foo: '123',
		bar: '456'
};
await encryptObject(obj, ['foo']);
assert.equal(obj.bar, '456');
assert.equal(obj.foo.indexOf('_cryptari'),0);
 */
const encryptObject = async function(provider,data, propertiesToEncrypt,opts) {
	if (!opts) { opts = {};}
	const dataKey = await provider.generateDataKey();
	_.each(propertiesToEncrypt, (prop) => {
		let values = jp.query(data, prop);
		_.each(values, (val) => {
			try {
				let encObject = typeHandler.forEncryption(val);
				let encryptedObject = provider.encrypt(dataKey, encObject);
				let encString = cryptarify(encryptedObject);
				jp.apply(data, prop, () => { return encString; });
			}catch(ex) {
				if (opts.onError == 'throw') {
					throw ex;
				}
				jp.apply(data, prop, () => { return val; });
			}
		});
	});
};
module.exports = encryptObject;

module.exports = function(provider){
	return function(data, propertiesToEncrypt,opts){
		return encryptObject(provider,data, propertiesToEncrypt,opts);
	};
};
