

function runApp(path) {
    var extension = path.substr(path.lastIndexOf('.')+1);
    if (extension == "json") {
        const hyron = require("hyron");
        hyron.build(path);
        // eval(`const hyron = require("hyron");hyron.build(path);`)

    } else if (extension == "js") {
        require(path);
    }
}

module.exports = runApp;