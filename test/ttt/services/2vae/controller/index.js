const {} = require("../model");

module.exports = class {
    static requestConfig() {
        return {
            list: "get",
            detail: "get",
            add: "post",
            edit: "put",
            remove: "delete"
        }
    }

    // used to retrieve a list of data form database
    list(id) {
        return;
    }

    // used to retrieve single record form database
    detail(id) {
        return;
    }

    // used to add new record to database
    add(data) {
        return true;
    }

    // used to edit a record from database
    edit(id, data) {
        return true;
    }

    remove(id){
        return true;
    }
}