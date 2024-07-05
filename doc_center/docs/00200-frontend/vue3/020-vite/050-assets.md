# Static Asset Handling

## Importing Asset as URL

```js
import imgUrl from './img.png'
document.getElementById('hero-img').src = imgUrl
```

For example, imgUrl will be `/img.png` during development, and become `/assets/img.2d8efhg.png` in the production build.

## The public Directory

you can place the asset in a special public directory under your project root. Assets in this directory will be served at root path `/` during dev, and copied to the root of the `dist` directory as-is.

The directory defaults to `<root>/public`, but can be configured via the `publicDir` option.
