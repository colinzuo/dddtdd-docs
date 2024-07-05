# Form Input Bindings

v-model can be used on inputs of different types, `<textarea>`, and `<select>` elements. It automatically expands to different DOM property and event pairs based on the element it is used on

- `<input>` with text types and `<textarea>` elements use `value property` and `input event`
- `<input type="checkbox">` and `<input type="radio">` use `checked property` and `change event`
- `<select>` uses value as a prop and change as an event

```html
<input
  :value="text"
  @input="event => text = event.target.value">

<input v-model="text">
```

## Basic Usage

### Text

```html
<p>Message is: {{ message }}</p>
<input v-model="message" placeholder="edit me" />
```

### Multiline text

```html
<span>Multiline message is:</span>
<p style="white-space: pre-line;">{{ message }}</p>
<textarea v-model="message" placeholder="add multiple lines"></textarea>
```

### Checkbox

```html
<input type="checkbox" id="checkbox" v-model="checked" />
<label for="checkbox">{{ checked }}</label>

<div>Checked names: {{ checkedNames }}</div>

<input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
<label for="jack">Jack</label>

<input type="checkbox" id="john" value="John" v-model="checkedNames" />
<label for="john">John</label>

<input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
<label for="mike">Mike</label>
```

### Radio

```html
<input type="radio" id="one" value="One" v-model="picked" />
<input type="radio" id="two" value="Two" v-model="picked" />
```

### Select

```html
<select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>

<select v-model="selected">
  <option v-for="option in options" :value="option.value">
    {{ option.text }}
  </option>
</select>
```

## Value Bindings

using `v-bind` allows us to bind the input value to non-string values

```html
<select v-model="selected">
  <!-- inline object literal -->
  <option :value="{ number: 123 }">123</option>
</select>
```
