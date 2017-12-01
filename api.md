<a name="Cryptari"></a>

## Cryptari : <code>object</code>
creates a new cryptari instance

 ### Instantiation

 ```
 const Cryptari = require('cryptari);
 let cryptari = new Cryptari({local:masterKey:'16ByteHexString'});

 ```

**Kind**: global namespace  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> |  |
| [options.aws] | <code>String</code> |  |
| [options.aws.accessKeyId] | <code>String</code> | The IAM user Access ID (who has access to the below key). If present CRYPTARI_AWS_ACCESS_KEY_ID Env Variable will be given precendence. |
| [options.aws.secretAccessKey] | <code>String</code> | The matching secret for the IAM user. If present CRYPTARI_AWS_SECRET_ACCESS_KEY Env Variable will be given precendence. |
| [options.aws.cmkKeyId] | <code>String</code> | The AWS KMS Key Id. If present CRYPTARI_AWS_CMK_ID Env Variable will be given precendence. |
| [options.aws.region] | <code>String</code> | The region where the AWS KMS key is stored. If present CRYPTARI_AWS_REGION Env Variable will be given precendence. |
| [options.local] | <code>String</code> |  |
| [options.local.masterKey] | <code>String</code> | a 16 Byte HexString  used for encrypting locally. If present CRYPTARI_LOCAL_MASTERKEY env variable will be given precedence. |


* [Cryptari](#Cryptari) : <code>object</code>
    * [.decryptObject](#Cryptari+decryptObject) ⇒ <code>void</code>
    * [.decryptValue](#Cryptari+decryptValue) ⇒ <code>String</code> \| <code>Date</code> \| <code>Array</code> \| <code>Number</code> \| <code>Object</code>
    * [.encryptObject](#Cryptari+encryptObject) ⇒ <code>void</code>
    * [.encryptValue](#Cryptari+encryptValue) ⇒ <code>String</code>

<a name="Cryptari+decryptObject"></a>

### cryptari.decryptObject ⇒ <code>void</code>
Decrypts selected properties on a given object

**Kind**: instance property of [<code>Cryptari</code>](#Cryptari)  
**Summary**: <p>
	The properties will be decrypted directly on the object.
</p>
<p>
	Internally jsonpath(https://github.com/json-path/JsonPath) is used to locate and decrypt the properties
</p>
<p>
If an exception occurs:
<ul>
	<li>options.onError === keep  (default) :  the encrypted string remains in place and encryption and encryption is aborted /li>
	<li>options.onError === throw : an exception is thrown</li>
</ul>
</p>  

| Param | Type | Description |
| --- | --- | --- |
| Dto | <code>Object</code> | The object containing properties which need to be decrypted |
| propertiesToDecrypt | <code>Array</code> | An array containg the paths to the properties which need to be decrypted |
| [options] | <code>Object</code> |  |
| [options.onError] | <code>String</code> | keep or throw |

**Example**  
```js
let obj = {
	foo: '_cryptari.123123.34521342134....',
	bar: '456'
};
await encryptObject(obj, ['foo']);
assert.equal(obj.bar, '456');
assert.equal(obj.foo '123');
```
<a name="Cryptari+decryptValue"></a>

### cryptari.decryptValue ⇒ <code>String</code> \| <code>Date</code> \| <code>Array</code> \| <code>Number</code> \| <code>Object</code>
Decrypts an encrypted string and returns the original typed value.

**Kind**: instance property of [<code>Cryptari</code>](#Cryptari)  
**Summary**: <p>
	Returns the unecrypted value of the original type
</p>
<p>
If an exception occurs:
<ul>
	<li>options.onError === keep  (default) :  the encrypted string is returned</li>
	<li>options.onError === throw : an exception is thrown</li>
</ul>
</p>  

| Param | Type | Description |
| --- | --- | --- |
| encryptedString | <code>String</code> | the encrypted string |
| [options] | <code>Object</code> |  |
| [options.onError] | <code>String</code> | keep or throw |

**Example**  
```js
// encrypt a date
 let today = new Date();
 let encrypted = await encryptValue(today);
 assert.equal(typeof encrypted,'string');
 assert.equal(encrypted.indexOf('_cryptari'),0);

 // decryption starts here
 let decrypted = await decryptValue(encrypted);
 assert.equal(decrypted.getTime(), today.getTime());
```
<a name="Cryptari+encryptObject"></a>

### cryptari.encryptObject ⇒ <code>void</code>
Encrypts selected properties on a given object

**Kind**: instance property of [<code>Cryptari</code>](#Cryptari)  
**Summary**: <p>
	The objects properties will be encrypted directly. Regarding type conversion and persitance the same rules as for encryptValue apply.
</p>
<p>
	Internally jsonpath(https://github.com/json-path/JsonPath) is used located the properties
</p>
<p>
If an exception occurs:
<ul>
	<li>options.onError === keep  (default) :  the encrypted string remains in place and we will attempt to encrypt further properties </li>
	<li>options.onError === throw : an exception is thrown</li>
</ul>
</p>  

| Param | Type | Description |
| --- | --- | --- |
| Dto | <code>Object</code> | The object containing properties which need to be encrypted |
| propertiesToEncrypt | <code>Array</code> | An array containg the paths to the properties which need to be encrypted |
| [options.onError] | <code>String</code> | keep or throw |

**Example**  
```js
let obj = {
		foo: '123',
		bar: '456'
};
await encryptObject(obj, ['foo']);
assert.equal(obj.bar, '456');
assert.equal(obj.foo.indexOf('_cryptari'),0);
```
<a name="Cryptari+encryptValue"></a>

### cryptari.encryptValue ⇒ <code>String</code>
Encrypts Strings, Dates, Arrays or Numbers

**Kind**: instance property of [<code>Cryptari</code>](#Cryptari)  
**Summary**: <p>
	Returns an encrypted string of the given value
</p>
<p>
	The given value must a value which can be converted into string.
</p>
<p>
	Please be aware that to persist the value, a type change might be needed in your database.
</p>
<p>
If an exception occurs:
<ul>
	<li>options.onError === keep  (default) :  the unencrypted string is returned</li>
	<li>options.onError === throw : an exception is thrown</li>
</ul>
</p>  

| Param | Type | Description |
| --- | --- | --- |
| Value | <code>String</code> \| <code>Date</code> \| <code>Array</code> \| <code>Number</code> \| <code>Object</code> | The unencrypted value. This value must be "stringifyable". |
| [options] | <code>Object</code> |  |
| [options.onError] | <code>String</code> | keep or throw |

**Example**  
```js
let encrypted = await encryptValue(someValue);
 assert.equal(typeof encrypted,'string');
 assert.equal(encrypted.indexOf('_cryptari'),0);
```
