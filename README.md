[![Known Vulnerabilities](https://snyk.io/test/github/aykarsi/cryptari/badge.svg)](https://snyk.io/test/github/aykarsi/cryptari)

# cryptari for node.js


# Summary

This library provides methods to encrypt and decrypt values using envelope encryption for node.js.

- Using a Key Management Service (KMS) of your choice. (See Implementation Status)
- Bring your own key or use a key provided by cryptari.com 

[API Documentation can be found here](api.md)

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


## Installation 

TODO  npm install


## Setup 

### Key Configuration
If nothing is configured, cryptari-node will use a hardcoded and insecure(!) local master key. 
You can use this for local development.


*DO NOT ADD ANY OF THE BELOW IDS/SECRETS TO YOUR SOURCE CODE!* 

### Using AWS KMS
The following environment variables need to be set to use AWS KMS.

**CRYPTARI_AWS_ACCESS_KEY_ID** the IAM User Id with acccess to the below key
**CRYPTARI_AWS_SECRET_ACCESS_KEY** the matching secret of the IAM User
**CRYPTARI_AWS_CMK_ID** the Id of the aws master key
**CRYPTARI_AWS_REGION** the region where the above key is stored.

### Error handling 

By default cryptari-node will always return the value given to the encrypt/decrypt method if encryption/decryption fails 
Alternatively you can also configure to cryptari to throw errors in the case of a failure.
Set the following enviroment variables for this:

`CRYPTARI_ENCRYPTION_ONERROR=throw`
`CRYPTARI_DECRYPTION_ONERROR=throw`

You can also set these options on a per use case 


## API

[API Documentation can be found here](api.md)





