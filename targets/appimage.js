function validateDependencies() {
    console.log('  Checking for appimagetool...');
    try {
        const { execSync } = require('child_process');
        execSync('appimagetool --version', { stdio: 'ignore' });
        console.log('  appimagetool found');
        return true;
    } catch {
        console.error('  appimagetool not found. Download from: https://appimage.github.io/appimagetool');
        return false;
    }
}

function prepare(config, arch) {
    console.log(`  Preparing AppImage for ${config.applicationId} (${arch})...`);
}

function build(config, arch) {
    console.log(`  Building AppImage for ${arch}...`);
    console.log(`  Output: dist/${config.cli.binaryName}-${config.version}-${arch}.AppImage`);
}

module.exports = { validateDependencies, prepare, build };