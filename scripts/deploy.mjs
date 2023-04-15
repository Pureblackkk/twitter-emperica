#!/usr/bin/env zx

const remoteServerHost = '' // Your host
const remoteServerIP = '' // Your IP
const remoteServerFolder = '' // The folder where your project locates;

// Cd to the root of project
await cd('..');

// Get current project name
const projectName = path.basename(path.resolve(__dirname, '..'));

// Remove old bundle
if (fs.existsSync(`${projectName}.tar.zst`)) {
    await $`rm -f ${projectName}.tar.zst`;
    await $`echo remove existed bundle file`;
}

// Bundle empirica
await $`empirica bundle`;

// // Copy to remote server
await $`scp ${projectName}.tar.zst ${remoteServerHost}@${remoteServerIP}:~/${remoteServerFolder}`;

