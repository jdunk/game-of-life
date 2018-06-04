// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html',
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      },
    },
  },
  // add your custom rules here
  rules: {
    "indent": [ 2, 4, { "SwitchCase": 1 } ],
    "max-len": [ 2, 130 ],
    "default-case": 0,
    "no-plusplus": 0,
    "import/no-unresolved": 0, // "Casing of Vue does not match the underlying filesystem"
    "import/no-extraneous-dependencies": 0, // "'Vue' should be listed in the project's dependencies. Run 'npm i -S Vue' to add it"
    "prefer-const": 0,
    "one-var": 0,
    "consistent-return": 0,
    "no-use-before-define": [2, 'nofunc'],
    "brace-style": ["error", "stroustrup"],
    "no-unused-expressions": ["error", { "allowShortCircuit": true }],
    "no-param-reassign": 0,
    "no-return-assign": 0,

      // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never',
    }],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e', // for e.returnvalue
      ],
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js'],
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
}
