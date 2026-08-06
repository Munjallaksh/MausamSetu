import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
	{
		ignores: ['.svelte-kit/**', 'build/**', 'node_modules/**', 'static/cesium/**']
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	...svelte.configs['flat/recommended'],
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: tseslint.parser,
				extraFileExtensions: ['.svelte']
			}
		}
	},
	{
		languageOptions: { globals: { ...globals.browser, ...globals.node } }
	},
	prettier,
	...svelte.configs['flat/prettier'],
	{
		files: ['src/lib/components/ui/**/*.svelte'],
		rules: {
			// Generated UI primitives support both internal and arbitrary external URLs.
			'svelte/no-navigation-without-resolve': 'off'
		}
	}
];
