# introduction

[https://vuejs.org/guide/introduction.html](https://vuejs.org/guide/introduction.html)

## Single-File Components

SFC is a defining feature of Vue and is the recommended way to author Vue components

## API Styles

- Options API

With Options API, we define a component's logic using an object of **options such as data, methods, and mounted**

- Composition API

With Composition API, we define a component's logic using **imported API functions**.

In SFCs, Composition API is typically used with `<script setup>`. The **setup attribute is a hint** that makes Vue perform **compile-time transforms** that allow us to use Composition API with less boilerplate. For example, imports and top-level variables / functions declared in `<script setup>` are directly usable in the template.

## Which to Choose?

In fact, the Options API is implemented **on top of the Composition API**!

Go with `Composition API + Single-File Components` if you plan to build full applications with Vue
