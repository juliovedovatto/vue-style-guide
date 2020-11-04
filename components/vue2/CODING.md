# Vue Components

## Coding

### Naming

**Component**

* Use `PascalCase` for their instances.
* Component should have a clear name, so anyone with a quick look can understand its intent.
* Always look to put in subfolders to help organize.
* To call a component, use kebab-cased name over other styles when using it in a template.

**Props Naming**

* Avoid using DOM component prop names.
* Use kebab-case instead of camelCase to provide props in templates.

```js
// good
import HelloWorld from 'HelloWorld.vue' // import using pascal case

export default {
  name: 'ExampleComponent', // pascal case
  components: {
    HelloWorld, // children component is using pascal case as well
  }
  //...
}
```

```html
<!-- bad -->
<exampleComponent myProp="prop" />

<!-- good -->
<example-component my-prop="prop" />
```

**Quotes**

**Always use** double quotes `"` inside templates and single quotes `'` for all other JS.

**Props definition**

* Props **must be** declared as an object.
* For important props, use `required: true`.
* Default key should be provided if the prop is not required. **Always assume a default value**, to help checkings and avoid side-effects.
* To se default value for scalar types (Boolean, String, Number), just use `default: value`. Case default value is an array or object, you should use `default` key as function.
* There is some cases a `validator()` callback is need to enforce property correct usage.
* Props are immutable, **avoid changing it directly**. Mutating a prop locally is now considered an anti-pattern.

```js
export default {
  name: 'ExampleComponent',
  // ...
  props: {
    foo: String,
    bar: {
      type: String
    },
    arr: {
      type: Array,
      default: []
    },
    req: {
      required: true
    }
  }
  // ...
}

// good
export default {
  name: 'ExampleComponent',
  // ...
  props: {
    foo: {
      type: String,
      default: ''
    },
    bar: {
      type: String,
      default: 'baz'
    },
    arr: {
      type: Array,
      default: () => []
    },
    req: {
      required: true,
      type: Object
    }
  }
  // ...
}
```

**Data**

* Data property should always be a function that returns an object with available mutating variables.
* Case you need to mutate something that came from a `prop` declaration, create a data variable to clone property data (by value).


```js
// bad
export default {
  name: 'ExampleComponent',
  // ...
  data: {
    foo: 'bar'
  }
}
```

```js
// good
export default {
  name: 'ExampleComponent',
  // ...
  data() {
    return {
      foo: 'bar'
    }
  }
  // ...
}
```
