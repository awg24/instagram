var $ = require("jquery");
var Backbone = require("backbone");
var _ = require("backbone/node_modules/underscore");
Backbone.$ = $;

$(document).ready(function(){

	var routerConfig = {
		routes:{
			"":"login",
			"login":"login",
			"profile":"profile"
		},
		login:function(){
			$("#login").show();
		},
		profile:function(){
			$(".page").hide();
			$("#profile").show();
		}
	}

});