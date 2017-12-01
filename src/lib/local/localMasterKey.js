const aesjs = require('aes-js');
const CRYPTARI_LOCAL_MASTERKEY = process.env.CRYPTARI_LOCAL_MASTERKEY;
module.exports = function(opts) {
	if (CRYPTARI_LOCAL_MASTERKEY) {
		return CRYPTARI_LOCAL_MASTERKEY;
	}
	if (!opts || !opts.local || !opts.local.masterKey){
		console.warn('using local encryption. not intended for production use');
		return aesjs.utils.hex.fromBytes([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
	}
	return opts.local.masterKey;
};
