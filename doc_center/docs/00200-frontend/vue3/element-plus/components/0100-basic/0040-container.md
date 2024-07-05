
## container.vue

### 设置 section attribute

```html
  <section :class="[ns.b(), ns.is('vertical', isVertical)]">
    <slot />
  </section>
```

## packages\theme-chalk\src\container.scss

```css
@include b(container) {
  display: flex;
  flex-direction: row;
  flex: 1;
  flex-basis: auto;
  box-sizing: border-box;
  min-width: 0;

  @include when(vertical) {
    flex-direction: column;
  }
}
```

## aside.vue

### 设置 aside attribute

一个是class name，一个是width对应css变量

```html
  <aside :class="ns.b()" :style="style">
    <slot />
  </aside>
```  

## packages\theme-chalk\src\aside.scss

```css
@include b(aside) {
  overflow: auto;
  box-sizing: border-box;
  flex-shrink: 0;
  width: var(#{getCssVarName('aside', 'width')}, 300px);
}
```

## header.vue

### 设置 header attribute

一个是class name，一个是height对应css变量

```html
  <header :class="ns.b()" :style="style">
    <slot />
  </header>
```  

## packages\theme-chalk\src\header.scss

```css
@include b(header) {
  @include set-component-css-var('header', $header);

  padding: getCssVar('header-padding');
  box-sizing: border-box;
  flex-shrink: 0;
  height: getCssVar('header-height');
}
```

## main.vue

### 设置 main attribute

```html
  <main :class="ns.b()">
    <slot />
  </main>
```  

## packages\theme-chalk\src\main.scss

```css
@include b(main) {
  @include set-component-css-var('main', $main);

  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  box-sizing: border-box;
  padding: getCssVar('main-padding');
}
```
