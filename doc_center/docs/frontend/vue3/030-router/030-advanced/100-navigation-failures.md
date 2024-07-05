# Waiting for the result of a Navigation

## Detecting Navigation Failures

If a navigation is prevented, resulting in the user staying on the same page, the resolved value of the `Promise` returned by `router.push` will be a **Navigation Failure**. Otherwise, it will be a **falsy value (usually undefined)**.

```js
const navigationResult = await router.push('/my-profile')

if (navigationResult) {
  // navigation prevented
} else {
  // navigation succeeded (this includes the case of a redirection)
  this.isMenuOpen = false
}
```

```js
import { NavigationFailureType, isNavigationFailure } from 'vue-router'

// trying to leave the editing page of an article without saving
const failure = await router.push('/articles/2')

if (isNavigationFailure(failure, NavigationFailureType.aborted)) {
  // show a small notification to the user
  showToast('You have unsaved changes, discard and leave anyway?')
}
```
