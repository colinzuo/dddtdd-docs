# Template Syntax

Directives are **prefixed with v-** to indicate that they are special attributes provided by Vue, and as you may have guessed, they apply special reactive behavior to the rendered DOM

## Raw HTML

```html
<p>Using text interpolation: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

## Attribute Bindings

```html
<div v-bind:id="dynamicId"></div>
<div :id="dynamicId"></div>

<!-- same as :id="id" -->
<div :id></div>
```

## Dynamically Binding Multiple Attributes

```js
const objectOfAttrs = {
  id: 'container',
  class: 'wrapper',
  style: 'background-color:green'
}

<div v-bind="objectOfAttrs"></div>
```

## Using JavaScript Expressions

In Vue templates, JavaScript expressions can be used in the following positions:

- Inside text interpolations (mustaches)
- In the attribute value of any Vue directives (special attributes that start with `v-`)

```js
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div :id="`list-${id}`"></div>

<span :title="toTitleDate(date)">
  {{ formatDate(date) }}
</span>
```

## Directives

Directive attribute values are expected to be **single JavaScript expressions** (with the exception of `v-for`, `v-on` and `v-slot`, which will be discussed in their respective sections later)

Some directives can take an "argument", denoted by a colon after the directive name.

Modifiers are special **postfixes denoted by a dot**, which indicate that a directive should be bound in some special way. 

```ts
<p v-if="seen">Now you see me</p>

<a v-bind:href="url"> ... </a>

<a v-bind:[attributeName]="url"> ... </a>

<form @submit.prevent="onSubmit">...</form>
```
