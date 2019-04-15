const inquirer = require("inquirer");
const commander = require("commander");

function runCmd(cb){
    commander
    .description("manager extension plug to hyron-cli")
    .command("ext <action> [args]")
    .action(()=>{
        cb(action, args);
    })
}

module.exports = runCmd;