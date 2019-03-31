const hyron = require("hyron");

// hyron start [path]
function start(path="./server/app.json"){
    hyron.build(path);
}

module.exports = start;