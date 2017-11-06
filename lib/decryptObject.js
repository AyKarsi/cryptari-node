const jp = require('jsonpath');
const _ = require('lodash');

module.exports = async function(encryptionProvider, decryptarify,typeHandler) {
	const decryptObject = async function(data, propertiesToDecrypt) {
		// const dataKey = await encryptionProvider.generateDataKey();

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

		let promises = _.map(cryptObjs, async(cp) => {
			return encryptionProvider.decryptDataKey(cp.dataKey);
		});
		let decDatakeys = await Promise.all(promises);
		_.each(cryptObjs,(cp,i)=>{
			cp.dataKeyDecryptedBytes = decDatakeys[i];
		});

		_.each(propertiesToDecrypt, (prop) => {
			let values = jp.query(data, prop);
			_.each(values, (val) => {
				// room for improvement here
				let cp2 = decryptarify.toEncryptedObject(val);
				let cpDec = _.find(cryptObjs,(cp)=>{
					return cp.dataKey === cp2.dataKey;
				});
				let decrypted = encryptionProvider.decrypt(cp2.encryptedValue,cpDec.dataKeyDecryptedBytes);
				var finalVal = typeHandler.fromEncryption(decrypted,cp2.type);
				jp.apply(data, prop, () => { return finalVal; });
			});

		});
	};
	return decryptObject;
};

module.exports['@async'] = false;
module.exports['@singleton'] = true;
module.exports['@require'] = ['encryptionProvider', 'decryptarify','typeHandler'];
