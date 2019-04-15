var {exec} = require("child_process");
var {Spinner} = require('cli-spinner');

var spinner = new Spinner('processing.. %s');
spinner.setSpinnerString(0);
spinner.start();
var p = exec(`cd ./test/asd ; npm i`,(err)=>{
    spinner.stop()
});
p.stdout.pipe(process.stdout);