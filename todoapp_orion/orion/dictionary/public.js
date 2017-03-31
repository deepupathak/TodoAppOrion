/**
 * In this file are defined the definitions of the
 * category basic.
 * It's a good practice to create a file for
 * each dictionary category
*/

orion.dictionary.addDefinition('Tagline', 'public', {
	type: String,
	label: orion.helpers.getTranslation('dictionary.public.tagline'),
	defaultValue: function() {
		// Works with functions or values
		return 'Sample Tagline';
	}
});