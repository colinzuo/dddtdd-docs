
## getting_started

`https://helm.sh/docs/chart_template_guide/getting_started/`

Template names do not follow a rigid naming pattern. However, we recommend using the extension **.yaml for YAML files and .tpl for helpers**

The `helm get manifest` command takes a release name (full-coral) and prints out all of the Kubernetes resources that were uploaded to the server

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ .Release.Name }}-configmap
data:
  myvalue: "Hello World"
```

The `Release` object is one of the built-in objects for Helm

### debug

When you want to test the template rendering, but not actually install anything, you can use `helm install --debug --dry-run goodly-guppy ./mychart`. This will render the templates. But instead of installing the chart, it will return the rendered template to you so you can see the output

## Built-in Objects

`https://helm.sh/docs/chart_template_guide/builtin_objects/`

- Release: This object describes the release itself. It has several objects inside of it
- Values: Values passed into the template from the values.yaml file and from user-supplied files
- Chart: The contents of the `Chart.yaml` file
- Files: This provides access to all non-special files in a chart
- Capabilities: This provides information about what capabilities the Kubernetes cluster supports
- Template: Contains information about the current template that is being executed

## Values Files

`https://helm.sh/docs/chart_template_guide/values_files/`

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ .Release.Name }}-configmap
data:
  myvalue: "Hello World"
  drink: {{ .Values.favoriteDrink }}
```

`helm install geared-marsupi ./mychart --dry-run --debug`

## Template Functions and Pipelines

`https://helm.sh/docs/chart_template_guide/functions_and_pipelines/`

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ .Release.Name }}-configmap
data:
  myvalue: "Hello World"
  drink: {{ quote .Values.favorite.drink }}
  food: {{ quote .Values.favorite.food }}
```

Template functions follow the syntax `functionName arg1 arg2...`

### Pipelines

pipelines are a tool for chaining together a series of template commands to compactly express a series of transformations

```yaml
  food: {{ .Values.favorite.food | upper | quote }}
```

When pipelining arguments like this, the result of the first evaluation (.Values.favorite.drink) is sent as the **last argument** to the function

### Using the default function

This function allows you to specify a default value inside of the template, in case **the value is omitted**

the default command is perfect for computed values, which cannot be declared inside `values.yaml`

```yaml
drink: {{ .Values.favorite.drink | default (printf "%s-tea" (include "fullname" .)) }}
```

## Template Function List

`https://helm.sh/docs/chart_template_guide/function_list/`

- Logic and Flow Control Functions
- String Functions
- Type Conversion Functions
- Regular Expressions
- Cryptographic and Security Functions
- Date Functions
- Dictionaries and Dict Functions
- Encoding Functions
- Lists and List Functions
- Math Functions
- Float Math Functions
- File Path Functions
- URL Functions
- UUID Functions

## Flow Control

`https://helm.sh/docs/chart_template_guide/control_structures/`

Helm's template language provides the following control structures:

- `if/else` for creating conditional blocks
- `with` to specify a scope
- `range`, which provides a "for each"-style loop

In addition to these, it provides a few actions for declaring and using **named template segments**:

- `define` declares a new named template inside of your template
- `template` imports a named template
- `block` declares a special kind of fillable template area

### If/Else

```yaml
{{ if PIPELINE }}
  # Do something
{{ else if OTHER PIPELINE }}
  # Do something else
{{ else }}
  # Default case
{{ end }}
```

A pipeline is **evaluated as false** if the value is:

- a boolean false
- a numeric zero
- an empty string
- a nil (empty or null)
- an empty collection (map, slice, tuple, dict, array)

### Controlling Whitespace

When the template engine runs, it removes the contents inside of `{{ and }}`, but it leaves the remaining whitespace exactly as is

First, the curly brace syntax of template declarations can be modified with special characters to tell the template engine to chomp whitespace. `{{-` (with the dash and space added) indicates that whitespace should be chomped left, while `-}}` means whitespace to the right should be consumed. Be careful! **Newlines are whitespace!**

### Modifying scope using with

```yaml
{{ with PIPELINE }}
  # restricted scope
{{ end }}
```

```yaml
  {{- with .Values.favorite }}
  drink: {{ .drink | default "tea" | quote }}
  food: {{ .food | upper | quote }}
  {{- end }}
```

we can use `$` for accessing the object Release.Name from the parent scope

`$` is mapped to the root scope when template execution begins and it does not change during template execution

```yaml
  {{- with .Values.favorite }}
  drink: {{ .drink | default "tea" | quote }}
  food: {{ .food | upper | quote }}
  release: {{ $.Release.Name }}
  {{- end }}
```

### Looping with the range action

```yaml
  toppings: |-
    {{- range .Values.pizzaToppings }}
    - {{ . | title | quote }}
    {{- end }} 
```

The `|-` marker in YAML takes a multi-line string

## Variables

`https://helm.sh/docs/chart_template_guide/variables/`

One way to work around scoping issues is to assign objects to variables that can be **accessed without respect to the present scope**

In Helm templates, a variable is a named reference to another object. It follows the form `$name`. Variables are assigned with a special assignment operator: `:=`

