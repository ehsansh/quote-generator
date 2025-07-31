// backend/eslint.config.js
const globals = require('globals');
const js = require('@eslint/js'); // Import ESLint's recommended rules
const prettierPlugin = require('eslint-plugin-prettier'); // Import the prettier plugin
const prettierConfig = require('eslint-config-prettier'); // Import the eslint-config-prettier

module.exports = [
    // Base ESLint recommended rules
    js.configs.recommended,

    // Configuration for JavaScript files
    {
        files: ['**/*.js', '**/*.cjs'], // Apply to all .js and .cjs files
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'module',
            globals: {
                ...globals.node, // Node.js globals
                ...globals.jest, // Jest globals for test files
            },
        },
        rules: {
            'no-console': ['warn', { allow: ['error'] }], // Allow console.error as warn, but warn on others
        },
    },

    // Prettier integration
    {
        files: ['**/*.js', '**/*.cjs'], // Apply to JS/CJS files
        plugins: {
            prettier: prettierPlugin, // Add the prettier plugin to this config object
        },
        rules: {
            ...prettierConfig.rules, // Apply rules from eslint-config-prettier
            'prettier/prettier': 'error', // Report prettier differences as errors
        },
    },
];
