module.exports = {
  parser: 'vue-eslint-parser',
  extends: [
    'taro/vue3',
    'airbnb',
    'airbnb-typescript',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint', 'prettier', 'import', 'vue'], // add to config manually
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: './',
    extraFileExtensions: ['.vue'],
  },
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    console: true,
  },
  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
  rules: {},
}
