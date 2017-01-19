var md5 = require('md5');

module.exports.getThumURL = function(options) {
	options = options || {};

	var thumUrl = '//image.thum.io/get';

	var url = options.url;
	if (!url) {
		throw new Error('Url must be specified');
	}

	var protocol = options.protocol;
	if (protocol) {
		thumUrl = protocol + ':' + thumUrl;
	}

	var maxAge = options.maxAge;
	if (maxAge) {
		thumUrl += '/maxAge/' + maxAge;
	}

	var width = options.width;
	if (width) {
		thumUrl += '/width/' + width;
	}

	var auth = options.auth;
	if (auth) {
		if (typeof auth === 'string') {
			thumUrl += '/auth/' + auth;
		} else {
			switch (auth.type) {
				case 'raw':
					thumUrl += '/auth/' + auth.keyId + '-' + auth.secret;
					break;
				case 'md5':
					// Add 300 seconds to the current time for a 5 minute expiry
					var expires = new Date().getTime() + (1000 * 300);

					var hash = md5(auth.secret + expires + url);
					thumUrl += '/auth/' + auth.keyId + '-' + expires + '-' + hash;

					break;
				default:
					throw new Error('Auth type must be \'raw\' or \'md5\'');
			}
		}
	}

	return thumUrl + '/' + url;
};
