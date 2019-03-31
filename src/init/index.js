const copyDir = require("copy-dir");
const path = require("path");

// hyron init <services|plugins|addons|app>
function init(type, dirName) {
    var template;
    if (type == "app") {
        template = "./res/sample/project";
    } else if (type == "plugins") {
        template = "./res/sample/plugins";
    } else if (type == "addons") {
        template = "./res/sample/addons";
    } else if (type == "services") {
        template = "./res/sample/services";
    } 
    copyDir.sync(template, path.join(__dirname, dirName));
};

init("app", "demoApp")

module.exports = init;