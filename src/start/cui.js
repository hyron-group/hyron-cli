const commander = require("commander");
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
    inquirer.prompt(question).then(({path}) => {
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
        .description("run application using hyron framework")
        .option("-d, --dev", "run in development environment")
        .option("-p, --product", "run in product environment")
        .action(askIfNeccessary);

    commander.parse(process.argv);
}

module.exports = runCmd;