const aesjs = require('aes-js');

const encrypt = function(typeHandler,dataKey,secretValue) {
	try {
		let encVal = typeHandler.forEncryption(secretValue);
		let aesCtr = new aesjs.ModeOfOperation.ctr(dataKey.plainBytes);
		let bytes = aesjs.utils.utf8.toBytes(encVal.valString);
		let encryptedBytes =aesCtr.encrypt(bytes);
		let enc = aesjs.utils.hex.fromBytes(encryptedBytes);
		return {
			dataKeyEncryptedHex:dataKey.encryptedHex,
			encryptedHex:enc,
			type:encVal.type
		};
	}	catch(ex) {
		return ex;
	}
};

const generateDataKey = async function(kms,params) {
	try {
		let data = await kms.generateDataKey(params).promise();
		let encryptedHex = aesjs.utils.hex.fromBytes(data.CiphertextBlob);
		return {
			plainBytes:data.Plaintext,
			encryptedHex: encryptedHex,
			KeyId:data.KeyId
		};
	}catch(ex){
		console.log('error generating datakey',ex);
	}
};

module.exports = async function(kms,typeHandler,config) {
	encrypt.kms = kms;
	const params = {
			KeyId:config.aws.AWS_CMK_ID,
			KeySpec:'AES_256'
	};
	return  {
		generateDataKey:async function(){
			return await generateDataKey(kms,params);
		},
		encrypt:function(dataKey,value){
			return encrypt(typeHandler,dataKey,value);
		}
	};
};


module.exports['@async'] = false;
module.exports['@singleton'] = true;
module.exports['@require'] = ['kms','typeHandler','config'];
