<a name="module_api"></a>

## api
<p>
		Please note: All methods are async and return promises
 </p>
# Encrypted Values
 <p>
 All values will be encrypted as strings in the following format:

`_cryptari.[version].[encryptedDataKey].[encryptedValue].[type].[chksum]`

TODO Describe the properties once implemented

</p>


* [api](#module_api)
    * [decryptObject](#exp_module_api--decryptObject) ⇒ <code>void</code> ⏏
    * [decryptValue](#exp_module_api--decryptValue) ⇒ <code>String</code> \| <code>Date</code> \| <code>Array</code> \| <code>Number</code> \| <code>Object</code> ⏏
    * [encryptObject](#exp_module_api--encryptObject) ⇒ <code>void</code> ⏏
    * [encryptValue](#exp_module_api--encryptValue) ⇒ <code>String</code> ⏏
    * [module.exports([options])](#exp_module_api--module.exports) ⇒ <code>String</code> ⏏

<a name="exp_module_api--decryptObject"></a>

### decryptObject ⇒ <code>void</code> ⏏
Decrypts selected properties on a given object

**Kind**: global property of [<code>api</code>](#module_api)  
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
<a name="exp_module_api--decryptValue"></a>

### decryptValue ⇒ <code>String</code> \| <code>Date</code> \| <code>Array</code> \| <code>Number</code> \| <code>Object</code> ⏏
Decrypts an encrypted string and returns the original typed value.

**Kind**: global property of [<code>api</code>](#module_api)  
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
<a name="exp_module_api--encryptObject"></a>

### encryptObject ⇒ <code>void</code> ⏏
Encrypts selected properties on a given object

**Kind**: global property of [<code>api</code>](#module_api)  
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
<a name="exp_module_api--encryptValue"></a>

### encryptValue ⇒ <code>String</code> ⏏
Encrypts (nearly) any value

**Kind**: global property of [<code>api</code>](#module_api)  
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
<a name="exp_module_api--module.exports"></a>

### module.exports([options]) ⇒ <code>String</code> ⏏
creates a new cryptari instance

**Kind**: global method of [<code>api</code>](#module_api)  

| Param | Type |
| --- | --- |
| [options] | <code>Object</code> | 
| [options.aws] | <code>String</code> | 
| [options.aws.accessKeyId] | <code>String</code> | 
| [options.aws.secretAccessKey] | <code>String</code> | 
| [options.aws.region] | <code>String</code> | 

