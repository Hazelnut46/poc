const path = require('path');
const { resolveConfig, getTargetsForPlatform } = require('./configResolver');

// node gives us 'win32' even on 64bit windows, kinda confusing
const PLATFORM_MAP = {
    'win32': 'win',
    'linux': 'linux',
    'darwin': 'mac'
};

async function build(targetArg, archArg, configPath) {
    console.log('\n neutralinojs-builder POC\n');

    // load config
    const config = resolveConfig(configPath);
    console.log(`App: ${config.applicationId} v${config.version}\n`);

    // detect platform
    const platform = PLATFORM_MAP[process.platform];

    // get targets — from CLI arg or config
    let targets = [];

    if (targetArg) {
        const arch = archArg || 'x64';
        targets = [{ target: targetArg, arch: [arch] }];
    } else {
        targets = getTargetsForPlatform(config, platform);
        console.log(`No target specified — reading from config for platform: ${platform}`);
    }

    console.log(`Targets to build: ${targets.map(t => t.target).join(', ')}\n`);

    // build each target
    for (const t of targets) {
        for (const arch of t.arch) {
            console.log(`\nBuilding target: ${t.target} (${arch})`);
            // just a simple separator line
            console.log('-'.repeat(40));

            try {
                const targetModule = require(`./targets/${t.target}.js`);

                const depsOk = targetModule.validateDependencies();
                if (!depsOk) {
                    console.log(`  Skipping ${t.target} — missing dependencies\n`);
                    continue;
                }

                targetModule.prepare(config, arch);
                targetModule.build(config, arch);

                console.log(`  Done!\n`);
            } catch (err) {
                console.error(`  Error: ${err.message}`);
            }
        }
    }

    console.log('\nBuild process complete!');
}

module.exports = { build };