```yaml
  {{- $relname := .Release.Name -}}
  {{- with .Values.favorite }}
  drink: {{ .drink | default "tea" | quote }}
  food: {{ .food | upper | quote }}
  release: {{ $relname }}
  {{- end }}
```

Variables are particularly useful in range loops. They can be used on list-like objects to **capture both the index and the value**

```yaml
  toppings: |-
    {{- range $index, $topping := .Values.pizzaToppings }}
      {{ $index }}: {{ $topping }}
    {{- end }}    
```

Variables are normally not "global". They are scoped to the block in which they are declared

However, there is one variable that is always global - `$` - this variable will **always point to the root context**

```yaml
    app.kubernetes.io/name: {{ template "fullname" $ }}
    # I cannot reference .Chart.Name, but I can do $.Chart.Name
    helm.sh/chart: "{{ $.Chart.Name }}-{{ $.Chart.Version }}"
```

## Named Templates

`https://helm.sh/docs/chart_template_guide/named_templates/`

A named template (sometimes called a partial or a subtemplate) is simply a template defined inside of a file, and given a name

An important detail to keep in mind when naming templates: **template names are global**. If you declare two templates with the same name, whichever one is loaded last will be the one used

One popular naming convention is to prefix each defined template with the name of the chart: `{{ define "mychart.labels" }}`

### Partials and _ files

there is file naming convention that deserves mention:

- Most files in `templates/` are treated as if they contain Kubernetes manifests
- The `NOTES.txt` is one exception
- But files whose name begins with an underscore (`_`) are assumed to not have a manifest inside. These files are not rendered to Kubernetes object definitions, but are available everywhere within other chart templates for use.

### Declaring and using templates with define and template

The define action allows us to create a named template inside of a template file

```yaml
{{- define "MY.NAME" }}
  # body of template here
{{- end }}
```

```yaml
{{- define "mychart.labels" }}
  labels:
    generator: helm
    date: {{ now | htmlDate }}
{{- end }}
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ .Release.Name }}-configmap
  {{- template "mychart.labels" }}
```

By convention, define functions should have a simple documentation block (`{{/* ... */}}`) describing what they do

### Setting the scope of a template

```yaml
  {{- template "mychart.labels" . }}
```

### The include function

`template` is an action, and not a function, there is no way to pass the output of a template call to other functions; the data is simply inserted inline

Helm provides an alternative to template that will import the contents of a template into the present pipeline where it can be passed along to other functions in the pipeline

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ .Release.Name }}-configmap
  labels:
{{ include "mychart.app" . | indent 4 }}
data:
  myvalue: "Hello World"
  {{- range $key, $val := .Values.favorite }}
  {{ $key }}: {{ $val | quote }}
  {{- end }}
{{ include "mychart.app" . | indent 2 }}
```

## Accessing Files Inside Templates

`https://helm.sh/docs/chart_template_guide/accessing_files/`

### Basic example

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ .Release.Name }}-configmap
data:
  {{- $files := .Files }}
  {{- range tuple "config1.toml" "config2.toml" "config3.toml" }}
  {{ . }}: |-
        {{ $files.Get . }}
  {{- end }}
```  

## Debugging Templates

`https://helm.sh/docs/chart_template_guide/debugging/`

There are a few commands that can help you debug.

- `helm lint` is your go-to tool for verifying that your chart follows best practices
- `helm template --debug` will test rendering chart templates locally.
- `helm install --dry-run --debug` will also render your chart locally without installing it, but will also check if conflicting resources are already running on the cluster. Setting --dry-run==server will additionally execute any lookup in your chart towards the server.
- `helm get manifest`: This is a good way to see what templates are installed on the server

## YAML Techniques

`https://helm.sh/docs/chart_template_guide/yaml_techniques/`

### Scalars and Collections

According to the [YAML spec](https://yaml.org/spec/1.2.2/), there are two types of collections, and many scalar types

```yaml
map:
  one: 1
  two: 2
  three: 3

sequence:
  - one
  - two
  - three
```

### Strings in YAML

There are three "inline" ways of declaring a string

```yaml
way1: bare words
way2: "double-quoted strings"
way3: 'single-quoted strings'
```

All inline styles must be on one line.

- Bare words are unquoted, and are not **escaped**. For this reason, you have to be careful what characters you use.
- Double-quoted strings can have specific characters escaped with `\`. For example `"\"Hello\", she said"`. You can escape line breaks with `\n`.
- Single-quoted strings are "literal" strings, and do not use the `\` to escape characters. The only escape sequence is '', which is decoded as a single '

In addition to the one-line strings, you can declare multi-line strings

```yaml
coffee: |
  Latte
  Cappuccino
  Espresso  
```

The above will treat the value of coffee as a single string equivalent to `Latte\nCappuccino\nEspresso\n`

Note that the **first line** after the `|` must be correctly indented

### Controlling Spaces in Multi-line Strings

If we want the YAML processor to strip off the trailing newline, we can add a `-` after the `|`

```yaml
coffee: |-
  Latte
  Cappuccino
  Espresso 
```


