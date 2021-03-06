const {CURRENT_DIRECTORY, FS, COLORS, NOTIFY, NAME, VERSION, SHELL} = require('../config/superman.config');
/**
 * User package version
 * @returns {*}
 * @constructor
 */
const PACKAGE_VERSION = () => {
    if (checkIfFileExist(`${CURRENT_DIRECTORY}/package.json`)) {
        return require(`${CURRENT_DIRECTORY}/package.json`).version;
    } else {
        console.log('\n', COLORS.bgRed.white.bold('Oh no!'), COLORS.yellow('Package.json file does\'t exist this directory.'), '\n');

        supermanNotify(`Oh no!, Package.json file does't exist this directory.`);
        process.exit();
    }
};

/**
 * Write package file
 *
 * @param NEW_VERSION
 * @constructor
 */
const WRITE_PACKAGE_FILE = (NEW_VERSION) => {
    console.log('\n', COLORS.grey(' Pleas wait tasks is running...'), '\n');
    SHELL.sed('-i', `"version": "${PACKAGE_VERSION()}"`, `"version": "${NEW_VERSION}"`, `${CURRENT_DIRECTORY}/package.json`);

    supermanNotify(`Oh yes!, your application version is now update to ${NEW_VERSION}.`);
    console.log('  ', COLORS.bgGreen('Oh yes!'.bold.white), COLORS.green(`your application version is now change to ${COLORS.yellow(NEW_VERSION)}.`), '\n');
};

/**
 * Check if file exist
 *
 * @param filePath
 * @returns {boolean}
 */
const checkIfFileExist = (filePath) => {
    try {
        FS.statSync(filePath);
    } catch (err) {
        if (err.code === 'ENOENT') {
            return false;
        }
        return false;
    }
    return true;
};

/**
 * Notification function
 *
 * @param message
 */
const supermanNotify = (message) => {
    NOTIFY.notify({
        title: 'Superman Versioning',
        message: `${message}`
    });
};

/**
 * Split current version
 * @returns {*|string[]}
 */
const SPLIT_VERSION = () => {
    let version = PACKAGE_VERSION().split('.');

    return {
        major: parseInt(version[0]),
        minor: parseInt(version[1]),
        patch: parseInt(version[2]),
    }
};

const END_PROCESS_IF_VALUE_IS_EMPTY = (value) => {
    if (value === undefined) {
        console.log('\n', COLORS.yellow.bold('USAGE:'), COLORS.grey(' superman version:set [value] [options]'), '\n');
        console.log('   ', COLORS.bgRed.white.bold('Exception'), COLORS.yellow('Value is missing.'), '\n');
        NOTIFY.notify({
            title: 'Exception',
            message: `Value is missing.`
        });
        process.exit();
    }
};

/**
 * Export modules
 */
module.exports = {
    WRITE_PACKAGE_FILE,
    SPLIT_VERSION,
    END_PROCESS_IF_VALUE_IS_EMPTY
};
