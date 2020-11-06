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

**Methods**/

* For events, use `handle` prefix.
  * Example: `handleClick`, `handleUser`, `handleSubmit`,.
* For boolean methods, prefix with basic **auxiliar verbs** or **modal verbs**: `is`, `are`, `have`, `has`, `had`, `was`, `were`, `can`, etc
  * Example: `isActive`, `canAccessAdmin`, `hasAdminStatus`.
  * Try to stick with the basic naming when prefixing with these verbs.
* For methods, use imperative grammar, with the intent explicit in the name. So others users can easily understand what the methods do just looking at the name.
  * Example: `saveUser`, `changeStatus`, `doLogin`


### Quotes

**Always use** double quotes `"` inside templates and single quotes `'` for all other JS.

### Props definition

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

### Data

* Data property should always be a function that returns an object with available mutating variables.
* Case you need to mutate something that came from a `prop` declaration, create a data variable to clone property data (by value).
* Props must be in **camelCase**.
* Try to order props alphabetically
* Avoid setting data using external variables/imports. This is **bad** practice.


```js
// bad
export default {
  name: 'ExampleComponent',
  // ...
  data: {
    name: '',
    lastName: '',
    foo: 'bar',
    emailRegex: emailValidator // bad: setting prop using external variable/import
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
      foo: 'bar',
      lastName: '',
      name: ''
    }
  }
  // ...
}
```

### Ordering

**Single File Component (.vue)**

* Follow Vue suggested  tags ordering (template/script/style).

```html
<!-- bad -->
<script [lang]>
  //...
</script>

<template [lang]>
  <!-- -->
</template>

<style [lang][scoped]>
  /*...*/
</style>
```

```html
<!-- good -->
<template [lang]>
  // ...
</template>

<script [lang]>
  // ...
</script>

// We don't use scoped styles but there are few instances of this
<style [lang][scoped]>
  // ...
</style>
```

**Import Order**

* For a better readibility, it is recommended to group in the following order for SFC components (`.vue`).

```js
// npm packages
import Vue from 'vue'
import { merge } from 'lodash'

// helper/general methods
import sortStatuses from '@/some/folder/file'
import Alert from '@/some/folder/file'

// Data Types / General Objects
import UserType from '@/some/folder/model/file'
import { DEFAULT_EMAIL } from '@/some/folder/model/file'

// Vue Components
import StatusDropdown from '@/components/some/folder/file'

// assets
import Logo from '@/assets/logo.svg'

// global variables / contants
const offset = 30
const DEFAULT_SIZE = 30
```

