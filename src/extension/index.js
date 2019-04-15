const cui = require("./cui");
const manager = require("./manager");

require("./enableExt");

module.exports = cui(manager);