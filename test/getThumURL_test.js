const { expect } = require('chai');
const { getThumURL } = require('../');

describe('getThumURL', function() {
	it('works', function() {
		expect(getThumURL({ url: 'https://bbc.com' })).to.equal('//image.thum.io/get/https://bbc.com');
	});
});
