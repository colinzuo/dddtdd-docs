
<https://sass-lang.com/documentation/>

## Syntax

The **SCSS** syntax uses the file extension .scss. With a few small exceptions, it’s a superset of CSS, which means essentially all valid CSS is valid SCSS as well. Because of its similarity to CSS, it’s the easiest syntax to get used to and the **most popular**.

support **two types of comments**: comments defined using `/* */` that are (usually) compiled to CSS, and comments defined using `//` that are not.

## Style Rules

Nesting: you can write one style rules inside another.

### Selector Lists

```css
.alert, .warning {
  ul, p {
    margin-right: 0;
    margin-left: 0;
    padding-bottom: 0;
  }
}
```

### Selector Combinators

```css
ul > {
  li {
    list-style-type: none;
  }
}
```

### Property Declarations

First and foremost, a **declaration's value can be any SassScript expression**, which will be evaluated and included in the result

#### Nesting

```css
.enlarge {
  font-size: 14px;
  transition: {
    property: font-size;
    duration: 4s;
    delay: 2s;
  }

  &:hover { font-size: 36px; }
}
```

### Parent Selector

The parent selector, `&`, is a special selector invented by Sass that’s used in nested selectors to **refer to the outer selector**.

### Placeholder Selectors

It looks and acts a lot like a class selector, but it starts with a `%` and it's not included in the CSS output

```css
%toolbelt {
  box-sizing: border-box;
  border-top: 1px rgba(#000, .12) solid;
  padding: 16px 0;
  width: 100%;

  &:hover { border: 2px rgba(#000, .5) solid; }
}

.action-buttons {
  @extend %toolbelt;
  color: #4285f4;
}
```

## Variables

Sass variables are simple: you assign a value to a name that begins with `$`, and then you can refer to that name instead of the value itself.

Sass variables, like all Sass identifiers, **treat hyphens and underscores as identical**

### Default Values

Sass provides the `!default` flag. This assigns a value to a variable only if that variable isn’t defined or its value is null. Otherwise, the existing value will be used

To load a module with configuration, write `@use <url> with (<variable>: <value>, <variable>: <value>)`. The configured values will override the variables’ default values. Only variables written **at the top level** of the stylesheet with a `!default` flag can be configured

### Flow Control Scope

Variables declared in flow control rules have special scoping rules: **they don’t shadow variables at the same level as the flow control rule**. Instead, they just assign to those variables. This makes it much easier to conditionally assign a value to a variable, or build up a value as part of a loop

```css
$dark-theme: true !default;
$primary-color: #f8bbd0 !default;
$accent-color: #6a1b9a !default;

@if $dark-theme {
  $primary-color: darken($primary-color, 60%);
  $accent-color: lighten($accent-color, 60%);
}
```

## Interpolation

wrap an expression in `#{}`

## At-Rules

### `@use` 

loads mixins, functions, and variables from other Sass stylesheets, and combines CSS from multiple stylesheets together.

Stylesheets loaded by `@use` are called **"modules"**

Because `@use` adds namespaces to member names, it’s safe to choose very simple names like `$radius` or `$width` when writing a stylesheet. This is different from the old `@import` rule

```css
// style.scss
@use "src/corners";

.button {
  @include corners.rounded;
  padding: 5px + corners.$radius;
}
```

#### Choosing a Namespace

```css
// style.scss
@use "src/corners" as c;

.button {
  @include c.rounded;
  padding: 5px + c.$radius;
}
```

#### Load Paths

All Sass implementations allow users to provide load paths: **paths on the filesystem that Sass will look in when locating modules**. For example, if you pass `node_modules/susy/sass` as a load path, you can use `@use "susy"` to load `node_modules/susy/sass/susy.scss`

Unlike some other languages, Sass **doesn’t require that you use ./ for relative imports**. Relative imports are always available

#### Partials

Sass files that are only meant to be loaded as modules, not compiled on their own, begin with _ (as in `_code.scss`). These are called **partials**

### `@forward` 

loads a Sass stylesheet and makes its mixins, functions, and variables available when your stylesheet is loaded with the `@use` rule

```css
// _opinionated.scss
@forward 'library' with (
  $black: #222 !default,
  $border-radius: 0.1rem !default
);
```

### `@mixin` and `@include` 

makes it easy to re-use chunks of styles

```css
@mixin square($size, $radius: 0) {
  width: $size;
  height: $size;

  @if $radius != 0 {
    border-radius: $radius;
  }
}

.avatar {
  @include square(100px, $radius: 4px);
}
```

#### Passing Arbitrary Arguments

If you pass a **list followed by ...** as the last argument of an include, its elements will be treated as additional positional arguments. Similarly, a **map followed by ...**

#### Content Blocks

```css
@mixin hover {
  &:not([disabled]):hover {
    @content;
  }
}

.button {
  border: 1px solid black;
  @include hover {
    border-width: 2px;
  }
}
```

### `@extend` 

allows selectors to inherit styles from one another.

```css
.error {
  border: 1px #f00;
  background-color: #fdd;

  &--serious {
    @extend .error;
    border-width: 3px;
  }
}
```

### `@error` 

causes compilation to fail with an error message

- `@warn` prints a warning without stopping compilation entirely
- `@debug` prints a message for debugging purposes

- `@at-root` puts styles within it at the root of the CSS document

### Flow control 

rules like `@if, @each, @for, and @while` control whether or how many times styles are emitted

## Built-In Modules

All built-in module URLs begin with `sass:` to indicate that they're part of Sass itself

```css
@use "sass:color";

.button {
  $primary-color: #6b717f;
  color: $primary-color;
  border: 1px solid color.scale($primary-color, $lightness: 20%);
}
```

- `sass:math` module provides functions that operate on numbers.
- `sass:string` module makes it easy to combine, search, or split apart strings.
- `sass:color` module generates new colors based on existing ones, making it easy to build color themes
- `sass:list` module lets you access and modify values in lists.
- `sass:map` module makes it possible to look up the value associated with a key in a map, and much more
- `sass:selector` module provides access to Sass’s powerful selector engine
- `sass:meta` module exposes the details of Sass’s inner workings
- Global Functions


