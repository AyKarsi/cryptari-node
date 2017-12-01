[![Known Vulnerabilities](https://snyk.io/test/github/aykarsi/cryptari/badge.svg)](https://snyk.io/test/github/aykarsi/cryptari)

# Cryptari for node.js


This library provides methods to encrypt and decrypt values using envelope encryption for node.js.

- Simple API Methods for encrypting and decrypting all types of data
- Using a Key Management Service (KMS) of your choice. (See Implementation Status)
- Bring your own key or use a key provided by [Cryptari](https://cryptari.com)

[API Documentation can be found here](api.md)

## Envelope Encryption & KMS

To explain envelope encryption the following terms need to be defined and scoped: 
- **Master Key**: Also known as Customer Master Key. This is the encryption key used to encrypt and decrypt DataKeys
- **Data Key**: An encryption key used to encrypt your data.
- **KMS**: Short for Key Manamagement Service, is a (internet) service which provides service methods for creating keys and encrypting and decrypting data.

The flow for envelope encryption is the following: 
- Ask the KMS to generate a new DataKey. It will return two values. An unecrypted data key and an encrypted data key.
- Encrypt your data with the unencrypted DataKey
- Store your encrypted data alongside with the encrypted data key. 
- Forget the unecrypted data key

The flow for envelope decryption is the reverse:
- Take your encrypted data key and ask the KMS to decrypt it for you
- Use the unecrypted data key to decrypt you encrypted data

The advantages of this approach are: 
- Your master key is never exposed and is protected by the KMS
- You store only encrypted values 
- Only users/services with access to the master key can decrypt data

**Envelope encryption does not protect you from someone who has gained access to your servers**  
But it does protect you from somebody who gained access of your stored data.


# Key Management Providers

## Implemented

- AWS
- Local Encryption (not intended for production use)


## Roadmap

- Google 
- Microsoft
- Telekom 
- Alibaba


## Installation 

`npm install cryptari --save`



## Configuration 


If you plan to use only one cryptari instance, all you need to do is set default enviroments variables, as describe in the following sections

### No Options

If no options are given and no environment variables are found, cryptari-node will use a hardcoded and totally insecure local master key. 
This is fine for local development.

```
const Cryptari = require('cryptari');
const cryptari = new Cryptari({local:{masterKey:'A16ByteHexString'}});
```

### Local Encryption: Provide a Master Key yourself 


By either setting the `CRYPTARI_LOCAL_MASTERKEY` environment varaiable or passing the a 16 Byte Hex String key, a cryptari instance will use this key to encrypt and decrypt values.

```
const Cryptari = require('cryptari');
const cryptari = new Cryptari({local:{masterKey:'A16ByteHexString'}});
```

**DO NOT ADD ANY OF THE IDS/SECRETS TO YOUR SOURCE CODE!**

### Using AWS KMS

Cryptari will auto-decect the following environments variables for AWS KMS


- `CRYPTARI_AWS_ACCESS_KEY_ID` The IAM User Id with acccess to the below key
- `CRYPTARI_AWS_SECRET_ACCESS_KEY` The matching secret of the IAM User
- `CRYPTARI_AWS_CMK_ID` The Id of the AWS master key
- `CRYPTARI_AWS_REGION` The region where the above master key is stored

Alternatively you can pass an options object as follows: 
```
const Cryptari = require('cryptari');
const cryptari = new Cryptari({
	aws:{
		accessKeyId:'...',
		secretAccessKey:'...',
		cmkKeyId:'...',
		region:'...',
	}
});
```


## Usage


### Encrypt and decrypt a String value

```
cryptari.encryptValue('Encrypt Me').then((encrypted)=>{		
	console.log(encrypted);  
	/// --> _cryptari.7f94f53730b61fd97823d8a8c804d25fc8847505daa8e925b34891bf908d6dad.dc2ec5bcd41a410adbe0.string.4213342259
	cryptari.decryptValue(encrypted).then((decrypted){
		console.log(decrypted); 
		// --> 'Encrypt Me'
	});
});
```

### Encrypt and decrypt a property on a Object

```
const testObject =  {
	foo:'Original',
	bar:'Secret'
}
cryptari.encryptObject(testObject,['bar']).then(()=>{		
	console.log(JSON.stringify(testObject,2,2));  
	// property bar will be encrypted, property foo will be untouched
	// -->
	//	{
	//	  "foo": "Original",
	//	  "bar": "_cryptari.7c6400980252c620a45e110b7d11213ab7fb74143603cac7adf834b161521531.a166af24c9c8.string.3137411440"
	//	}	
	cryptari.decryptObject(testObject,['bar']).then(()=>{
		console.log(JSON.stringify(testObject,2,2));  
		// property bar will be decrypted, property foo will be untouched
		// -->
		// 	{
		//   "foo": "Original",
		//   "bar": "Secret"
		// }		
	});
});
```

### Using Generators 

``` 
const Promise = require('bluebird');
function testGenerator () {
	return Promise.coroutine(function*() {
		let encrypted = yield cryptari.encryptValue('test');
		console.log(encrypted);
	})();
}
```

### Using Async/Await

``` 
const Promise = require('bluebird');
function testGenerator () {
	return Promise.coroutine(function*() {
		let encrypted = yield cryptari.encryptValue('test');
		console.log(encrypted);
	})();
}
```



### Error handling 

By default cryptari-node will always return the value given to the encrypt/decrypt method if encryption/decryption fails 
Alternatively you can also configure to cryptari to throw errors in the case of a failure.
Set the following enviroment variables for this:

`CRYPTARI_ENCRYPTION_ONERROR=throw`
`CRYPTARI_DECRYPTION_ONERROR=throw`

You can also set these options on a per use case 


## API

[API Documentation can be found here](api.md)





