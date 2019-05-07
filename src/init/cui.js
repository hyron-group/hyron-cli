
const inquirer = require("inquirer");
const fuzzyPath = require("inquirer-fuzzy-path");
const node_path = require("path");

inquirer.registerPrompt("fuzzypath", fuzzyPath);


function isValidDir(path, name) {
    try {
        var isExist = !fs
            .readdirSync(node_path.join(path, name))
            .includes(path);
        return isExist;
    } catch (err) { }
    return true;
}

function isValidName(name) {
    return /[\w\d_]+/.test(name);
}

function questionForPath(type) {
    var question = [{
        type: "fuzzypath",
        excludePath: nodePath => /node_modules|\.git/.test(nodePath),
        name: "path",
        default: type=="app"?"./":type,
        message: "path",
    }];
    return inquirer
        .prompt(question).then();
}

function questionForType() {
    var question = [{
        type: "list",
        name: "type",
        message: "type",
        choices: [
            "app", "services", "plugins", "addons"
        ]
    }];
    return inquirer
        .prompt(question).then();
}

function questionForInfo(type, path) {

    var question = [{
        name: "name",
        type: "input",
        message: type + " name : ",
        validate: (input) => {
            return isValidName(input) && isValidDir(path, input);
        }
    }, {
        name: "description",
        type: "input",
        message: "description : "
    }, {
        name: "keywords",
        type: "input",
        message: "tags : ",
        filter: (input) => {
            var tags = [];              
            if (type != "app") {
                tags.push("hyron-" + type);
            }
            if (input != "") {
                var parserTags = input.split(",").map((t) => t.trim());
                tags.push(parserTags);
            }
            return tags;
        }
    }, {
        name: "version",
        type: "input",
        message: "version : ",
        default: "1.0.0",
        validate: (input) => {
            return /[\d]+.[\d]+.[\d]/.test(input);
        }
    }, {
        name: "instance",
        type: "fuzzypath",
        message: "instance : ",
        excludePath: nodePath => (/[\w\d\s-]+\.json/).test(nodePath),
        default: "server/app.json",
    }];
    return inquirer
        .prompt(question).then();
}

async function questionForInit(type, path) {
    if (type == null) {
        var { type } = await questionForType();
    }

    if (path == null) {
        var { path } = await questionForPath(type);
    }
    var info = await questionForInfo(type, path);

    path = node_path.join(process.cwd(), path);

    return {type, path, info}
}

module.exports = questionForInit;