/**
	* We set the app options in /lib to be loaded before everything
*/

/**
	* To set the schema of the user profile, so we can
*/

Options.set('profileSchema', {
	picture: orion.attribute('image', {
		label: orion.helpers.getTranslation('accountsPictureLabel'),
		optional: true,
	}),
	name: {
		type: String,
		label: orion.helpers.getTranslation('accountsNameLabel'),
	},
});