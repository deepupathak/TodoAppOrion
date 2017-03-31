FlowRouter.route('/', {
	name: 'HomePage',
	action() {
		BlazeLayout.render('App_body', {main: 'home'});
	}
});

FlowRouter.route('/post', {
	name: 'Post',
	action() {
		BlazeLayout.render('App_body', {main: 'allPost'});
	}
});

FlowRouter.route('/post/:id', {
	name: 'postData',
	action(params) {
		BlazeLayout.render('App_body', {main: 'post'});
	}
});