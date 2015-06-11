var $ = require("jquery");
var Backbone = require("backbone");
var _ = require("backbone/node_modules/underscore");
Backbone.$ = $;

var CommentPost = require("../models/CommentModel.js");

module.exports = Backbone.Collection.extend({
	model: CommentPost,
	url: "https://tiny-pizza-server.herokuapp.com/collections/awg-comments/"
});