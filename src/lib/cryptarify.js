module.exports = function(encObject) {
	if (!encObject || !encObject.dataKeyEncryptedHex || !encObject.encryptedHex || !encObject.type) {
		return;
	}
	return '_cryptari.' + encObject.dataKeyEncryptedHex + '.' + encObject.encryptedHex + '.' + encObject.type;
};
