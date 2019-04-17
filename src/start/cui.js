const inquirer = require("inquirer");
const fuzzyPath = require("inquirer-fuzzy-path");

function askForStart() {
    var question = [{
        type: "fuzzypath",
        name: "path",
        itemType: "file",
        rootPath: "server",
        excludePath: nodePath => /node_module/.test(nodePath),
        message: "Select file (json) : ",
        suggestOnly: false
    }];

    inquirer.registerPrompt("fuzzypath", fuzzyPath);
    return inquirer.prompt(question).then()
}

module.exports = askForStart;