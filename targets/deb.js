const { execSync } = require('child_process');

function validateDependencies() {
    console.log('  Checking for dpkg-deb...');
    try {
        execSync('dpkg-deb --version', { stdio: 'ignore' });
        console.log('  dpkg-deb found');
        return true;
    } catch {
        console.error('  dpkg-deb not found!');
        // this should be available by default on most debian/ubuntu systems
        console.error('  Try: sudo apt-get install dpkg');
        return false;
    }
}

function prepare(config, arch) {
    console.log(`  Preparing DEB package for ${config.applicationId} (${arch})...`);
    console.log(`  Creating DEBIAN/control file...`);
    // in real implementation: create staging dir, control file etc.
}

function build(config, arch) {
    console.log(`  Building .deb package for ${arch}...`);
    // in real implementation: execSync('dpkg-deb --build staging dist/')
    console.log(`  Output: dist/${config.cli.binaryName}-${config.version}-${arch}.deb`);
}

module.exports = { validateDependencies, prepare, build };