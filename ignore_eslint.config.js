export default [
  {
    extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'prettier/@typescript-eslint',
      'prettier/react',
      'plugin:react-hooks/recommended',
    ],
    root: true,
    rules: {
      '@typescript-eslint/explicit-function-return-types': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'no-shadow': 0,
      'func-names': ['error', 'never'],
      'spaced-comment': 0,
      'jsx-a11y/lang': 0,
      'jsx-a11y/html-has-lang': 0,
      'jsx-a11y/no-static-element-interactions': 0,
      'react/jsx-no-bind': 0,
      'react-hooks/exhaustive-deps': 'warn',
      'global-require': 0,
      'object-curly-newline': 0,
      'max-len': 0,
      'no-underscore-dangle': 0,
      'import/prefer-default-export': 0,
      'react/no-array-index-key': 0,
      'react/jsx-filename-extension': [
        1,
        {
          extensions: ['.js', '.jsx', '.tsx'],
        },
      ],
      'react/prop-types': 'off',
    },
  },
];
