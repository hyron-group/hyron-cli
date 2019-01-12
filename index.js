const program = require('commander')
const path = require('path')
const chalk = require('chalk')
const fs = require('fs-extra')
const envinfo = require('envinfo')
const { version } = require('./package.json')

let projectName

module.exports = () => {
  program
    .name('hyron')
    .version(`v${version}`, '--v, --version')
    .arguments('<project-name>')
    .usage(`${chalk.green('<project-name>')} [options]`)
    .action(name => {
      projectName = name
    })
    .option('-s, --style <engine>', 'set stylesheet <engine> support (less|stylus|sass) (defaults to plain css)')
    .option('--info', 'print environment debug info')
    .on('--help', () => {
      console.log()
      console.log(
        `    If you have any problems, do not hesitate to file an issue:`
      )
      console.log(
        `      ${chalk.cyan(
          'https://github.com/hyron-group/hyron-cli/issues/new'
        )}`
      )
    })
    .parse(process.argv)

  // Program info for debugging purposes
  if (program.info) {
    console.log(chalk.bold('\nEnvironment Info:'))
    return envinfo.run(
      {
        System: ['OS', 'CPU'],
        Binaries: ['Node', 'npm', 'Yarn'],
        Browsers: ['Chrome', 'Edge', 'Internet Explorer', 'Firefox', 'Safari'],
        npmPackages: ['hyron'],
        npmGlobalPackages: ['hyron-cli']
      },
      {
        duplicates: true,
        showNotFound: true
      }
    )
      .then(console.log)
  }

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
    const appName = createAppName(root)
    fs.ensureDirSync(appName)

    console.log(`Creating a new Hyron app in ${chalk.green(root)}`)
    console.log()

    // JavaScript
    const app = loadFile('js/app.js')
    const routes = loadFile('js/router.js')

    // Styles
    var styles

    // Style extention
    var ext

    // Package
    const packageJson = {
      name: appName,
      version: '0.0.0',
      private: true,
      scripts: {
        start: 'node app.js'
      },
      dependencies: {
        'hyron': '~2.1.5'
      }
    }

    console.log(`   ${chalk.cyan('create')} :  ${chalk.green(appName)}${chalk.green(path.sep)}`)
    mkdir(appName, 'views')
    mkdir(appName, 'public')
    mkdir(appName, 'public/javascripts')
    mkdir(appName, 'public/images')
    mkdir(appName, 'public/stylesheets')

    switch (program.style) {
      case 'stylus':
        styles = loadFile('stylesheets/style.styl')
        ext = '.styl'
        break
      case 'sass':
        styles = loadFile('stylesheets/style.sass')
        ext = '.sass'
        break
      case 'less':
        styles = loadFile('stylesheets/style.less')
        ext = '.less'
        break
      case 'compass':
        styles = loadFile('stylesheets/style.scss')
        ext = '.scss'
        break
      default:
        styles = loadFile('stylesheets/style.css')
        ext = '.css'
    }

    generateFiles(root, `public/stylesheets/style${ext}`, styles)

    mkdir(appName, 'routes')

    generateFiles(root, 'routes/routes.js', routes)
    generateFiles(root, 'package.json', packageJson)
    generateFiles(root, 'app.js', app)

    console.log()
    console.log()
    console.log(` Please run ${chalk.cyan(`cd ${projectName}`)} to navigate to project directory,`)
    console.log(` ${chalk.cyan('npm install')} to install dependencies, and`)
    console.log(` ${chalk.cyan('npm start')} to start app`)
    console.log()
  }

  function loadFile (fileName) {
    var contents = fs.readFileSync(path.join(__dirname, 'temp', fileName), 'utf-8')
    return contents
  }

  /**
   * Create new directories
   * @param {String} rootDir
   * @param {Array} newDir
   */

  function mkdir (rootDir, newDir) {
    var dir = path.join(rootDir, newDir)
    console.log(`   ${chalk.cyan('create')} :  ${chalk.green(dir)}${chalk.green(path.sep)}`)

    fs.mkdirSync(dir)
  }

  // Create new files
  function generateFiles (rootDir, newFile, file) {
    var tempFile = file === 'packageJson' ? JSON.stringify(file, null, 2) : file

    fs.writeFileSync(path.join(rootDir, newFile), tempFile)
    console.log(`   ${chalk.cyan('create')} :  ${chalk.green(path.join(projectName, newFile))}`)
  }

  if (projectName) createApplication()
  if (typeof projectName === 'undefined') {
    console.error('Please specify the project name:')
    console.log(
      `  ${chalk.cyan(program.name())} ${chalk.green('<project-name>')}`
    )
    console.log()
    console.log('For example:')
    console.log(`  ${chalk.cyan(program.name())} ${chalk.green('my-hyron-app')}`)
    console.log()
    console.log(
      `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`
    )
    process.exit(1)
  }
}
