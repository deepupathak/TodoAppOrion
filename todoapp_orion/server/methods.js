Meteor.methods({
	/**
	* Add the user ip to the flaggedBy array in the post. That will
	* hide the post for him. If flaggedBy reaches 3, it will remove
	* the post and ban the who created it.
	*/
	likePost: function(postId) {
		check(postId, String);
		if (!this.userId) return;
		var likes = Likes.find({ userId: this.userId, postId: postId }).count();
		if (likes) return;
		Likes.insert({ userId: this.userId, postId: postId });
		Posts.update(postId, { $inc: { likesCount: 1 } });
	},
	unlikePost: function(postId) {
		check(postId, String);
		if (!this.userId) return;
		var likes = Likes.find({ userId: this.userId, postId: postId }).count();
		if (!likes) return;
		Likes.remove({ userId: this.userId, postId: postId });
		Posts.update(postId, { $inc: { likesCount: -1 } });
	},
	CommentPost: function(comment, postId, userId){
		check(comment, String);
		check(postId, String);
		check(userId, String);
		if (!this.userId) return;
		Comments.insert({
			comment: comment,
			postId: postId,
			createdBy: userId
		})
	},
	deleteComment: function(commentId){
		check(commentId, String);
		if (!commentId) return;
		Comments.remove({_id: commentId});
	},
	editComment: function(commentId, comment){
		check(commentId, String);
		check(comment, String);
		if(!commentId) return;
		Comments.update({_id: commentId}, {$set:{comment: comment}});
	}
});
