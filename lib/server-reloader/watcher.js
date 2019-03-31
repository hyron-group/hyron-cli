var fs = require('fs')

module.exports = class {
    constructor(config = {}) {
        var defaultCfg = {
            homeDir: './',
            ignoreDir: ['node_modules'],
            ignoreExtension: ['md', 'log', 'tmp'],
            delay: 2000,
            ...config
        }

        this.config = defaultCfg

        calculateSize(defaultCfg, curSize => {
            this.lastSize = curSize
        })
    }

    detectChange(cb) {
        calculateSize(this.config, size => {
            if (size !== this.lastSize) {
                cb()
                this.lastSize = size
            }
            setTimeout(() => {
                this.detectChange(cb)
            }, this.config.delay)
        })
    }
}

function calculateSize(config, event) {
    var totalSize = 0
    var maxFile = 0
    var counter = 0

    getSize(config.homeDir, (size, path) => {
        // console.log(`${path} : ${size}`);
        totalSize += size
    })

    function getSize(path, cb) {
        fs.stat(path, (err, stats) => {
            if (err != null) console.log(err.message)
            if (stats.isFile()) {
                if (counter < maxFile) {
                    var extension = path.substr(path.lastIndexOf('.') + 1)
                    if (!config.ignoreExtension.includes(extension)) {
                        cb(stats.size, path)
                    }
                } else {
                    event(totalSize + stats.size)
                }
                counter++
            } else if (stats.isDirectory()) {
                setImmediate(() => {
                    fs.readdir(path, (err, files) => {
                        if (err != null) console.log(err.message)
                        maxFile += files.length - 1
                        files.forEach(name => {
                            if (config.ignoreDir.includes(name)) {
                                counter++
                            } else getSize(path + '/' + name, cb)
                        })
                    })
                })
            }
        })
    }
}