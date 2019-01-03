const serviceConfig = require("hyron").getConfig("$service_name");

module.exports = class {
    static requestConfig() {
        return {
            list: "get",
            detail: "get",
            add: "post",
            edit: "put"
        }
    }

    // used to retrieve a list of data form database
    list() {

    }

    // used to retrieve single record form database
    detail() {

    }

    // used to add new record to database
    add() {

    }

    // used to edit a record from database
    edit() {

    }
}