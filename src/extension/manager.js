const { exec } = require("child_process");
const editJson = require("edit-json-file");
const onExtPath = "./onExt.json";

var supportedAction = {

    install(name) {
        exec(`yarn add ${name}`, (err)=>{
            if(err!=null){
                var extFile = editJson(onExtPath);
                extFile.set(name, "");
                extFile.save();
            }
        })
            .stdout.pipe(process.stdout);
    },

    remove(name) {
        exec(`yarn remove ${name}`, (err)=>{
            if(err!=null){
                var extFile = editJson(onExtPath);
                extFile.unset(name);
                extFile.save();
            }
        })
            .stdout.pipe(process.stdout);
    },

    list() {
        exec(`npm ls --depth=0`)
            .stdout.pipe(process.stdout);
    }
}

function manager(action, args) {
    var isExist = Object.keys(supportedAction).includes(action);
    if (isExist) {
        supportedAction[action](args);
    }
}

module.exports = manager;