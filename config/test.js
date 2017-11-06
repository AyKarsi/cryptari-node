module.exports = {
	'useLocal':true,
	'aws': {
		'AWS_ACCESS_KEY_ID': process.env.AWS_ACCESS_KEY_ID,
		'AWS_SECRET_ACCESS_KEY': process.env.AWS_SECRET_ACCESS_KEY,
		'AWS_CMK_ID': process.env.AWS_CMK_ID,
		'AWS_REGION': 'eu-central-1'
	}
};
