const _ = require('lodash');
const encryptedStringRegex = /"_cryptari\.[\w\d\.]*"/g;
const _removeQuotesFromMatch = function(m) {
	if (m && m.indexOf('"') === 0) {
		return m.slice(1, -1);
	}
	return m;
};

const findMatches = function(encryptedString) {
	if (!encryptedString) {
		return;
	}
	let matches = encryptedString.match(encryptedStringRegex);
	if (!matches || matches.length === 0) {
		return;
	}
	return _.map(matches, _removeQuotesFromMatch);
};

const toEncryptedObject = function(cryptariString) {
	if (!cryptariString) {
		return null;
	}
	let parts = cryptariString.split('.');
	if (!parts || parts.length < 3) {
		return cryptariString;
	}
	return {
		dataKey: parts[1],
		encryptedValue: parts[2],
		type: parts[3]
	};
};

module.exports = {
	findMatches: findMatches,
	toEncryptedObject: toEncryptedObject
};
