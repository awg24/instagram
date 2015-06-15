var $ = require("jquery");
var Backbone = require("backbone");
var _ = require("backbone/node_modules/underscore");
Backbone.$ = $;

module.exports = Backbone.Model.extend({
	defaults: {
		_id: null,
		text: null,
		imageId: null,
		commentOwner: null
	},
	validate: function(attr, options){
		if(attr.text === ""){
			return "dont be empty";
		} else {
			return false;
		}
	},
	urlRoot: "https://tiny-pizza-server.herokuapp.com/collections/awg-comments/",
	idAttribute: "_id"
});