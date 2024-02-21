/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  semi: false, // 去除分号
  singleQuote: true, // 单引号
  bracketSpacing: true, //空格
  peintWidth:80,
  endOfLine: "auto",
  trailingComma: "none", // 去掉逗号
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules:{
    "pretier/prettier": [
      "warn",
      {
       singleQuote: true,
       semi: false,
       peintWidth:80,
       trailingComma:"none",
       endOfLine: "auto"
      }
    ],
    'vue/multi-word-component-names': [
      "warn",
      {
        ignores: ["index"]
      }
    ],
    "vue/no-setup-props-destructure": ["off"],
  }
}
