const jp = require('jsonpath');
const _ = require('lodash');
const encryptionProvider = require('./encryptionProvider');
const cryptarify = require('./cryptarify');
const typeHandler = require('./typeHandler');

const encryptObject = async function(data, propertiesToEncrypt) {
	const dataKey = await encryptionProvider.generateDataKey();
	_.each(propertiesToEncrypt, (prop) => {
		let values = jp.query(data, prop);
		_.each(values, (val) => {
			let encObject = typeHandler.forEncryption(val);
			let encryptedObject = encryptionProvider.encrypt(dataKey, encObject);
			let encString = cryptarify(encryptedObject);
			jp.apply(data, prop, () => { return encString; });
		});
	});
};
module.exports = encryptObject;

