var $ = require("jquery");
var Backbone = require("backbone");
Backbone.$ = $;

var User = require("../models/UserModel.js");

module.exports = Backbone.Collection.extend({
	model: User,
	url: "https://tiny-pizza-server.herokuapp.com/collections/awg-login/"
});