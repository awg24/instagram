var $ = require("jquery");
var Backbone = require("backbone");
var _ = require("backbone/node_modules/underscore");
Backbone.$ = $;

module.exports = Backbone.Model.extend({
	defaults: {
		_id: null,
		imageUrl: null,
		caption: null,
		imageOwner: null
	},
	urlRoot: "https://tiny-pizza-server.herokuapp.com/collections/awg-images/",
	idAttribute: "_id"
});