const cui = require("./cui");
const init = require("./init");

async function cmd(type, path){
    var {type, path, info} = await cui(type, path);
    init(type, path, info);
}

module.exports = cmd;