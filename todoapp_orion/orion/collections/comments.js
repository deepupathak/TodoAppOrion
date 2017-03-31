Comments = new Mongo.Collection('comments');

Comments.attachSchema(
	new SimpleSchema({
		comment: {
			type: String,
			autoform: {
				label: false,
				placeholder: 'Message'
			}
		},
		postId: {
			type: String,
		},
		createdAt: {
			type: Date,
			autoValue: function() {
				return new Date;
			}
		},
		createdBy: {
			type: String,
			autoValue: function() {
				return this.userId;
			}
		}
	})
);

/**
 * Using dburles:collection-helpers we will add a helper to the posts
 * collection to easily get the user
*/

Comments.helpers({
  getCreator: function () {
    return Meteor.users.findOne({ _id: this.createdBy });
  }
});