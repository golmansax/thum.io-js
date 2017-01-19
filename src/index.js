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

	if (options.auth) {
		if (typeof auth === 'string') {
			thumUrl += '/auth/' + options.auth;
		} else {
			switch (auth.type) {
				case 'raw':
					thumUrl += '/auth/' + options.key;
					break;
				case 'md5':
					// Add 300 seconds to the current time for a 5 minute expiry
					var expires = new Date().getTime() + (1000 * 300);

					var hash = md5(options.key + expires + url);
					var auth = '147-' + expires + '-' + hash;

					thumUrl += '/auth/' + auth;

					break;
				default:
					throw new Error('Auth type must be \'raw\' or \'md5\'');
			}
		}
	}

	return thumUrl + '/' + url;
};
