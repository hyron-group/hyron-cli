module.exports = {
    handle (req, res, prev, cfg) {
        // this function will be call before main handle for each request
    },

    onCreate (cfg) {
        // this function will be call fist time main handle is trigged
    },

    checkout (done) {
        // this function used to revoke onCreate function if return true, or call done() if onCreate hasn't revoke anymore
    },

    // true if this fontware called for all services, except except for the router configured not
    global: false,

    // type of prev that handle function will be execute or skip if prev not instance of type in array
    typeFilter: []
}