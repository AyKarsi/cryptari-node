module.exports = async function(awsEncrypt, awsDecrypt, localEncrypt, localDecrypt, config) {
	var encryptor;
	if (config.useLocal) {
		console.log('using local encryption. not intended for production use');
		encryptor = localEncrypt;
		encryptor.decryptDataKey = localDecrypt.decryptDataKey;
		encryptor.decrypt = localDecrypt.decrypt;
	} else {
		if (config.aws.AWS_SECRET_ACCESS_KEY) {
			console.log('using aws decryption');
			encryptor = awsEncrypt;
			encryptor.decryptDataKey = awsDecrypt.decryptDataKey;
			encryptor.decrypt = awsDecrypt.decrypt;
		}
	}
	if (!encryptor) {
		throw 'No encryption provider was defined';
	}
	return encryptor;
};

/*
generateDataKey
- generates a new data Key
	return {
			plainBytes:x.Plaintext,
			encryptedHex: encryptedHex,
			KeyId:x.KeyId
		};

// encrypt
- encrypts the given string with a given data key and returns a encrption object
		return {
			dataKeyEncryptedHex:dataKey.encryptedHex,
			encryptedHex:enc,
			type:encVal.type
		};

// decryptDataKey
- decrypts the given datakey (hex string)
		returns decryptedDataKeyBytes

// decrypt
- decrypts the given encryptedHex using  decryptedDataKeyBytes
		returns decrypted string


*/

module.exports['@async'] = false;
module.exports['@singleton'] = true;
module.exports['@require'] = ['awsEncrypt', 'awsDecrypt', 'localEncrypt', 'localDecrypt', 'config'];
