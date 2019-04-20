const copyDir = require("copy-dir");
const jsonEditor = require("edit-json-file");
const { exec } = require("child_process");
const node_path = require("path");
const { Spinner } = require("cli-spinner");
const fs = require("fs");
var samplePath = node_path.join(__dirname, "../../", "./res/sample/");
const supportedType = fs.readdirSync(samplePath);


function copyTemplate(type, path, name) {
    var template = node_path.join(samplePath, type);
    console.log(template);
    if (supportedType.includes(type)) {
        var targetLocal = node_path.join(path, name);
        copyDir.sync(template, targetLocal);
    }
    else throw new Error(`not supported for type : '${type}'`);
}

function updatePackage_json(path, info) {
    var packagePath = node_path
        .join(path, info.name, "./package.json");
    var packageFile = jsonEditor(packagePath);
    for (var key in info) {
        packageFile.set(key, info[key]);
    }
    packageFile.save();
}

function updateBuildFile(path, instance, name, type) {
    instance = node_path.join(path, "../", instance);
    var buildFile = jsonEditor(instance);
    var field = type + '.' + name;
    var fileData = buildFile.data;
    if (fileData instanceof Array) {
        field = "0." + field;
    }
    var modulePath = node_path.join(type, name);
    buildFile.set(field, modulePath);
    buildFile.save();
}

function installPackage(path, name) {
    path = node_path.join(path, name);
    var spinner = new Spinner('installing... %s');
    spinner.setSpinnerString(0);
    spinner.start();
    var installProcess = exec(`cd ${path};npm i`, () => {
        spinner.stop();
    });
    installProcess.stdout.pipe(process.stdout);
}

function init(type, path, info) {
    var instance = info.instance || "./server/app.json";
    var name = info.name;
    delete info.instance;
    copyTemplate(type, path, name);
    updatePackage_json(path, info)

    if (["services", "plugins", "addons"].includes(type)) {
        updateBuildFile(path, instance, info.name, type);
    } else if (type == "app") {
        installPackage(path, name)
    }
}

// init("addons", "./test/dm2/addons", { name: "ad1" })

module.exports = init;