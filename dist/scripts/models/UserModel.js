var $ = require("jquery");
var Backbone = require("backbone");
Backbone.$ = $;

module.exports = Backbone.Model.extend({
	defaults: {
		_id: null,
		username: null,
		password: null
	}
});