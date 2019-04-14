const commander = require('commander');
const inquirer = require("inquirer");
const fuzzyPath = require("inquirer-fuzzy-path");

function questionForStart(cb) {
    var question = [{
        type: "fuzzypath",
        name: "path",
        itemType: "file",
        rootPath: "server",
        default: "server/app.json",
        excludePath: nodePath =>
            nodePath.startsWith('node_modules'),
        message: "Select file (json) : ",
        suggestOnly: false
    }];

    inquirer.registerPrompt("fuzzypath", fuzzyPath);
    inquirer.prompt(question).then((answer) => {
        var {
            path
        } = answer;

        cb(path, env);
    });
}

function runCmd(event) {

    function askIfNeccessary(path, env) {
        if (path != null) {
            event(path, env);
        } else {
            questionForStart(event);
        }
    }

    commander
        .command("start [path]")
        .option("-d, --dev", "run application using hyron framework in development environment")
        .option("-p, --product", "run application using hyron framework in product environment")
        .action(askIfNeccessary);

    commander.parse(process.argv);
}

module.exports = runCmd;