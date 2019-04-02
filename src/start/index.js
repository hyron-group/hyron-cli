const commander = require('commander');
const inquirer = require("inquirer");
const fuzzyPath = require("inquirer-fuzzy-path");

function runApp(path) {
    var extension = path.substr(path.lastIndexOf('.')+1);
    if (extension == "json") {
        const hyron = require("hyron");
        hyron.build(path);
    } else if (extension == "js") {
        require(path);
    }
}

function start(path, option) {
    if (path != null) {
        runApp(path);
    } else {
        var question = [{
            type: "fuzzypath",
            name: "path",
            itemType: "file",
            rootPath: "server",
            default: "server/app.json",
            excludePath: nodePath =>
                nodePath.startsWith('node_modules'),
            message: "Select file (json, js) : ",
            suggestOnly: false
        }];

        inquirer.registerPrompt("fuzzypath", fuzzyPath);
        inquirer.prompt(question).then((answer) => {
            var {
                path
            } = answer;

            runApp(path, option);
        });
    }
}

// start()

commander
    .command("start [path]")
    .option("-d, --dev", "run application using hyron framework in development environment")
    .option("-p, --product", "run application using hyron framework in product environment")
    .action(start)

commander.parse(process.argv);

module.exports = start;