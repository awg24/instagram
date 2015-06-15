var $ = require("jquery");
var Backbone = require("backbone");
var _ = require("backbone/node_modules/underscore");
Backbone.$ = $;

$(document).ready(function(){
	var runOnce = false;
	var runForeverMore = false;

	var $deleteAllPics = $("#delete-all-pics");
	var $deleteAllComments = $("#delete-all-comments");
	var $deleteAllUsers = $("#delete-all-users")

	var UserCollection = require("./collections/UserCollection.js");
	var ImageCollection = require("./collections/ImageCollection.js");
	var CommentCollection = require("./collections/CommentCollection.js");

	var UserModel = require("./models/UserModel.js");
	var ImageModel = require("./models/ImageModel.js");
	var CommentModel = require("./models/CommentModel.js");

	var userCollection = new UserCollection();
	var imageCollection = new ImageCollection();
	var commentCollection = new CommentCollection();
	
	var userNameBuilder = _.template($("#username-holder").html());
	var imageBuilder = _.template($("#image-holder").html());
	var commentBuilder = _.template($("#comment-holder").html());

	var loggedInUser;
	var userSpecifcImages;

	userCollection.fetch();

	var routerConfig = {
		routes:{
			"":"login",
			"login":"login",
			"profile/:user":"profile"
		},
		login:function(){
			$(".page").hide();
			$("#login").show();
		},
		profile:function(user){
			$(".page").hide();
			$("#profile").show();
			$("#place-image-here").html("");			
		}
	}

	var app = Backbone.Router.extend(routerConfig);
	var myRoutes = new app();
	Backbone.history.start();

	var $loginBtn = $("#login-btn");
	var $signUpBtn = $("#sign-up-btn");
	var $submitImage = $("#submit-image");

	$loginBtn.on("click", function(){
		$('#login-error').html("");
		loggedInUser = userCollection.findWhere({username: $("#username").val()});
		if(loggedInUser){
			var correctPassword = loggedInUser.attributes.password
		}
		if(!loggedInUser){
			$("#login-error").html("*User does not exist.");
		} else if(correctPassword !== $("#password").val()){
			$("#login-error").html("*Password is incorrect")
		} else {
			imageCollection.fetch({
				success: function(images){
					commentCollection.fetch()
				}
			});
			myRoutes.navigate("profile/"+$("#username").val(), {trigger: true});
		}
	});

	$signUpBtn.on("click", function(){
		$('#signup-error').html("");
		var newUser = new UserModel({
			username: $("#new-username").val(),
			password: $("#new-password").val(),
			fullName: $("#new-name").val(),
			email: $("#email").val()
		});
		if(newUser.isValid()){
			newUser.save();
			userCollection.add(newUser);
			loggedInUser = newUser;
			var profileNameBuilt = userNameBuilder({model: newUser});
			$("#username-goes-here").append(profileNameBuilt);
			myRoutes.navigate("profile/"+$("#new-username").val(), {trigger: true});
		} else {
			$('#signup-error').html(newUser.validationError);
		}
	});

	$submitImage.on("click", function(){
		$('#image-error').html("");
		var image = new ImageModel({
			imageUrl: $("#image-url").val(),
			caption: $("#caption").val(),
			imageOwner: loggedInUser.id
		});
		if(image.isValid()){
			image.save();
			imageCollection.add(image);	
		} else {
			$('#image-error').html(image.validationError);
		}
	});

	imageCollection.on("add", function(addedImage){			

		if(addedImage.get("imageOwner") === loggedInUser.id){
			var imageboardBuilt = imageBuilder({model: addedImage});
			$("#place-image-here").append(imageboardBuilt);
			$('[data-form-cid="'+addedImage.cid+'"]').on("submit", function(event){
				event.preventDefault();
				var commentModel = new CommentModel({
					text: $(this).find(".commentPost").val(),
					imageId: addedImage.id,
					commentOwner: loggedInUser.id
				});

				if(!commentModel.isValid()){
					commentModel.save();
					commentCollection.add(commentModel);
					$(this).find(".commentPost").val("");
					$(this).find(".commentPost").focus();
				}	
			});
		}	
	});

	commentCollection.on("add", function(addedComment){
		var userId = addedComment.get("commentOwner");
		var userModel = userCollection.get(userId);

		var commentBuilt = commentBuilder({model: addedComment, userModel: userModel});
		var imageIdForComment = addedComment.get("imageId");
		
		var imageModel = imageCollection.get(imageIdForComment);

		$("[data-id-comment-placer="+imageModel.cid+"]").prepend(commentBuilt);
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

























