# mocha

Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun. Mocha tests run **serially**, allowing for **flexible and accurate reporting**, while mapping uncaught exceptions to the correct test cases

## INSTALLATION

```bash
npm install --save-dev mocha
```

## GETTING STARTED

```ts
var assert = require('assert');
describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
```

```bash
./node_modules/mocha/bin/mocha.js
```

```json
"scripts": {
  "test": "mocha"
}
```

## RUN CYCLE OVERVIEW

- User (that’s you) executes mocha
- Loads options from config files, if present
- Mocha processes any command-line options provided (see section on configuration merging for details)
- If known flags for the node executable are found:
    + Mocha will spawn node in a child process, executing itself with these flags
    + Otherwise, Mocha does not spawn a child process
- Mocha loads modules specified by --require
    + If a file loaded this way contains known Mocha-specific exports (e.g., root hook plugins), Mocha “registers” these
    + If not, Mocha ignores any exports of a --require’d module
- Mocha validates any custom reporters or interfaces which were loaded via --require or otherwise
- Mocha discovers test files; when given no files or directories, it finds files with extensions .js, .mjs or .cjs in the test directory (but not its children), relative to the current working directory
- The (default) bdd interface loads the test files in no particular order, which are given an interface-specific global context (this is how, e.g., describe() ends up as a global in a test file)
    + When a test file is loaded, Mocha executes all of its suites and finds–but does not execute–any hooks and tests therein.
    + Top-level hooks, tests and suites are all made members of an “invisible” root suite; there is only one root suite for the entire process
- Mocha runs global setup fixtures, if any
- Starting with the “root” suite, Mocha executes:
- Any “before all” hooks (for the root suite, this only happens once; see root hook plugins)
- For each test, Mocha executes:
    + Any “before each” hooks
    + The test (and reports the result)
    + Any “after each” hooks
- If the current suite has a child suite, repeat the steps in 10. for each child suite; each child suite inherits any “before each” and “after each” hooks defined in its parent
- Any “after all” hooks (for the root suite, this only happens once; see root hook plugins)
- Mocha prints a final summary/epilog, if applicable
- Mocha runs global teardown fixtures, if any

## ASSERTIONS

Mocha allows you to use any assertion library you wish. In the above example, we’re using Node.js’ built-in assert module — but **generally, if it throws an Error, it will work!**

## ASYNCHRONOUS CODE

By adding an argument (usually named done) to `it()` to a test callback, Mocha will know that it should **wait for this function to be called** to complete the test

```ts
describe('User', function () {
  describe('#save()', function () {
    it('should save without error', function (done) {
      var user = new User('Luna');
      user.save(function (err) {
        if (err) done(err);
        else done();
      });
    });
  });
});
```

## WORKING WITH PROMISES

Alternately, instead of using the `done()` callback, you may **return a Promise**

```ts
beforeEach(function () {
  return db.clear().then(function () {
    return db.save([tobi, loki, jane]);
  });
});

describe('#find()', function () {
  it('respond with matching records', function () {
    return db.find({type: 'User'}).should.eventually.have.length(3);
  });
});
```

## USING ASYNC / AWAIT

```ts
beforeEach(async function () {
  await db.clear();
  await db.save([tobi, loki, jane]);
});

describe('#find()', function () {
  it('responds with matching records', async function () {
    const users = await db.find({type: 'User'});
    users.should.have.length(3);
  });
});
```

## HOOKS

With its default “BDD”-style interface, Mocha provides the hooks `before()`, `after()`, `beforeEach()`, and `afterEach()`

```ts
describe('hooks', function () {
  before(function () {
    // runs once before the first test in this block
  });

  after(function () {
    // runs once after the last test in this block
  });

  beforeEach(function () {
    // runs before each test in this block
  });

  afterEach(function () {
    // runs after each test in this block
  });

  // test cases
});
```

## DESCRIBING HOOKS

Any hook can be invoked with an optional description, making it easier to pinpoint errors in your tests. If a hook is given a named function, that name will be used if no description is supplied

## ASYNCHRONOUS HOOKS

All hooks (`before()`, `after()`, `beforeEach()`, `afterEach()`) may be sync or async as well, behaving much like a regular test-case

## ROOT-LEVEL HOOKS

