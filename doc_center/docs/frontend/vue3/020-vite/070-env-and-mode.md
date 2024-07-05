# Env Variables and Modes

## Env Variables

Vite exposes env variables on the special `import.meta.env` object.
which are **statically replaced** at build time

- `import.meta.env.MODE`
- `import.meta.env.BASE_URL`
- `import.meta.env.PROD`
- `import.meta.env.DEV`

## .env Files

Vite uses **dotenv** to load additional environment variables from the following files in your environment directory:

```
.env                # loaded in all cases
.env.local          # loaded in all cases, ignored by git
.env.[mode]         # only loaded in specified mode
.env.[mode].local   # only loaded in specified mode, ignored by git
```

To prevent accidentally leaking env variables to the client, only variables prefixed with `VITE_` are exposed to your Vite-processed code

Loaded env variables are also exposed to your client source code via `import.meta.env` as strings

### IntelliSense for TypeScript

you can create an `vite-env.d.ts` in src directory, then augment `ImportMetaEnv` like this

```js
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

## HTML Env Replacement

```html
<h1>Vite is running in %MODE%</h1>
<p>Using data from %VITE_API_URL%</p>
```

## Modes

By default, the dev server (dev command) runs in `development` mode and the build command runs in `production` mode
