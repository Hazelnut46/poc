const fs = require('fs');
const path = require('path');

function resolveConfig(configPath) {
    const fullPath = path.resolve(configPath || 'neutralino.config.json');
    
    if (!fs.existsSync(fullPath)) {
        throw new Error(`Config file not found: ${fullPath}`);
    }

    const config = JSON.parse(fs.readFileSync(fullPath, 'utf8'));

    if (!config.cli?.builder) {
        throw new Error('No builder configuration found in neutralino.config.json');
    }

    return config;
}

function getTargetsForPlatform(config, platform) {
    const builderConfig = config.cli.builder;
    const platformConfig = builderConfig[platform];

    if (!platformConfig) {
        throw new Error(`No builder config found for platform: ${platform}`);
    }

    return platformConfig.targets;
}

module.exports = { resolveConfig, getTargetsForPlatform };