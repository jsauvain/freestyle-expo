// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  {
    // Bloom contract — screens under app/** must compose lib/primitives, never
    // raw react-native primitives. Codegen.md ("never raw <View>/<Text>") and
    // the chameleon design depend on every visual passing through useTokens().
    // lib/primitives/* is exempt because it IS the wrapping layer.
    files: ['app/**/*.{ts,tsx,js,jsx}'],
    rules: {
      'no-restricted-imports': ['error', {
        paths: [
          {
            name: 'react-native',
            importNames: ['Text', 'View', 'TextInput', 'Pressable'],
            message:
              'Use lib/primitives instead: Display/Body/Caption for Text, Surface/Stack for View, Field for TextInput, Press for Pressable.',
          },
        ],
      }],
    },
  },
]);