* For pure JS files, it is recommended to sort imports alphabetically. There is an exellent [VSCode plugin](https://marketplace.visualstudio.com/items?itemName=amatiasq.sort-imports) to help this.

```js
// bad
import Vue from 'vue'
import { merge, each } from 'lodash'


// good
import { each, merge } from 'lodash'

import Vue from 'vue'
```

**Properties in Component**

It is suggested to follow the ordering enforced by `vue/order-in-components` (https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/order-in-components.md) linter rule.

Please refer to [STRUCTURE.md](STRUCTURE.md) file to understand the correct properties ordering.

Further reading: https://vuejs.org/v2/style-guide/#Component-instance-options-order-recommended

### Templating

**Attributes/Props Order**

Recoomended order:

1. Unique identificator: `ref`, `key`, `slot`
2. bindings
3. static props
4. DOM attributes
5. Events
6. definitions/list-rendering/conditionals/other `v-` directives. Examples:
   * `v-if/v-else/v-else-if` (use at very end of the element)
   * `v-for` (use at very end of the element)
   * `v-is`/`:is`
   * `v-once`
   * `v-*`

This helps readbility and easy understand how a element will behave.

```html
// bad
<template>
  <div class="foo">
    <list-items class="list-users" list-title="Users" :items="users" />
    <div v-if="isSomething" class="list-details">
      Lorem ipsum sit amet
    </div>
    <div class="another-list">
      <ul class="list">
        <li v-for="item in list" :key="item-${item.id}" class="item">{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>

// good
<template>
  <div class="foo">
    <list-items :items="users" list-title="Users" class="list-users" />
  </div>
  <div class="list-details" v-if="isSomething">
    Lorem ipsum sit amet
  </div>
  <div class="another-list">
    <ul class="list">
      <li :key="item-${item.id}" class="item" v-for="item in list">{{ item.name }}</li>
    </ul>
  </div>
</template>
```

**Note:** this is going in the **wrong-way** of the linter rule [vue/attributes-order](https://eslint.vuejs.org/rules/attributes-order.html) dictates. But for this guide, is advised to group atributes by its intent/meaning instead.

**Use `<template>` tag to use conditional group elements whenever possible**

```html
<template>
  <template v-if="ok">
    <h1>Title</h1>
    <!-- //... -->
  </template>
  <template v-else>
    <h2>Fallback Title</h2>
    <!-- //... -->
  </template>
</template>
```

Further reading: https://vuejs.org/v2/guide/conditional.html#Conditional-Groups-with-v-if-on-lt-template-gt

**Loops**

Using `:key` attribute is *mandatory* to help provide a unique identifier for the element being iterated.

* always try to use a concise (and short) name for the key
* If object being iterated is an array, use the index attribute to compose the name of the key, placing it at the end (suffix).
  * Example: `:v-for="(item, i) from list"`
* If object being iterated is an array, try to use a unique identifier of the object. Avoid use string/number props like name or something like.
* If there is no available unique identifier to use, use `uuid` [npm package](https://www.npmjs.com/package/uuid) to generate one.

```html
// bad
<template>
  <div class="list">
    <ul>
      <li class="item" v-for="item in list">{{ item.name }}</li>
    </ul>
  </div>
</template>

// good (arrays)
<template>
  <div class="list">
    <ul>
      <li :key="`item-${i}`" class="item" v-for="(item, i) in list">{{ item.name }}</li>
    </ul>
  </div>
</template>

// good (objects)
<template>
  <div class="list">
    <ul>
      <li :key="`item-${item.id}`" class="item" v-for="item in list">{{ item.name }}</li>
    </ul>
  </div>
</template>

// good (no unique id available to use)
<template>
  <div class="list">
    <ul>
      <li :key="`item-${generateId()}`" class="item" v-for="item in list">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
//...
import { v1 as uuid } from 'uuid'
//...

export default {
  //...
  methods: {
    generateId() {
      return uuid()
    }
  }
  //...
}
</script>
```

Use `v-for` syntax at end of the element, to help better readibility.

```html
// bad
<template>
  <div class="list">
    <ul>
      <li v-for="item in list" class="item" :key="`item-${item.id}`">{{ item.name }}</li>
    </ul>
  </div>
</template>

// good
<template>
  <div class="list">
    <ul>
      <li :key="`item-${item.id}`" v-for="item in list" v-for="item in list">{{ item.name }}</li>
    </ul>
  </div>
</template>
```

Note: **Do not** use `v-for` and `v-if` [together](https://vuejs.org/v2/guide/list.html#v-for-with-v-if).

**Events: Use `@` shorthand instead `v-on:`**

This will help headbility and write less.

```html
// bad
<template>
  <div class="foo">
    <foo v-on:click="handleClick" />
  </div>
</template>

// good
<template>
  <div class="foo">
    <foo @:click="handleClick" />
  </div>
</template>
```

**Note:** if you need to route events from `parent => child`, you can use `v-on` directive with `$listeners` internal prop.

```html
<template>
  <div class="foo">
    <foo v-on="$listeners" />
  </div>
</template>
```

**Events: use concise event names for custom events**

```html
<template>
  <div class="foo">
    <foo @save-info="handleSaveInfo" />
  </div>
</template>
```

**Events: for native DOM events, always use `.prevent` event modifier.**

Even if there is no need, it is good to use to avoid side-effects

```html
<template>
  <div class="foo">
    <foo @click.prevent="handleSaveInfo" />
  </div>
</template>
```

**Note:** For other event modifies, use with caution. If you need to use them a lot, something is wrong with your logic...

Further reading: https://vuejs.org/v2/guide/events.html#Event-Modifiers
