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
				var thumUrl = getThumURL({
					url: 'https://bbc.com',
					auth: {
						type: 'md5',
						keyId: '5',
						secret: 'lol',
					},
				});

				var regexp = new RegExp('//image.thum.io/get/auth/(.*)/https://bbc.com');
				var matches = thumUrl.match(regexp);
				var auth = matches[1];

				var keyId = parseInt(auth.split('-')[0], 10);
				expect(keyId).to.equal(5);

				// Time should only be a little bit off in the past
				var time = parseInt(auth.split('-')[1], 10);
				expect(time - new Date()).to.be.at.most(300 * 1000);

				var hash = (auth.split('-')[2]);

				expect(hash).to.equal(md5('lol' + time + 'https://bbc.com'));
			});
		});
	});
});
