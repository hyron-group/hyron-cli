function runApp(path) {
    var extension = path.substr(path.lastIndexOf('.')+1);
    if (extension == "json") {
        var hyron = require("hyron");
        hyron.build(path);

    } else if (extension == "js") {
        require(path);
    }
}

module.exports = runApp;