#!/usr/bin/env node

const commander = require("commander");

commander
    .command("init [type] [path]")
    .description("init module or application using template")
    .action(require("./src/init"));

commander
    .command("start [path]")
    .description("run application using hyron framework")
    // .option("-d, --dev", "run in development environment")
    // .option("-p, --product", "run in product environment")
    .action(require("./src/start"));


commander.parse(process.argv);

