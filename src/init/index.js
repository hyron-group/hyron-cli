const commander = require("commander");
const inquirer = require("inquirer");
const node_path = require("path");
const fs = require("fs");

const fuzzyPath = require("inquirer-fuzzy-path");

const cui = require("./cui");
const init = require("./init");

module.exports = cui(init);