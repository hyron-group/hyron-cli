const inquirer = require("inquirer");

function askForAction() {
    var question = [{
        type: "list",
        name: "type",
        message: "type",
        choices: [
            "install",
            "remove",
            "list"
        ]
    }, {
        type: "name",
        message: "type"
    }];

    return inquirer
        .prompt(question)
        .then()
}

module.exports = askForAction;