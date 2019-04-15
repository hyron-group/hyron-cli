const je = require("edit-json-file");

var a = je("test/aa.json", {});
a.unset("name3");

a.save()