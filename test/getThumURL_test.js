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
});
