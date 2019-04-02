const editor = require("edit-json-file");

var e = editor("./test/test.json")
e.set("k1.v3", "645gr");

e.save();