/**
* Publish all posts
*/
Meteor.publish('posts', (userId)=> {
	return Posts.find({"createdBy": userId});
});


/**
	* Publish one post specifically with its creator profile
*/
Meteor.publishComposite('onePostWithUser', (postId)=> {
	check(postId, String);
	return {
		find: function() {
			var ip = this.connection.clientAddress;
			return Posts.find({ _id: postId, flaggedBy: { $ne: ip } }, { fields: { flaggedBy: 0 } });
		},
		children: [{
			find: function(post) {
				return Meteor.users.find({ _id: post.createdBy }, { fields: { profile: 1 } });
			}
		}]
	};
});

Meteor.publish('commentsForPost', (postId)=> {
	return Comments.find({ postId: postId });
});

Meteor.publish('siteLogo', ()=>{
	return SiteLogo.find();
})