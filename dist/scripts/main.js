var $ = require("jquery");
var Backbone = require("backbone");
var _ = require("backbone/node_modules/underscore");
Backbone.$ = $;

$(document).ready(function(){

	var userModel = require("./models/UserModel.js");
	

	var routerConfig = {
		routes:{
			"":"login",
			"login":"login",
			"profile/:user":"profile"
		},
		login:function(){
			$("#login").show();
		},
		profile:function(user){
			$(".page").hide();
			$("#profile").show();
			console.log(user);
		}
	}

	var app = Backbone.Router.extend(routerConfig);
	var myRoutes = new app();
	Backbone.history.start();

	var $loginBtn = $("#login-btn");
	var $signUpBtn = $("#sign-up-btn");

	$loginBtn.on("click", function(){

		myRoutes.navigate("profile/"+$("#username").val(),{trigger:true})
	});

	$signUpBtn.on("click", function(){
		var user = new userModel({
			username: $("#new-username").val(),
			password: $("#new-password").val()
		});
		user.save();
		myRoutes.navigate("profile/"+$("#new-username").val(),{trigger:true})
	});

});