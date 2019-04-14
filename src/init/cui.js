
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

function questionForInit(type, path = "", cb) {
    console.log("init " + type);
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
        .then((moduleInfo) => {
            cb(type, path, moduleInfo);
        });

    inquirer.registerPrompt("fuzzypath", fuzzyPath);

}

function runCmd(event) {
    commander
        .command("init <type> [path]")
        .action((type, path) => {
            questionForInit(type, path, event);
        })
}

commander.parse(process.argv);

module.exports = runCmd;