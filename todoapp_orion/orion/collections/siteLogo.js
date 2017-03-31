SiteLogo = new orion.collection('sitelogo', {
	singularName: orion.helpers.getTranslation('site.singularName'), // The name of one of this items
	title: orion.helpers.getTranslation('site.title'), // The title of the page
	link: {
		/**
			* The text that you want to show in the sidebar.
			* The default value is the name of the collection, so
			* in this case is not necesary
		*/
		title: orion.helpers.getTranslation('site.title')
	},
	/**
		* Tabular settings for this collection
	*/
	tabular: {
		columns: [
			{ data: 'title', title: orion.helpers.getTranslation('site.schema.title') },
			/**
				* If you want to show a custom orion attribute in
				* the index table you must call this function
				* orion.attributeColumn(attributeType, key, label)
			*/
			orion.attributeColumn('image', 'image', orion.helpers.getTranslation('site.schema.image')),
		]
	}
});

/**
 * Now we will attach the schema for that collection.
 * Orion will automatically create the corresponding form.
*/
SiteLogo.attachSchema(new SimpleSchema({
	title: {
		type: String,
		label: orion.helpers.getTranslation('site.schema.title') // We use this function to make i18n work in autoform
	},
	/**
		* The image attribute is a custom orion attribute
		* This is where orion do the magic. Just set
		* the attribute type and it will automatically
		* create the form for the image.
		* WARNING: the url of the image will not be saved in
		* .image, it will be saved in .image.url.
	*/
	image: orion.attribute('image', {
		label: orion.helpers.getTranslation('site.schema.image'), // We use this function to make i18n work in autoform
	}),
	/**
		* This attribute sets the user id of the user that created
		* this post automatically.
	*/
	createdAt: orion.attribute('createdAt')
}));