# Vue Components

## Lifecycle Hooks

### Lifecycle Hooks must be ordered, to allow quick compreension of component cicle.

```js
// Wrong
export default {
  //...
  destroyed() {

  },
  mounted() {

  }
  //...
}

// Correct
// We now can quickly understand that the component has mounted and destroyed lifecycle hooks attached
export default {
  //...
  beforeCreate() {
    // most situation this hook is useless, becuase there is no component instance available yet
  },
  created() {
    // good to fetch some necessary data or set default values

    // good use: create an Observer
  },
  beforeMount() {
    // good to prepare component before it finishes mounting, case you don't need to access this.$el instance
  },
  mounted() {
    // good to use when we need to trigger something after component is mounted. Use with caution to not overload same hook with a lot of stuff.
  },
  beforeUpdate() {
    // used to trigger somethign when data changes. but some cases using a watcher is a better choice.
  },
  updated() {
    // used to trigger something after re-render - not commonly used. You should avoid
  },
  beforeDestroy() {
    // destroy/detach something from the component before component is removed from Virtual DOM
    // you should rely on this hook when you need to detach an observer or destroy an instance of something
  },
  destroyed() {
    // called after component is completely removed
    // you should avoid to use this to avoid some side-effects when trying to clean
  }
  //...
}
```

**Diagram:** https://vuejs.org/images/lifecycle.png

### Always prefer to use `beforeMount` and `beforeDestroy` hooks

If you have some preparations to do before mounting/destroying component, so using this hooks is best recommented. This way we can avoid some side-effect situations before attaching/removeing something from component.

**Notes:**

* If there is some DOM situations that we need to wait for something, so we should use `mounted` lifecycle hook
* If you need to prepare something at component initilization level and need to access `vm.$el` instance, it is good to use `mounted` hook instead.


