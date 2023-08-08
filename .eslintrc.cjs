module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'standard-with-typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
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
  settings: {
    react: {
      version: 'detect',
    },
  },
};
