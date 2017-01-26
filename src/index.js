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

	var crop = options.crop;
	if (crop) {
		thumUrl += '/crop/' + crop;
	}

	var png = options.png;
	if (png) {
		thumUrl += '/png';
	}

	var refresh = options.refresh;
	if (refresh) {
		thumUrl += '/refresh';
	}

	var device = options.device;
	if (device) {
		switch (device) {
			case 'ipad':
			case 'iphone5':
			case 'iphone6':
			case 'iphone6plus':
			case 'galaxys5':
				thumUrl += '/' + device;
				break;

			default: throw new Error('Device is not valid');
		}
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
				case 'referer':
					// Doesn't need to add to URL
					break;
				default:
					throw new Error('Auth type must be \'raw\' or \'md5\' or \'referer\'');
			}
		}
	}

	return thumUrl + '/' + url;
};
