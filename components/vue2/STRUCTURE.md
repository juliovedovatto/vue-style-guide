# Vue Components

## Structure

Nowadays, makes more sense do use SFC structure (https://vuejs.org/v2/guide/single-file-components.html) instead *old school* Vue component syntax.

```html
<template>
<!-- templating goes here -->
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
