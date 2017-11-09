const ChkSum = require('./chkSum');
// const encryptedStringRegex = /"_cryptari\.[\w\d\.]*"/g;

class CryptoObject {
	constructor(opt) {
		if(typeof opt === 'string'){
			this.parseCryptariString(opt);
			return;
		}
	}

	parseCryptariString(cryptariString){
		let parts = cryptariString.split('.');
		if (!parts || parts.length < 3) {
			return cryptariString;
		}
		this.dataKeyEncryptedHex = parts[1];
		this.encryptedHex = parts[2];
		this.type = parts[3];
		this.chkSum = parts[4];
	}

	isValid() {
		return !!(this.dataKeyEncryptedHex && this.encryptedHex && this.encryptedHex && this.type);
	}

	canDecrypt() {
		if (!this.isValid()){
			return false;
		}
		if (!this.chkSum){
			return false;
		}
		let chkSum = this.getChksum()+'';
		if (chkSum === this.chkSum){
			return true;
		}
		return false;
	}

	getChksum() {
		return ChkSum.create(this.dataKeyEncryptedHex + '.' + this.encryptedHex);
	}

	toString() {
		if (!this.isValid()){
			throw 'Cannot stringify cryptObject';
		}
		let chkSum = this.getChksum();
		return '_cryptari.' + this.dataKeyEncryptedHex + '.' + this.encryptedHex + '.' + this.type + '.' + chkSum;
	}

}

module.exports = CryptoObject;
