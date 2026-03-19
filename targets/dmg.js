function validateDependencies() {
    console.log('  Checking for hdiutil...');
    try {
        const { execSync } = require('child_process');
        execSync('hdiutil --version', { stdio: 'ignore' });
        console.log('  hdiutil found');
        return true;
    } catch {
        console.error('  hdiutil not found (macOS only)');
        return false;
    }
}

function prepare(config, arch) {
    console.log(`  Preparing DMG for ${config.applicationId} (${arch})...`);
}

function build(config, arch) {
    console.log(`  Building DMG for ${arch}...`);
    console.log(`  Output: dist/${config.cli.binaryName}-${config.version}-${arch}.dmg`);
}

module.exports = { validateDependencies, prepare, build };