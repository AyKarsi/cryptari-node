const forEncryption = function(val) {
	let type = typeof val;
	let valBytes;
	switch (type) {
		case 'string':
			valBytes = Buffer(val);
			break;
		case 'date':
			valBytes = Buffer(val.getTime().toString());
			break;
		case 'number':
			valBytes = Buffer(val.toString());
			break;
		case 'object':
			if (Object.prototype.toString.call(val) === '[object Date]'){
				valBytes = Buffer(val.getTime().toString());
				type = 'date';
			}
			break;
	}
	if (!valBytes) {
		throw 'unsupport encryption property type ' +type;
	}
	return {
		type:type,
		valBytes:valBytes
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
