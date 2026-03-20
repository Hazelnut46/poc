# neutralinojs-builder POC

A proof of concept for the **Neutralinojs Builder** — a GSoC 2026 project idea.

## What is this?

Neutralinojs apps are built using `neu build`, which generates platform-specific binaries. But developers still need to manually create installers (.exe, .deb, 
.dmg) using separate tools. This POC demonstrates the core architecture of a `neu builder` CLI plugin that automates this.

## How it works

1. Reads `neutralino.config.json` for app metadata and builder targets
2. Detects current platform (win/linux/mac) automatically
3. Dynamically loads only the required target module
4. Validates that required packaging tools are installed
5. Runs the build pipeline: prepare → validate → build

## Try it
```bash
node index.js nsis --arch x64     # Windows installer
node index.js deb --arch x64      # Linux .deb package
node index.js appimage --arch x64 # Linux AppImage
node index.js                     # auto-detect platform from config
```

## Output example
```
neutralinojs-builder POC

App: js.devdeck.app v1.0.0

Building target: nsis (x64)
────────────────────────────────────────
  Checking for makensis...
  makensis not found. Install from: https://nsis.sourceforge.io
  Skipping nsis — missing dependencies

Build process complete!
```

## Architecture
```
index.js           ← CLI entry point, parses arguments
builder.js         ← Core orchestration logic
configResolver.js  ← Reads neutralino.config.json
targets/
  nsis.js          ← Windows NSIS installer
  deb.js           ← Linux Debian package
  appimage.js      ← Linux AppImage
  dmg.js           ← macOS disk image
```

Each target exports three functions: `validateDependencies()`, `prepare()`, and `build()` — keeping the interface consistent and making it easy to add 
new packaging formats.

## Built for GSoC 2026

This POC was built as part of my GSoC 2026 proposal for the 
[Neutralinojs Builder](https://github.com/neutralinojs/gsoc2026) project idea.
