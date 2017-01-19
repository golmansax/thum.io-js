const { expect } = require('chai');
const { getThumURL } = require('../');

describe('getThumURL', function() {
	describe('url option', function() {
		it('adds to end of url', function() {
			expect(getThumURL({ url: 'https://bbc.com' })).to.equal('//image.thum.io/get/https://bbc.com');
		});
	});

	describe('protocol option', function() {
		it('adds to beginning of url', function() {
			expect(getThumURL({
				url: 'https://bbc.com',
				protocol: 'http',
			})).to.equal('http://image.thum.io/get/https://bbc.com');
		});
	});
});
