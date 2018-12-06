const program = require('commander')
const path = require('path')
const chalk = require('chalk')
const fs = require('fs-extra')
const { version } = require('./package.json')

module.exports = () => {
  program
    .name('hyron')
    .version(`v${version}`, '--v, --version')
    .option('init <option>', 'initialize a new hyron app')
    .parse(process.argv)
  if (program.init) console.log(`created a new hyron app`)

  /**
   * Create an app name, enforcing npm naming requirements
   *
   * @param {String} name
   */

  function createAppName (name) {
    return path.basename(name)
      .replace(/[^A-Za-z0-9,-]+/g, '-')
      .replace(/^[-_.]+|-+$/g, '')
      .toLowerCase()
  }

  function createApplication () {
    let root = path.resolve(program.args.shift())
    const appName = createAppName(root) || 'hello-world'
    fs.ensureDirSync(appName)

    console.log(`Creating a new Hyron app in ${chalk.green(root)}`)
    console.log()

    // JavaScript
    const app = loadFile('js/app.js')
    const simpleApp = loadFile('js/simpleApp.js')

    // Package
    const packageJson = {
      name: appName,
      version: '0.0.0',
      private: true,
      scripts: {
        start: 'node ./bin/www'
      },
      dependencies: {
        'hyron': '~1.9.10'
      }
    }

    mkdir(root, 'routes')
    mkdir(root, 'views')
    mkdir(root, 'public')
    mkdir(root, 'public/javascripts')
    mkdir(root, 'public/stylesheets')
    mkdir(root, 'public/images')

    fs.writeFileSync(
      path.join(root, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    )

    fs.writeFileSync(path.join(root, 'app.js'), app)
    fs.writeFileSync(path.join(root, 'simpleApp.js'), simpleApp)
  }

  function loadFile (fileName) {
    var contents = fs.readFileSync(path.join(__dirname, 'files', fileName), 'utf-8')

    return contents
  }

  /**
   * Create new directories
   * @param {String} rootDir
   * @param {Array} newDir
   */

  function mkdir (rootDir, newDir) {
    var dir = path.join(rootDir, newDir)
    console.log(`   \x1b[36mcreate\x1b[0m :  ${chalk.green(dir)}${chalk.green(path.sep)}`)

    fs.mkdirSync(dir)
  }

  createApplication()
}
