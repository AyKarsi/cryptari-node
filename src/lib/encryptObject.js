const jp = require('jsonpath');
const _ = require('lodash');
const encryptionProvider = require('./encryptionProvider');
const cryptarify = require('./cryptarify');

const encryptObject = async function(data, propertiesToEncrypt) {
	const dataKey = await encryptionProvider.generateDataKey();
	_.each(propertiesToEncrypt, (prop) => {
		let values = jp.query(data, prop);
		_.each(values, (val) => {
			let encryptedObject = encryptionProvider.encrypt(dataKey, val);
			let encString = cryptarify(encryptedObject);
			jp.apply(data, prop, () => { return encString; });
		});
	});
};
module.exports = encryptObject;

