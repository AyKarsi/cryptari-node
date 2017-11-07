[![Known Vulnerabilities](https://snyk.io/test/github/aykarsi/cryptari/badge.svg)](https://snyk.io/test/github/aykarsi/cryptari)

# cryptari for node.js


# Summary

This library provides methods to encrypt and decrypt values using envelope encrpytion for node.js.

- Using a Key Management Service (KMS) of your choice. (See Implementation Status)
- Bring your own key or use a key provided by crypatri.com 
- 

TODO: 
- Add Link/Explain Envelope Encryption
- Explain KMS 


# Key Management Providers

## Implemented

- AWS
- Local Encryption (not intended for production use)

## Roadmap

- Google 
- Microsoft
- Telekom 
- Alibaba


## installation 

TODO  npm install

## Setup 

### Key Configuration
If nothing is configured cryptari-node will use a hardcoded and insecure(!) local master key. 
You can use this for local development.


*DO NOT ADD ANY OF THE BELOW IDS/SECRETS TO YOUR SOURCE CODE!* 

### Using AWS KMS
The following environment variables need to be set to use AWS KMS.

*CRYPTARI_AWS_ACCESS_KEY_ID* the IAM User Id with acccess to the below key
*CRYPTARI_AWS_SECRET_ACCESS_KEY* the matching secret of the IAM User
*CRYPTARI_AWS_CMK_ID* the Id of the aws master key
*CRYPTARI_AWS_REGION* the region where the above key is stored.


### AWS 

TODO define how to set the keys for each provided

e.g.
	'aws': {
		'AWS_ACCESS_KEY_ID': process.env.AWS_ACCESS_KEY_ID,
		'AWS_SECRET_ACCESS_KEY': process.env.AWS_SECRET_ACCESS_KEY,
		'AWS_CMK_ID': process.env.AWS_CMK_ID,
		'AWS_REGION': 'eu-central-1'
	}

set your aws credentials using the env variables AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY

or create a bash script named ./setAws.sh under scripts (this file will is excluded from git)

```
export AWS_ACCESS_KEY_ID="AKA123123123123"
export AWS_SECRET_ACCESS_KEY="asdfsdfsdfsdfsdfsdf"
```


## API

## async cryptari.encryptValue([string|number|date]) : encryptedString




## async cryptari.decryptString(encryptedString) : [string|number|date]

## async cryptari.encryptObject(obj,[pathsToEncrypt]) 

## async cryptari.decryptObject(obj,[pathsToEncrypt]) 


