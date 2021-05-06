# Performance

## Routing (vue-router)

**Lazy Loading Routes** is an important technique to use in Vue.js. The reason is we can generate a huge bundle when building application and this affects page loading time (download, unpack and interpret code). It is more eficient if we split routes in separated chunk and only load it when route is requested.

1) Vue Async component.

2) Webpack magic comments to use code sppliting feature.


Both combined:

```js
//..
{
  path: '/some/route',
  // ...
  component: import(/* webpackChunkName: "some-alias" */ '@/views/Some/View.vue') // webpack magic comment + Async Component combined
},
//...
```

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


