# Quick Start

```bash
npm create vue@latest

cd <your-project-name>
npm install
npm run dev

npm run build
```

- The recommended IDE setup is Visual Studio Code + [Vue - Official extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- More tooling details, including integration with backend frameworks, are discussed in the [Tooling Guide](https://vuejs.org/guide/scaling-up/tooling.html)

Due to security reasons, ES modules can only work over the `http://` protocol, which is what the browsers use when opening pages on the web. In order for ES modules to work on our local machine, we need to serve the index.html over the `http://` protocol, with a local HTTP server
