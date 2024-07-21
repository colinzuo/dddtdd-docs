# Test Filtering

## CLI

You can use CLI to filter test files by name

```bash
vitest basic
```

## Specifying a Timeout

You can optionally pass a timeout in **milliseconds** as third argument to tests. The default is **5 seconds**

```ts
import { test } from 'vitest'

test('name', async () => { /* ... */ }, 1000)
```

## Skipping Suites and Tests

```ts
import { assert, describe, it } from 'vitest'

describe.skip('skipped suite', () => {
  it('test', () => {
    // Suite skipped, no error
    assert.equal(Math.sqrt(4), 3)
  })
})

describe('suite', () => {
  it.skip('skipped test', () => {
    // Test skipped, no error
    assert.equal(Math.sqrt(4), 3)
  })
})
```

## Selecting Suites and Tests to Run

Use `.only` to only run certain suites or tests

```ts
// Only this suite (and others marked with only) are run
describe.only('suite', () => {
  it('test', () => {
    assert.equal(Math.sqrt(4), 3)
  })
})
```
