var $ = require("jquery");
var Backbone = require("backbone");
var _ = require("backbone/node_modules/underscore");
Backbone.$ = $;

$(document).ready(function(){
	var $deleteAllPics = $("#delete-all-pics");
	var $deleteAllComments = $("#delete-all-comments");
	var $deleteAllUsers = $("#delete-all-users")

	var UserCollection = require("./collections/UserCollection.js");
	var ImageCollection = require("./collections/ImageCollection.js");

	var UserModel = require("./models/UserModel.js");
	var ImageModel = require("./models/ImageModel.js");

	var userCollection = new UserCollection();
	var imageCollection = new ImageCollection();
	
	var userNameBuilder = _.template($("#username-holder").html())
	var imageBuilder = _.template($("#image-holder").html())

	var globalUser;

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
	var $submitImage = $("#submit-image");

	$loginBtn.on("click", function(){

		myRoutes.navigate("profile/"+$("#username").val(),{trigger:true})
	});

	$signUpBtn.on("click", function(){
		var userModel = new UserModel({
			username: $("#new-username").val(),
			password: $("#new-password").val(),
			fullName: $("#new-name").val(),
			email: $("#email").val(),
		});
		userModel.save();
		globalUser = userModel;
		console.log(userCollection);
		userCollection.add(userModel);

		myRoutes.navigate("profile/"+$("#new-username").val(),{trigger:true})
	});

	$submitImage.on("click", function(){

		var imageModel = new ImageModel({
			imageUrl: $("#image-url").val(),
			caption: $("#caption").val(),
			imageOwner: globalUser.id
		});

		imageCollection.add(imageModel);
		imageModel.save();
	});

	userCollection.on("add", function(addedUser){
		var nameHtml = userNameBuilder({model: addedUser});
		$("#username-goes-here").html(nameHtml);
	});

	imageCollection.on("add", function(addedImage){
		var imageHtml = imageBuilder({model: addedImage});
		$("#place-image-here").append(imageHtml);

		$("[data-form-cid="+addedImage.cid+"]").on("submit", function(event){
			event.preventDefault();
			console.log("i work!"+addedImage.cid)
		})
	});



























	$deleteAllPics.on("click", function(){
		var myDeleteArray = [];
		$.get("https://tiny-pizza-server.herokuapp.com/collections/awg-images/", function(data){
			for(var i = 0; i < data.length; i++){
				myDeleteArray.push(data[i]._id);
			}
		for(var j = 0; j < myDeleteArray.length; j++){
			$.ajax({
				type: "DELETE",
				url: "https://tiny-pizza-server.herokuapp.com/collections/awg-images/"+myDeleteArray[j],
				success: function(){
					console.log("all gone");
				}
			})
		}
			
		});
	});

	$deleteAllComments.on("click", function(){
		var myDeleteArray = [];
		$.get("https://tiny-pizza-server.herokuapp.com/collections/awg-comments/", function(data){
			for(var i = 0; i < data.length; i++){
				myDeleteArray.push(data[i]._id);
			}
		for(var j = 0; j < myDeleteArray.length; j++){
			$.ajax({
				type: "DELETE",
				url: "https://tiny-pizza-server.herokuapp.com/collections/awg-comments/"+myDeleteArray[j],
				success: function(){
					console.log("all gone");
				}
			})
		}
			
		});
	});

	$deleteAllUsers.on("click", function(){
		var myDeleteArray = [];
		$.get("https://tiny-pizza-server.herokuapp.com/collections/awg-login/", function(data){
			for(var i = 0; i < data.length; i++){
				myDeleteArray.push(data[i]._id);
			}
		for(var j = 0; j < myDeleteArray.length; j++){
			$.ajax({
				type: "DELETE",
				url: "https://tiny-pizza-server.herokuapp.com/collections/awg-login/"+myDeleteArray[j],
				success: function(){
					console.log("all gone");
				}
			})
		}
			
		});
	});
});

























