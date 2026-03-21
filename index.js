#!/usr/bin/env node
const { build } = require('./builder');

// parse CLI args
// usage: node index.js [target] [--arch <arch>] [--config <path>]
const args = process.argv.slice(2);

let target = null;
let arch = null;
// default config path, can be overridden with --config flag
let configPath = 'neutralino.config.json';

for (let i = 0; i < args.length; i++) {
    if (args[i] === '--arch' && args[i + 1]) {
        arch = args[++i];
    } else if (args[i] === '--config' && args[i + 1]) {
        configPath = args[++i];
    } else if (!args[i].startsWith('--')) {
        target = args[i];
    }
}

build(target, arch, configPath).catch(err => {
    console.error('Build failed:', err.message);
    process.exit(1);
});