A hook defined at the top scope of a test file (outside of a suite) is a **root hook**

## EXCLUSIVE TESTS

The exclusivity feature allows you to run only the specified suite or test-case by appending `.only()` to the function

## INCLUSIVE TESTS

This feature is the inverse of `.only()`. By appending `.skip()`, you may tell Mocha to ignore test case(s). Anything skipped will be marked as pending, and reported as such

You may also skip at runtime using `this.skip()`

To skip multiple tests in this manner, use `this.skip()` in a “before all” hook

## RETRY TESTS

```ts
describe('retries', function () {
  // Retry all tests in this suite up to 4 times
  this.retries(4);

  beforeEach(function () {
    browser.get('http://www.yahoo.com');
  });

  it('should succeed on the 3rd try', function () {
    // Specify this test to only retry up to 2 times
    this.retries(2);
    expect($('.foo').isDisplayed()).to.eventually.be.true;
  });
});
```

## DYNAMICALLY GENERATING TESTS

```ts
const assert = require('assert');

function add(args) {
  return args.reduce((prev, curr) => prev + curr, 0);
}

describe('add()', function () {
  const tests = [
    {args: [1, 2], expected: 3},
    {args: [1, 2, 3], expected: 6},
    {args: [1, 2, 3, 4], expected: 10}
  ];

  tests.forEach(({args, expected}) => {
    it(`correctly adds ${args.length} args`, function () {
      const res = add(args);
      assert.strictEqual(res, expected);
    });
  });
});
```

## TIMEOUTS

```ts
describe('a suite of tests', function () {
  this.timeout(500);

  it('should take less than 500ms', function (done) {
    setTimeout(done, 300);
  });

  it('should take less than 500ms as well', function (done) {
    setTimeout(done, 250);
  });
});
```

## ROOT HOOK PLUGINS

In some cases, you may want a hook before (or after) every test in every file. These are called **root hooks**

A Root Hook Plugin is a JavaScript file loaded via `--require` which “registers” one or more root hooks to be used across all test files

### DEFINING A ROOT HOOK PLUGIN

A Root Hook Plugin file is a script which exports (via `module.exports`) a `mochaHooks` property. It is loaded via `--require <file>`

```ts
// test/hooks.mjs

export const mochaHooks = {
  beforeEach(done) {
    // do something before every test
    done();
  }
};
```

## GLOBAL FIXTURES

At first glance, global fixtures seem similar to root hooks. However, unlike root hooks, global fixtures:

- Are guaranteed to execute once and only once
- Work identically parallel mode, watch mode, and serial mode
- Do not share a context with tests, suites, or other hooks

### GLOBAL SETUP FIXTURES

To create a global setup fixture, export `mochaGlobalSetup` from a script

Global setup fixtures and global teardown fixtures share a context, which means we can add properties to the context object (`this`) in the setup fixture, and reference them later in the teardown fixture

```ts
// fixtures.mjs

// can be async or not
export async function mochaGlobalSetup() {
  this.server = await startSomeServer({port: process.env.TEST_PORT});
  console.log(`server running on port ${this.server.port}`);
}
```

To use it, load this file when running Mocha via `mocha --require fixtures.cjs`

### GLOBAL TEARDOWN FIXTURES

```ts
// fixtures.mjs, cont'd

// can be async or not
export async function mochaGlobalTeardown() {
  await this.server.stop();
  console.log('server stopped!');
}
```

## INTERFACES

Mocha’s “interface” system allows developers to choose their style of DSL. Mocha has **BDD, TDD, Exports, QUnit and Require-style interfaces**

### BDD

The BDD interface provides `describe()`, `context()`, `it()`, `specify()`, `before()`, `after()`, `beforeEach()`, and `afterEach()`.

`context()` is just an alias for `describe()`, and behaves the same way; it provides a way to keep tests easier to read and organized. Similarly, `specify()` is an alias for `it()`

### TDD

The TDD interface provides `suite()`, `test()`, `suiteSetup()`, `suiteTeardown()`, `setup()`, and `teardown()`

```ts
suite('Array', function () {
  setup(function () {
    // ...
  });

  suite('#indexOf()', function () {
    test('should return -1 when not present', function () {
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });
  });
});
```
