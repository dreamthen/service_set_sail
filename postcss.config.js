const autoprefixer = require("autoprefixer");
const AUTO_PRE_FIXER_BROWSERS = [
    "Android >= 4",
    "IOS >= 3.5",
    "Chrome >= 35",
    "Firefox >= 31",
    "Explorer >= 9",
    "Opera >= 12",
    "Safari >= 7.1"
];

const postcssConfig = {
    plugins:[
        autoprefixer({browsers: AUTO_PRE_FIXER_BROWSERS})
    ]
};

module.exports = postcssConfig;