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

TODO  npm install


## Setup 

### Key Configuration
If nothing is configured, cryptari-node will use a hardcoded and insecure(!) local master key. 
This is fine for local development.

**DO NOT ADD ANY OF THE IDS/SECRETS TO YOUR SOURCE CODE!**

### Using AWS KMS
The following environment variables need to be set to use AWS KMS.

- **CRYPTARI_AWS_ACCESS_KEY_ID** The IAM User Id with acccess to the below key
- **CRYPTARI_AWS_SECRET_ACCESS_KEY** The matching secret of the IAM User
- **CRYPTARI_AWS_CMK_ID** The Id of the AWS master key
- **CRYPTARI_AWS_REGION** The region where the above master key is stored

### Error handling 

By default cryptari-node will always return the value given to the encrypt/decrypt method if encryption/decryption fails 
Alternatively you can also configure to cryptari to throw errors in the case of a failure.
Set the following enviroment variables for this:

`CRYPTARI_ENCRYPTION_ONERROR=throw`
`CRYPTARI_DECRYPTION_ONERROR=throw`

You can also set these options on a per use case 


## API

[API Documentation can be found here](api.md)





