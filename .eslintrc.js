module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    // Allow console statements in development
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // Add more rules as needed
  },
  settings: {
    // Configure module resolution for aliases or custom paths
    'import/resolver': {
    },
  },
};
