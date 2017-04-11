const md5 = require('md5');
const { expect } = require('chai');
const { getThumURL } = require('../');

describe('getThumURL', function() {
	describe('url:', function() {
		it('adds to end of url', function() {
			expect(getThumURL({ url: 'https://bbc.com' })).to.equal('//image.thum.io/get/https://bbc.com');
		});
	});

	describe('protocol:', function() {
		it('adds to beginning of url', function() {
			expect(getThumURL({
				url: 'https://bbc.com',
				protocol: 'http',
			})).to.equal('http://image.thum.io/get/https://bbc.com');
		});
	});

	describe('maxAge:', function() {
		it('adds to middle of url', function() {
			expect(getThumURL({
				url: 'https://bbc.com',
				maxAge: '12',
			})).to.equal('//image.thum.io/get/maxAge/12/https://bbc.com');
		});
	});

	describe('width:', function() {
		it('adds to middle of url', function() {
			expect(getThumURL({
				url: 'https://bbc.com',
				width: '600',
			})).to.equal('//image.thum.io/get/width/600/https://bbc.com');
		});
	});

	describe('crop:', function() {
		it('adds to middle of url', function() {
			expect(getThumURL({
				url: 'https://bbc.com',
				crop: '300',
			})).to.equal('//image.thum.io/get/crop/300/https://bbc.com');
		});
	});

	describe('refresh:', function() {
		it('adds to middle of url', function() {
			expect(getThumURL({
				url: 'https://bbc.com',
				refresh: true,
			})).to.equal('//image.thum.io/get/refresh/https://bbc.com');
		});
	});

	describe('ogImage:', function() {
		it('adds to middle of url', function() {
			expect(getThumURL({
				url: 'https://bbc.com',
				ogImage: true,
			})).to.equal('//image.thum.io/get/ogImage/https://bbc.com');
		});
	});

	describe('png:', function() {
		it('adds to middle of url', function() {
			expect(getThumURL({
				url: 'https://bbc.com',
				png: true,
			})).to.equal('//image.thum.io/get/png/https://bbc.com');
		});
	});

	describe('device:', function() {
		it('adds to middle of url', function() {
			expect(getThumURL({
				url: 'https://bbc.com',
				device: 'iphone5',
			})).to.equal('//image.thum.io/get/iphone5/https://bbc.com');
		});

		it('throws an error if invalid', function() {
			expect(function() {
				getThumURL({
					url: 'https://bbc.com',
					device: 'windowsPhone',
				});
			}).to.throw('Device is not valid');
		});
	});

	describe('auth:', function() {
		describe('when type is raw', function() {
			it('adds to middle of url', function() {
				expect(getThumURL({
					url: 'https://bbc.com',
					auth: {
						type: 'raw',
						keyId: '5',
						secret: 'lol',
					},
				})).to.equal('//image.thum.io/get/auth/5-lol/https://bbc.com');
			});
		});

		describe('when type is md5', function() {
			it('adds to middle of url', function() {
				const thumUrl = getThumURL({
					url: 'https://bbc.com',
					auth: {
						type: 'md5',
						keyId: '5',
						secret: 'lol',
					},
				});

				const regexp = new RegExp('//image.thum.io/get/auth/(.*)/https://bbc.com');
				const matches = thumUrl.match(regexp);
				const auth = matches[1];

				const keyId = parseInt(auth.split('-')[0], 10);
				expect(keyId).to.equal(5);

				// Time should only be a little bit off in the past
				const time = parseInt(auth.split('-')[1], 10);
				expect(time - new Date()).to.be.at.most(300 * 1000);

				const hash = (auth.split('-')[2]);

				expect(hash).to.equal(md5('lol' + time + 'https://bbc.com'));
			});
		});
	});
});
