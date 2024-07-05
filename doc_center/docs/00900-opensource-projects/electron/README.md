---
title: electron
---

Electron is a framework for building desktop applications using JavaScript, HTML, and CSS. By **embedding Chromium and Node.js** into its binary

## Quick Start

- `npm init`
- `npm install --save-dev electron`
- main.js, index.html, preload.js

### Package and distribute your application

```bash
npm install --save-dev @electron-forge/cli
npx electron-forge import

npm run make
```

## tutorial

### Debugging from VS Code

```json
{
  "version": "0.2.0",
  "compounds": [
    {
      "name": "Main + renderer",
      "configurations": ["Main", "Renderer"],
      "stopAll": true
    }
  ],
  "configurations": [
    {
      "name": "Renderer",
      "port": 9222,
      "request": "attach",
      "type": "chrome",
      "webRoot": "${workspaceFolder}"
    },
    {
      "name": "Main",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron",
      "windows": {
        "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron.cmd"
      },
      "args": [".", "--remote-debugging-port=9222"],
      "outputCapture": "std",
      "console": "integratedTerminal"
    }
  ]
}
```

### Using Preload Scripts

A BrowserWindow's preload script runs in a context that has access to both the HTML DOM and a **limited subset of Node.js and Electron APIs**

To add features to your renderer that require privileged access, you can define global objects through the **contextBridge** API

```js
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping'),
  // we can also expose variables, not just functions
})
```

```js
const { ipcMain } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  ipcMain.handle('ping', () => 'pong')
  win.loadFile('index.html')
}
```

```js
const func = async () => {
  const response = await window.versions.ping()
  console.log(response) // prints out 'pong'
}

func()
```

### Packaging Your Application

```bash
npm install --save-dev @electron-forge/cli
npx electron-forge import

npm run make
```
