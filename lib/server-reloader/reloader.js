const Watcher = require("./watcher");
const child_process = require("child_process");

/**
 *
 * @param {object} config
 * @param {string} config.homeDir home directory watcher will lookup
 * @param {[string]} config.ignoreDir directory watcher will be skip
 * @param {[string]} config.ignoreExtension extension watcher will be skip
 * @param {number} config.delay delay time of watcher
 */
function reload(config = { hotReload: false }) {
    if (config.hotReload == true) {
        new Watcher(config).detectChange(() => {
            console.log("detect changed ...");
        });
    }
};

module.exports = reload;