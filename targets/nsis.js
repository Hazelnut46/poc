const { execSync } = require('child_process');

function validateDependencies() {
    console.log('  Checking for makensis...');
    try {
        execSync('makensis /VERSION', { stdio: 'ignore' });
        console.log('  makensis found');
        return true;
    } catch {
        console.error('  makensis not found. Install from: https://nsis.sourceforge.io');
        return false;
    }
}

function prepare(config, arch) {
    console.log(`  Preparing NSIS build for ${config.applicationId} (${arch})...`);
    console.log(`  App version: ${config.version}`);
    console.log(`  Binary: ${config.cli.binaryName}-win_${arch}.exe`);
    // in real implementation: create .nsi template, staging dir etc.
}

function build(config, arch) {
    console.log(`  Building NSIS installer for ${arch}...`);
    // in real implementation: execSync('makensis setup.nsi')
    console.log(`  Output: dist/${config.cli.binaryName}-${config.version}-setup-${arch}.exe`);
}

module.exports = { validateDependencies, prepare, build };