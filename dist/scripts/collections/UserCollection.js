var $ = require("jquery");
var Backbone = require("backbone");
Backbone.$ = $;

var User = require("../models/UserModel.js");

module.exports = Backbone.Model.extend({
	model: User
});