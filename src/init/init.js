const copyDir = require("copy-dir");
const jsonEditor = require("edit-json-file");
const child_process = require("child_process");

function init(type, path, info) {
    var template = "./res/sample/" + type;
    copyDir.sync(template, path);
    var instance = info.instance;
    delete info.instance;

    var packageFile = jsonEditor(path);
    for (var key in info) {
        packageFile.set(key, info[key]);
    }

    if (["services", "plugins", "addons"].includes(type)) {
        var buildFile = jsonEditor(instance);
        buildFile.set(type + '.' + info.name, path);
    } else if(type=="app"){
        child_process.execSync(`cd ${path}; npm i`);
    }
}

module.exports = init;