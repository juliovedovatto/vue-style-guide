# Vue Components

## Vuex

Vuex is a state management pattern + library for `Vue.js` applications. It serves as a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion.

### Structure

```
├── store
│   ├── actions.js        # root actions
│   ├── index.js
│   ├── modules.js        # modules loader
│   ├── mutations.js      # root mutations
│   └── modules
│       ├── [namespaceX].js
│       ├── [namespaceY].js
│       └── [namespaceZ].js
```

```js
// store/index.js
import * as modules from '@/store/modules'

import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import modules from './modules'
import mutations from './mutations'

Vue.use(Vuex)

export const initialState = () => ({
  // root states goes here
  // camelCase
  variable1: value,
  variable2: value,
  //...
})

export default new Vuex.Store({
  state: initialState(),
  mutations,
  actions,
  modules
})

```

### Modules

The `module.js` file shuld contain all available modules listed. `require.context` webpack function is used to dynamically load these modules and retorn an object containing `module name => module object`

```js
// store/modules.js

const moduleFiles = require.context('./modules/', false, /.+\.js$/i)
const moduleNames = moduleFiles.keys().map(k => k.replace(/^\.\/(.+)\.js$/, '$1'))
const modules = moduleFiles.keys().map(k => moduleFiles(k).default)

export default moduleNames.reduce((result, current, index) => {
  return (result[current] = modules[index]), result
}, {})

```

### Vuex Modules: File Naming

* Be consice when naming a module, since the name will be the namespace of the module.
* Module name should be `camelCase`
* Keep it simple: use a single word to defined module.
  * Examples: `users.js`, `auth.hs`, `project.js`

### Vuex Modules: Structure

Suggested module code structure.

```js
// store/modules/modulaA.js

export const initialState = () => {
  // camaelCase props
  return {
    variable1: value,
    variable2: value,
    variable3: value
  }
}

export default {
  namespace: true, // always TRUE
  state: initialState(),
  getters: {
    // camelCase
  },
  actions: {
    // camelCase
    reset({ commit }) {
      commit('reset')
    }
  },
  mutations: {
    // camelCase
    reset(state) {
      Object.entries(initialState()).forEach(([k, v]) => state[k] = v)
    }
  }
}
```

Alternatively, you can define properties as `const`, then just exporting the combined object.

```js
// store/modules/modulaA.js
export const initialState = () => {
  // camaelCase props
  return {
    variable1: value,
    variable2: value,
    variable3: value
  }
}

// State object
const state = initialState()

// Getter functions
const getters = {
  // ...
}

// Actions
const actions = {
  // ...
  reset({ commit }) {
    commit('reset')
  }
}

// Mutations
const mutations = {
  reset(state) {
    Object.entries(initialState()).forEach(([k, v]) => state[k] = v)
  }
}

export default {
    namespaced: true,  // always TRUE
    state,
    getters,
    actions,
    mutations
}
```

**Notes:**

* Avoid mixing modules using the two structures mentioned above. It is recommended to choose one of the proposed convetions and follow only one. In this way it will facilitate reading and maintenance.
* There is no real gain to create a mutations type file to export mutations names variables. It is better just define the name of the mutation in the vuex object.
* Avoid using all caps to name methods, this can leave a trail of complex names to use. The `state` properties, `getters`, `actions` and `mutations` functions **must** be named using `camelCase`.
* `mutations` methods **must be** synchronous, while `actions` methods can be asynchronous (https://vuex.vuejs.org/guide/mutations.html#mutations-must-be-synchronous)
* All modules must contain a way to `reset` state.
  * It is quite common to have a reset feature when you have user authentication in your application so that you can reset the store when the user logs out, for example.

```js
// Vue Component

// BAD
// ...
import { MODULE_ACTION_NAME } from '@/store/mutation-types.js'

// MODULE_ACTION_NAME => module/SOME_ACTION

// ...
await this.$store.dispatch(MODULE_ACTION_NAME)
```

```js
// Vue Component
// ...
// GOOD
await this.$store.dispatch('module/someAction')
// ...
```

### Global module state reset

Global Store should contain a method to reset the entire store. This is very useful if you need to wipe data stored.

```js
// store/actions.js
import modules from './modules'

export default {
  // ...
  reset({ commit }) {
    commit('reset')
    Object.keys(modules).forEach(m => commit(`${m}/reset`))
  }
  // ...
}
```

```js
// store/mutations.js
import { initialState } from './index'

export default {
  // ...
  reset(state) {
    Object.entries(initialState()).forEach(([k, v]) => state[k] = v)
  }
  // ...
}
```

**Note:** check `tests/vue2/vuex/default` project for further reference.

### Vuex in Components

* Do not call a `mutation` **directly**. For every mutation, create a respective `action`, to commit a mutation. It will keep consistency throughout the application.
* Using `mapState` is strongly disengouraged.
* Don't access `state` directly, use `getters` instead. Getters allows to create custom functions, case needs to retrieve a particular value.
* Use `mapGetters` to map state data to computed properties - https://vuex.vuejs.org/guide/getters.html

```html
<template>
  <div class="user-details">
    <span>Hello, {{ name }} 👋🏻</span>
  </div>
</template>

<script>
export default {
  name: 'UserDetails',
  // ...
  computed: {
    ...mapGetters('user', ['info']), // we are mapping "info" getter to a computed property with the same name.
    name() {
      return this.info?.name || 'Guest'
    }
  },
  //...
}
</script>

<style lang="scss" scoped>
.user-details {
/** CSS GOES HERE **/
}
</style>
```

```js
// store/modules/uer.js
export default {
  namespaced: true,
  state: {
    data: {},
    // ...
  },
  getters: {
    info({ data }) {
      return data
    },
    //....
  },
  actions: {
    //....
  },
  mutations: {
    //...
  }
}
```

In the example above, a getter method was created to return user data stored in the state. In the meantime in the user details component, we are mapping the getter method to a computed property, with the same name.

With this approach, the component code is cleaner and easier to read and update.

### Testing

TODO

### Notes

TODO

