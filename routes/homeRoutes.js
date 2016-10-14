var render = require('../lib/render');

module.exports.showHome = function *showHome(id) {
	this.body = yield render("home");
};