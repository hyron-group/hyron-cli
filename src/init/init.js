const copyDir = require("copy-dir");
const jsonEditor = require("edit-json-file");
const child_process = require("child_process");
const node_path = require("path");
const {Spinner} = require("cli-spinner");



function init(type, path, info) {
    var template = node_path.join("./res/sample/", type);
    copyDir.sync(template, path);
    var instance = info.instance || "./server/app.json";
    delete info.instance;

    var packagePath = node_path.join(path, "./package.json")
    var packageFile = jsonEditor(packagePath);
    for (var key in info) {
        packageFile.set(key, info[key]);
    }
    packageFile.save();

    if (["services", "plugins", "addons"].includes(type)) {
        console.log(instance);
        var buildFile = jsonEditor(instance);
        buildFile.set(type + '.' + info.name, path);
        buildFile.save();
    } else if (type == "app") {
        var spinner = new Spinner('installing... %s');
        spinner.setSpinnerString(0);
        spinner.start();
        var installProcess = child_process
        .exec(`cd ${path};npm i`,()=>{
            spinner.stop();
        });
        installProcess.stdout.pipe(process.stdout);
    }
}

init("services", "./test/asd", { name: "demo" })

module.exports = init;