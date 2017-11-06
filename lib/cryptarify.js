// ### cryptarify (value)
// Input
// EncryptedObject

// Output:
// String starting with _cryptari
// Null if invalid object is given

module.exports =  function() {
	return function(encObject) {
		if (!encObject || !encObject.dataKeyEncryptedHex || !encObject.encryptedHex || !encObject.type) {
			return;
		}
		return '_cryptari.' + encObject.dataKeyEncryptedHex + '.' +encObject.encryptedHex +'.' + encObject.type;
	};
};

module.exports['@async'] = false;
module.exports['@singleton'] = true;
module.exports['@require'] = [];
