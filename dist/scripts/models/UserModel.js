var $ = require("jquery");
var Backbone = require("backbone");
Backbone.$ = $;

module.exports = Backbone.Model.extend({
	defaults: {
		_id: null,
		username: null,
		password: null,
		fullName: null,
		email: null
	},
	urlRoot: "https://tiny-pizza-server.herokuapp.com/collections/awg-login/",
	idAttribute: "_id"
});