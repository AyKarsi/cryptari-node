const jp = require('jsonpath');
const _ = require('lodash');
const encryptionProvider = require('./encryptionProvider');
const decryptarify = require('./decryptarify');
const typeHandler = require('./typeHandler');

const decryptObject = async function(data, propertiesToDecrypt, opts) {
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
			return encryptionProvider.decryptDataKey(cp.dataKey);
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
				let decrypted = encryptionProvider.decrypt(cp2.encryptedValue, cpDec.dataKeyDecryptedBytes);
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
module.exports = decryptObject;
