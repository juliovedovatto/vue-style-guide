# Vue Components

## Structure

Nowadays, makes more sense do use SFC structure (https://vuejs.org/v2/guide/single-file-components.html) instead *old school* Vue component syntax.

## Naming

* **Concise:** not over specific, not overly abstract.
* Short: 1 to 3 words.
* Pronounceable: we want to be able to talk about them.
* Avoid naming using html tags.
  * Bad: `<form :data="data" />`
  * Good: `<user-form :data="data" />`
* Component name should be in `PascalCase`.
* File name and component name needs to have the same name. This will help find it easily.

### Ordering

Follow default Vue recommendation.

```html
<template>
</template>

<script>
</script>

<style scoped>
</style>
```

```html
<template>
<!-- templating goes here -->
</template>

<script>
export default {
  name: 'HelloWorld', // name property is mandatory
  components: {} // children components
  props: {}, // component properties, immutable
  data() { return {} }, // data properties, mutable
  computed() {}, // dinamic properties, reactive
  watch: {}, // triggers for properties (props, data or computed)
  // life cycle methods, check LIFECYCLE.md for further info
  methods() {} // default component methods
}
</script>

<!-- Use "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* CSS Rules Goes Here */
</style>
```

### Recommended use:

* PUG is **mandatory** to write HTML inside template part
* CSS Scoped **only**
* SASS use is **mandatory** to write CSS
* It is **mandatory** to wrap template with a class that describes component name.
* If you need to change child component/third party structure, use `::v-deep` selector (https://vue-loader.vuejs.org/guide/scoped-css.html#deep-selectors)

```html
<template lang="pug">
.hello-world
  //- component html goes here, pug style
</template>

<script>
export default {
  name: 'HelloWorld',
  components: {} // children components
  props: {}, // component properties, immutable
  data() { return {} }, // data properties, mutable
  computed() {}, // dinamic properties, reactive
  watch: {}, // triggers for properties (props, data or computed)
  // life cycle methods, check LIFECYCLE.md for further info
  methods() {} // default component methods
}
</script>

<!-- Use "scoped" attribute to limit SASS to this component only -->
<style lang="scss" scoped>
.hello-world {
  /* Component Scoped SCSS goes here **/
  ::v-deep {
    .child-component {}
    .third-party-content {}
  }
}
</style>

```

### Module based development

*text adapted from: https://github.com/pablohpsilva/vuejs-component-style-guide*

* Always build your app out of small modules which do one thing and do it well.
* A module is a small self-contained part of an application. The Vue.js library is specifically designed to help you create `view-logic` modules.
* Small modules are easier to learn, understand, maintain, reuse and debug. Both by you and other developers.
* Each Vue component (like any module) must be `FIRST`: **Focused** (single responsibility), **Independent**, **Reusable**, **Small** and **Testable**.
* If your component does too much or gets too big, split it up into smaller components which each do just **one thing**.
* Try to keep each component file less than 100 lines of code.
* Ensure your Vue component works in isolation. This will help to improve `DRY` (Don't repeat yourself).


