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

export default new Vuex.Store({
  state: {
    // root states goes here
    // camelCase
  },
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

### Modules: File Naming

* Be consice when naming a module, since the name will be the namespace of the module.
* Module name should be `camelCase`
* Keep it simple: use a single word to defined module.
  * Examples: `users.js`, `auth.hs`, `project.js`

### Modules: Structure

```js
// Pascal
export default {
  namespace: true, // always TRUE
  state: {
    // camelCase
  },
  getters: {
    // camelCase
  },
  actions: {
    // camelCase
  },
  mutations: {
    // camelCase
  }
}
```

### Testing

TODO

### Notes

* Do not call a `mutation` **directly**. Always use an `action` to commit a mutation. Doing so will keep consistency throughout the application. Mutations **must be** synchronous, while actions can be asynchronous.
* Don't access `state` directly, use `getters` instead. Getters allows to create custom functions, case needs to retrieve a particular value.
  * use `mapGetters` while creating component computed variables.

