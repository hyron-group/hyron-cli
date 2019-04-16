const cui = require('./cui');
const start = require('./start');

async function cmd(path) {
    if (path == null) {
        var { path } = await cui();
    }
    start(path);
}

module.exports = cmd;