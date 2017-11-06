module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module",
         "ecmaVersion": 8 // or 2017
    },
    "globals": {
      "require":true,
      "it":true,
      "module":true,
      "describe":true,
      "__dirname":true,
      "test":true,
      "before":true,
      "process":true,
      "Buffer":true
    },
    "rules": {
        "no-console":"off",
        "indent": [
            "off",
            2
        ],
        "linebreak-style": [
            "off",
            "windows"
        ],
        "quotes": [
            "warn",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-unused-vars":[
          "warn"
        ]
    }
};
