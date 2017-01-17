module.exports = {
	extends: [
		'google',
	],
	rules: {
		'comma-dangle': [2, 'always-multiline'],
		'dot-location': [2, 'property'],
		'eol-last': 2,
		indent: [2, 'tab', {'SwitchCase': 1}],
		'max-len': [2, 130, 4],
		'newline-after-var': 0,
		'new-cap': [2, { capIsNewExceptions: ['Router', 'API'] }],
		'no-else-return': 0,
		'no-extra-parens': [2, 'functions'],
		'no-multi-str': 0,
		'no-negated-condition': 0,
		'object-curly-spacing': [2, 'always', {
			'objectsInObjects': false,
			'arraysInObjects': true
		}],
		'one-var': 0,
		'quote-props': [2, 'as-needed'],
		"quotes": [2, "single", { "avoidEscape": true, "allowTemplateLiterals": true }],
		'require-jsdoc': 0,
	},
	env: {
		node: true
	},
};
