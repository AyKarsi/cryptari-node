const forEncryption = function(val) {
	let type = typeof val;
	if (val === null || (typeof val === 'undefined')){
		return;
	}

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
			}else {
				try {
					let json = JSON.stringify(val);
					valBytes = Buffer.from(json);
					type = 'object';
				}catch(ex) {
					console.error('cryptari: could not convert object to buffer',ex);
				}
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
	if (val === null || (typeof val === 'undefined')){
		return;
	}
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
		case 'object':
			try {
				res = JSON.parse(val);
			}
			catch(ex) {
				console.error('cryptari: could not parse decrypted value of type  object',ex);
			}
	}
	return res;
};


module.exports = {
		forEncryption:forEncryption,
		fromEncryption:fromEncryption
};
