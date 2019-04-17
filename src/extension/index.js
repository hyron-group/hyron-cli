const cui = require("./cui");
const manager = require("./manager");

require("./enableExt");

function cmd(action, args){
    if(action == null){
        var {action} = cui();
    }
    manager(action, args)
}

module.exports = cui(manager);