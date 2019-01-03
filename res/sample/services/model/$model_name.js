const mongoose = require('mongoose');

var schema = new mongoose.Schema({

});

var model = mongoose.model("$model_name", schema);

module.exports = model;