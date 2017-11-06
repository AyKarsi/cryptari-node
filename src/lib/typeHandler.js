const forEncryption = function(val) {
	let type = typeof val;
	let valString;
	switch (type) {
		case 'string':
			valString = val;
			break;
		case 'date':
			valString = val.getTime().toString();
			break;
		case 'number':
			valString = val.toString();
			break;
		case 'object':
			if (Object.prototype.toString.call(val) === '[object Date]'){
				valString = val.getTime().toString();
				type = 'date';
			}
			break;
	}
	if (!valString) {
		throw 'unsupport encryption property type ' +type;
	}
	return {
		type:type,
		valString:valString
	};
};
const fromEncryption = function (val, type) {
	let res;
	switch (type) {
		case 'string':
			res =  val;
			break;
		case 'date':
			let num = parseInt(val);
			res = new Date(num);
			break;
		case 'number':
			res  = parseFloat(val);
			break;
	}
	return res;
};


module.exports = {
		forEncryption:forEncryption,
		fromEncryption:fromEncryption
};
