const inquirer = require("inquirer");
const fuzzyPath = require("inquirer-fuzzy-path");

function askForStart() {
    var question = [{
        type: "fuzzypath",
        name: "path",
        itemType: "file",
        excludePath: nodePath => /node_modules|\.git/.test(nodePath),
        message: "Select file (json) : ",
    }];

    inquirer.registerPrompt("fuzzypath", fuzzyPath);
    return inquirer.prompt(question).then()
}

module.exports = askForStart;