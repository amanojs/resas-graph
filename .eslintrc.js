module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  plugins: ['vue'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        noNew: true,
        semi: false,
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],
  },
};
