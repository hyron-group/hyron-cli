const onExt = require("./onExt.json");
const extManager = require("./manager");

var extList = Object.keys(onExt);

extList.forEach((name)=>{
    try{
        require(name);
    } catch(err){
        extManager("remove", name);
    }
})