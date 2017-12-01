
require('babel-core/register');
require('babel-polyfill');
const encryptObject = require('./lib/encryptObject');
const decryptObject = require('./lib/decryptObject');
const encryptValue = require('./lib/encryptValue');
const decryptValue = require('./lib/decryptValue');
const enryptionProvider = require('./lib/encryptionProvider');
const awsConfig = require('./lib/aws/awsConfig');


/**
 * Cryptari API
 * @namespace Cryptari
 * @description creates a new cryptari instance

 ### Instantiation

 ```
 const Cryptari = require('cryptari);
 let cryptari = new Cryptari({local:masterKey:'16ByteHexString'});

 ```

 * @param {Object} [options]
 * @param {String} [options.aws]
 * @param {String} [options.aws.accessKeyId] The IAM user Access ID (who has access to the below key). If present CRYPTARI_AWS_ACCESS_KEY_ID Env Variable will be given precendence.
 * @param {String} [options.aws.secretAccessKey] The matching secret for the IAM user. If present CRYPTARI_AWS_SECRET_ACCESS_KEY Env Variable will be given precendence.
 * @param {String} [options.aws.cmkKeyId] The AWS KMS Key Id. If present CRYPTARI_AWS_CMK_ID Env Variable will be given precendence.
 * @param {String} [options.aws.region] The region where the AWS KMS key is stored. If present CRYPTARI_AWS_REGION Env Variable will be given precendence.
 * @param {String} [options.local]
 * @param {String} [options.local.masterKey] a 16 Byte HexString  used for encrypting locally. If present CRYPTARI_LOCAL_MASTERKEY env variable will be given precedence.
 */
module.exports = function(opts){
	if (!opts) {opts = awsConfig;}
	let provider =  new enryptionProvider(opts);
	return {
		providerName:provider.name,
		encryptValue:encryptValue(provider),
		decryptValue:decryptValue(provider),
		encryptObject:encryptObject(provider),
		decryptObject:decryptObject(provider)
	};
};

