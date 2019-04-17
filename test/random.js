const inquirer = require("inquirer");
const fuz = require("inquirer-fuzzy-path");

inquirer.registerPrompt("fuz", fuz);

inquirer
    .prompt([{
        type: "fuz",
        name: "type",
        message: "type",
        itemType: 'file',
        excludePath: (nodePath) => {
            var r = /node_module/.test(nodePath);
            return r;
        },
    }]).then();

