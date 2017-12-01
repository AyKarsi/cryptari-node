const aesjs = require('aes-js');
module.exports = function(opts) {
	if (!opts || !opts.local || !opts.local.masterKey){
		return aesjs.utils.hex.fromBytes([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
	}
	return opts.local.masterKey;
};
