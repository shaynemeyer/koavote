var app = require('../app');
var request = require('supertest').agent(app.listen());

describe("The homepage", function () {
	it("displays nicely without errors", function (done) {
		request
			.get('/')
			.expect(200)
			.expect('Content-type', /html/)
			.end(done)
	});
});