module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'standard', 'react', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    jest: true,
    es6: true,
  },
  extends: [
    'standard',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
    'prettier/standard',
  ],
  rules: {
    '@typescript-eslint/interface-name-prefix': ['error', 'always'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/member-delimiter-style': 'off',
    'react/display-name': 0,
    'no-path-concat': 0,
    'max-len': ['error', { code: 80, ignoreUrls: true }],
    rules: {
      'prettier/prettier': ['error'],
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  globals: {
    APP_ENV: true,
  },
};
