var $ = require("jquery");
var Backbone = require("backbone");
var _ = require("backbone/node_modules/underscore");
Backbone.$ = $;

var ImagePost = require("../models/ImageModel.js");

module.exports = Backbone.Collection.extend({
	model: ImagePost,
	url: "https://tiny-pizza-server.herokuapp.com/collections/awg-images/"
});