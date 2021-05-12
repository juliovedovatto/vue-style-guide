# Performance (WIP)

## Routing (vue-router)

**Lazy Loading Routes** is an important technique to use in Vue.js. The reason is we can generate a huge bundle when building application and this affects page loading time (download, unpack and interpret code). It is more eficient if we split routes in separated chunk and only load it when route is requested.

1) Vue Async component.

2) Webpack magic comments to use code sppliting feature.

Example of both combined:

```js
//..
{
  path: '/some/route',
  // ...
  component: import(/* webpackChunkName: "some-alias" */ '@/views/Some/View.vue') // webpack magic comment + Async Component combined
},
//...
```

In addition, it's important to create modular chunk names. Combining routes & nested routes with the same name.

```js
// BAD
{
  path: '/project',
  component: () => import(/* webpackChunkName: "project" */ '@/views/Project/Base.vue'),
  meta: {
    requiresAuth: true
  },
  children: [
    {
      path: '',
      name: 'project.base',
      redirect: { name: 'home' }
    },
    {
      path: 'create',
      name: 'project.create',
      component: () => import(/* webpackChunkName: "project-create" */ '@/views/Project/Create.vue')
    },
    {
      path: ':id/setup',
      name: 'project.setup',
      component: () => import(/* webpackChunkName: "project-setup" */ '@/views/Project/Setup.vue')
    },
    {
      path: ':id',
      name: 'project.detail',
      component: () => import(/* webpackChunkName: "project-details" */ '@/views/Project/ProjectDetail.vue')
    },
    {
      path: '*',
      redirect: { name: 'home' }
    }
  ]
}

// GOOD
{
  path: '/project',
  component: () => import(/* webpackChunkName: "project" */ '@/views/Project/Base.vue'),
  meta: {
    requiresAuth: true
  },
  children: [
    {
      path: '',
      name: 'project.base',
      redirect: { name: 'home' }
    },
    {
      path: 'create',
      name: 'project.create',
      component: () => import(/* webpackChunkName: "project" */ '@/views/Project/Create.vue')
    },
    {
      path: ':id/setup',
      name: 'project.setup',
      component: () => import(/* webpackChunkName: "project" */ '@/views/Project/Setup.vue')
    },
    {
      path: ':id',
      name: 'project.detail',
      component: () => import(/* webpackChunkName: "project" */ '@/views/Project/ProjectDetail.vue')
    },
    {
      path: '*',
      redirect: { name: 'home' }
    }
  ]
}
```

This will improve chunk creation and improving load times and bundle size.

## Creating an `index.js` file for each set of components.

This will help to improve three shaking when bundling.

```js
// src/components/SomeModule/index.js
export { default as SomeComponent1 } from './Component1.vue'
export { default as SomeComponent2 } from './Component2.vue'
export { default as SomeComponent3 } from './Component3.vue'
```

```js
import { SomeComponent3 } from '@/components/SomeModule'

// src/views/Some/View.vue
export default {
  components: {
    SomeComponent3
  }
}
```

## Lazy Loading Components

**Prefetching**

```js
components: {
  ModalWindow: () => import(/* webpackPrefetch: true */ './ModalWindow.vue')
}
```

**Async components**

```js
export default {
  components: {
    SomeComponent: () => ({
      component: import('@/components/some/Component.vue'),
      loading: LoadingComponent, // optional
      error: ErrorComponent, // optional, but useful to improve
      // The error component will be displayed if a timeout is
      // provided and exceeded. Default: Infinity.
      timeout: 3000
    })
  }
}
```

## Other Performance Tips

* Focus on code spplitting, creating separated exports for helpers, constants or any other functionality that you will need to import.
* Avoid importing a whole package to use just few methods.

```js
// BAD

// ...
import _ from 'lodash' // importing all available methods from lodash library - BAD
// ...

export function nestedSort(items, options = { key: 'order', type: 'asc' }) {
  return _.orderBy(_.map(items, i => nestedSort(i)), options.key, options.type)
}

// GOOD

// ...
import { map, orderBy } from 'lodash' - // importing just specific methods that will be used - Good
// ...

export function nestedSort(items, options = { key: 'order', type: 'asc' }) {
  return orderBy(map(items, i => nestedSort(i)), options.key, options.type)
}
```

* When dealing with larger objects, avoid using watcher `deep` property. Using `deep` watchers can be expensive if they’re watching a large data structure. They need to register a dependency against everything in the data structure, which can take time. Case you need to watch deep objects, you can use `Proxy` or `observable-slim` package.
* Restricting reactivity using `Object.freeze`. By default, Vue recursively observes every object property and this task can be memory-consuming. When dealing with Store, this can be useful.

<script src="https://gist.github.com/Kasheftin/64723fb1e5cf32c332ef4e50c5eafebd.js"></script>

* Vuex: avoid using Functional Getters. Functional Getters are not cached and will run same function everytime it is called. Give preference to use basic getters, then work logic in the component/function.

```js
// BAD

// Vuex
getters: {
  itemByIds: ({ items }) => {
    return (itemId) => state.items.find(item => item.id === itemId)
  }, {})
}

// component

computed: {
  item() {
    return this.$store.getters.itemsByIds(this.itemId)
  }
}

// GOOD

// Vuex
getters: {
  itemByIds: ({ items }) => {
    return items.reduce((out, item) => {
      out[item.id] = item
      return out
    }, {}) // this getter will be cached
  }
}

// Component
computed: {
  item () { return this.$store.getters.itemsByIds[this.itemId] }
}
```
