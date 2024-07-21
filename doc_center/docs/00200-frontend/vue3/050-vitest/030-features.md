# Features

- Vite's config, transformers, resolvers, and plugins
- Use the same setup from your app to run the tests!
- Component testing for Vue
- Out-of-the-box TypeScript / JSX support
- ESM first, top level await
- Filtering, timeouts, concurrent for suite and tests
- Chai built-in for assertions + Jest expect compatible APIs
- Tinyspy built-in for mocking
- happy-dom or jsdom for DOM mocking

## Chai and Jest expect Compatibility

[Chai](https://www.chaijs.com/) is built-in for assertions plus [Jest expect](https://jestjs.io/docs/expect)-compatible APIs

## Mocking

[Tinyspy](https://github.com/tinylibs/tinyspy) is built-in for mocking with jest-compatible APIs on `vi` object

```ts
import { expect, vi } from 'vitest'

const fn = vi.fn()

fn('hello', 1)

expect(vi.isMockFunction(fn)).toBe(true)
expect(fn.mock.calls[0]).toEqual(['hello', 1])

fn.mockImplementation(arg => arg)

fn('world', 2)

expect(fn.mock.results[1].value).toBe('world')

```
