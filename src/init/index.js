const commander = require("commander");
const copyDir = require("copy-dir");
const inquirer = require("inquirer");
const node_path = require("path");
const fs = require("fs");
const jsonEditor = require("edit-json-file");
const fuzzyPath = require('inquirer-fuzzy-path');


function isValidDir(path, name) {
    try {
        var isExist = !fs
            .readdirSync(node_path.join(path, name))
            .includes(path);
        return isExist;
    } catch (err) {}
    return true;
}

function isValidName(name) {
    return /[\w\d_]+/.test(name);
}

function init(type, info, path) {
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
    }

}


function questionForInit(type, path = "") {
    console.log("init " + type)
    var path = node_path.join(__dirname, path);
    var question = [{
        type: "input",
        name: "name",
        message: type + " name : ",
        validate: (input) => {
            return isValidName(input) && isValidDir(path, input);
        }
    }, {
        type: "input",
        name: "description",
        message: "description : "
    }, {
        type: "input",
        name: "keywords",
        message: "tags : ",
        filter: (input) => {
            return input.split(",").map((t) => t.trim());
        }
    }, {
        type: "input",
        name: "version",
        message: "version : ",
        default: "1.0.0",
        validate: (input) => {
            return /[\d]+.[\d]+.[\d]/.test(input);
        }
    }, {
        type: "fuzzypath",
        name: "instance",
        message: "instance : ",
        rootPath: "server",
        default: "server/app.json",
    }];
    inquirer
        .prompt(question)
        .then((answer) => {
            init(type, answer, path);
        });

    inquirer.registerPrompt("fuzzypath", fuzzyPath);

}

// question("plugins","demo")


commander
    .command("init <type> [path]")
    .action((type, path) => {
        questionForInit(type, path)
    })

commander.parse(process.argv)

module.exports = questionForInit;