module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false
  },
  plugins: ['react', 'prettier', 'jest'],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    'plugin:import/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': 'error',
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never'
      }
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true
      }
    ]
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js']
      }
    }
  },
  ignorePatterns: ['/*.*'],
  env: {
    browser: true,
    jasmine: true,
    jest: true,
    node: true,
    'jest/globals': true
  },
  globals: {
    moment: true,
    document: true,
    window: true,
    localStorage: true,
    Audio: true,
    Event: true,
    Blob: true
  },
  rules: {
    semi: ['error', 'never'],
    'no-unused-vars': 'off',
    'func-names': 'off',
    'prettier/prettier': [
      'error',
      {
        jsxSingleQuote: true
      },
      { usePrettierrc: true }
    ],
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state']
      }
    ],
    'max-len': ['off', { code: 100, ignoreComments: true }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-nested-ternary': 'error',
    'no-else-return': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true
      }
    ],
    quotes: [2, 'single', { avoidEscape: true }],
    'jsx-quotes': [2, 'prefer-single'],
    'comma-dangle': 'off',
    radix: 'off',
    eqeqeq: ['error', 'smart'],
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/destructuring-assignment': 'off',
    'react/display-name': 'off',
    'react/prefer-stateless-function': 'error',
    'import/prefer-default-export': 'off',
    'import/order': ['error', { groups: ['external', 'internal'] }],
    'import/no-cycle': ['warn', { ignoreExternal: true }],
    'no-shadow': 'off',
    'arrow-body-style': ['error', 'as-needed'],
    'consistent-return': 'off'
  }
}
