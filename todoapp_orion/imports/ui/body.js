/*--------- Import statements --------*/

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';

import './body.html';
import './task.js';

Template.home.onCreated(function bodyOnCreated() {
	this.state = new ReactiveDict();
	Meteor.subscribe('tasks');
});

Template.home.onRendered(()=> {
	Meteor.subscribe('siteLogo');
});

Template.home.helpers({
	tasks() {
		const instance = Template.instance();
		if (instance.state.get('hideCompleted')) {
			/*If hide completed is checked, filter tasks*/
			return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
		}
		/*Otherwise, return all of the tasks*/
		return Tasks.find({}, { sort: { createdAt: -1 } });
	},
	incompleteCount() {
		return Tasks.find({ checked: { $ne: true } }).count();
	},
	logo() {
		return SiteLogo.findOne();
	},
	loggedInUser() {
		// console.log("Loggedin user =>", Meteor.users.findOne({_id: Meteor.userId()}))
		return Meteor.users.findOne({_id: Meteor.userId()});
	}
});

Template.home.events({
	'submit .new-task'(event) {
		/*Prevent default browser form submit*/

		event.preventDefault();

		/*Get value from form element*/

		const target = event.target;
		const text = target.text.value;

		/*Insert a task into the collection*/

		Meteor.call('tasks.insert', text);

		/*Clear form*/

		target.text.value = '';
	},
	'change .hide-completed input'(event, instance) {
		instance.state.set('hideCompleted', event.target.checked);
	},
});

Template.allPost.onRendered(()=> {
	Meteor.subscribe('posts', Meteor.userId());
});

Template.allPost.helpers({
	postRecord() {
		// console.log("Post Data =>", Posts.find({}, { sort: { likesCount: -1 } }).fetch())
		return Posts.find({}, { sort: { likesCount: -1 } });
	}
});

Template.homePost.events({
	'click .like-btn': function() {
		var post = Posts.findOne(this._id);
		console.log("Post like >>>", post);
		if (post.likes(Meteor.userId())) {
			Meteor.call('unlikePost', this._id);
		} else {
			Meteor.call('likePost', this._id);
		}
	}
});

Template.homePost.helpers({
  postData() {
  	return Posts.find({"createdBy": Meteor.userId()}).fetch();
  }
});

Template.post.helpers({
	post() {
		return Posts.findOne(FlowRouter.current().params.id);
	},
	CommentList() {
		// console.log("Comments =>", Comments.find({ "postId": FlowRouter.current().params.id}).fetch())
		return Comments.find({ "postId": FlowRouter.current().params.id}).fetch();
	},
	/*isEdit(){
		return Session.get('edit');
	}*/
});

Template.post.onRendered(()=> {
	Meteor.subscribe('onePostWithUser', FlowRouter.current().params.id);
	Meteor.subscribe('commentsForPost', FlowRouter.current().params.id);
	// Session.setDefault('edit', false);
});

Template.post.events({
	'click #comment'(event) {
		event.preventDefault();
		$('#CommentArea').toggle();
		// $('#CommentArea').css('display','block');
	},
	'click #SubmitComment'(event) {
		event.preventDefault();
		var comment = $("#CommentBox").val();
		if (comment != "") {
			// console.log(comment, "<< Comment Submit", this._id, Meteor.userId())
			Meteor.call('CommentPost', comment, this._id, Meteor.userId());
			$("#CommentBox").val('');
			$('#CommentArea').toggle();
		}else{
			swal("Oops...", "Please input comment!", "error");
		}
	},
	'click #CancelComment'(event) {
		event.preventDefault();
		$("#CommentBox").val('');
		$('#CommentArea').toggle();
	},
	'click .deleteComment'(event) {
		event.preventDefault();
		var ans = window.confirm('Are you sure want to delete this comment ?');
		if(ans){
			Meteor.call('deleteComment', this._id, (err)=>{
				if(err) return;
				else alert("Comment deleted");
			});
		}
	},
	'click .editComment'(event) {
		event.preventDefault();
		// console.log("this._id --->", this._id)
		$('#edit_'+this._id).css('display','block');
		$('#show_'+this._id).css('display','none');
	},
	'click #CancelEdit'(event) {
		event.preventDefault();
		// Session.set('edit', false);
		$('#show_'+this._id).css('display','block');
		$('#edit_'+this._id).css('display','none');
	},
	'click #saveEdit'(event) {
		event.preventDefault();
		var comment = $("#CommentBox").val();
		console.log("--->", comment, this._id)
		Meteor.call('editComment', this._id, comment);
	}
})