// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
    parser: "babel-eslint",
  },
  env: {
    browser: false,
    node: true,
    es6: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  // extends: "standard",
  // required to lint *.vue files
  plugins: ["html"],
  // add your custom rules here
  rules: {
    // allow async-await
    "generator-star-spacing": "off",
    // allow paren-less arrow functions
    "arrow-parens": 0,
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-undef": "off",
    camelcase: "off",
    quotes: [1, "double"],
    semi: ["error", "always"],
    "space-before-function-paren": [0, "always"],
  },
  globals: {
    App: true,
    Page: true,
    wx: true,
    swan: true,
    tt: true,
    my: true,
    getApp: true,
    getPage: true,
    requirePlugin: true,
    mpvue: true,
    mpvuePlatform: true,
  },
};
