const _ = require('lodash');
// ### cryptarify (value)
// Input
// EncryptedObject

// Output:
// String starting with _cryptari
// Null if invalid object is given

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
	return  _.map(matches, _removeQuotesFromMatch);
};

const toEncryptedObject = function(cryptariString) {
	if (!cryptariString) {
		return null;
	}
	let parts = cryptariString.split('.');
	return {
		dataKey:parts[1],
		encryptedValue:parts[2],
		type:parts[3]
	};
};

module.exports = function() {
	return {
		findMatches: findMatches,
		toEncryptedObject: toEncryptedObject
	};

};

module.exports['@async'] = false;
module.exports['@singleton'] = true;
module.exports['@require'] = [];
