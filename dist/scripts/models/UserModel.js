var $ = require("jquery");
var Backbone = require("backbone");
var validator = require('validator');
Backbone.$ = $;

module.exports = Backbone.Model.extend({
	defaults: {
		_id: null,
		username: null,
		password: null,
		fullName: null,
		email: null
	},
	validate: function(attr,options){
		if(!attr.username || !attr.password || !attr.fullName){
			return "*Fields must not be blank, except email.. we don't mind."
		} else if(!validator.isAlphanumeric(attr.username)){
			return "*Usernames must only contain numbers and/or letters."
		} else if(attr.password.length < 3){
			return "*Password must be 3 or more characters."
		} else {
			return false;
		}
	},
	urlRoot: "https://tiny-pizza-server.herokuapp.com/collections/awg-login/",
	idAttribute: "_id"
});