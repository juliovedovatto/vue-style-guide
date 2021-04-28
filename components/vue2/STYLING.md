# Vue Components

## Styling

* JSS or any other CSS-in-JS solution are strongly discouraged.
  * CSS is not a programming language. You can’t think about it the same way you would think about JavaScript variables/naming and the possible collisions that can happen there.
  * Keeping CSS and JS separated is a good ideia when working with multidisciplinary team.
  * The overhead does not compensate for use.
* Use SASS only.
* Use `scss` as css processor.
* The use of **scoped** CSS is mandatory , It will help component isolation.
* Avoid using id as selectors.
* Use `BEM` (Block - Element - Modifier) naming [methodology](https://en.bem.info/methodology/naming-convention/).
* Avoid `PascalCase` and `snake_case` class naming.
  * `snake_case` is only valid when using BEM syntax.
* Use component name as style scope, in `kebab-case`.
* It is recommended to use some CSS framework or UI framework (Bootstrap, Vuetify, Tailwind/Windi CSS, Material Deisng, etc.)
  * Most of modern CSS/UI Frameworks comes with buil in class helpers, these are extremely useful.
* Using is `stylelint` (https://stylelint.io/) to lint CSS is extremely recommended.

## CSS structure.

* CSS structure should be located under `src/assets/scss`.
* Project will follow [SASS The 7-1 Pattern](https://sass-guidelin.es/#the-7-1-pattern).
* The project bootstramp contains only basic folder structure, it will need to create other folders to follow 7-1 structure.

Example:

```
└── scss
    ├── abstracts
    │   ├── _functions.scss             # functions
    │   ├── _mixins.scss                # mixins
    │   └── _variables.scss             # main variables file
    ├── base
    │   ├── _base.scss                  # Base CSS structure
    │   ├── _colors.scss                # Color CSS classes
    │   ├── _exports.scss               # Export variables/values to JS
    │   ├── _misc.scss                  # Misc Classes
    │   ├── _reset.scss                 # CSS Reset
    │   └── _typography.scss            # Typography classes and @font-face definitons
    ├── vendor                          # Custom vendor CSS files
    └── main.scss                       # Main CSS
```

* `abstracts`: The `abstracts/` folder gathers all Sass tools and helpers used across the project. Every global variable, function, mixin and placeholder should be put in here.
* `base`: The `base/` folder holds what we might call the boilerplate code for the project. In there, you might find the reset file, some typographic rules, and probably a stylesheet defining some standard styles for commonly used HTML elements.
* `vendor`: The `vendor/` folder containing all the CSS files from external libraries and frameworks.
* `main.scss` must contain only includes of the file structure above, avoid writing CSS directly on it. You should import this `.scss` file on top of the Vue entry file.

**Example**

```scss
// main.scss

@import
  'base/reset',
  'base/base',
  'base/typography',
  'base/colors',
  'base/misc';

// in this example, we are importing material design icon pack
@import
  'vendor/material-icons';

// this will be used to access CSS variables from JS
@import 'base/exports';

```

Note: check https://sass-guidelin.es/#main-file for further info.

## CSS in Components

* It is mandatory to encapsulate all CSS inside with a root level class. This will help with component logic and encapsulated CSS.
* Avoid writing too much CSS, use CSS/UI Framework class helpers instead.
  * This will help to solve positioning, spacings, etc.
  * It will help deal with issues of responsiveness.
  * The less CSS you write, the better.


Example, using Bootstrap as CSS framework.

```html
<template>
  <div class="test-component"> <!-- root class definied -->
    <!-- 100% height, flex and will align elements both vertically and horizontally -->
    <div class="h-100 d-flex align-center justify-center">
      <span>{{ message }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TestComponent',
  props: {
    message: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.test-component { /* style scope class */
  height: 300px;

  p {
    color: $color-primary;
    font-size: 120%;
  }
}
</style>
```

##  Styling Child Components

To style child components (or external components), use `::v-depp` [selector](https://vue-loader.vuejs.org/guide/scoped-css.html#child-component-root-elements). Don't use it a lot, use as last resource to impose any different style. If you have to change the style of a component a lot, better create a specific configuration for it (or even create a new one)

#### **`TestComponent.vue`**

```vue
<template>
  <div class="test-component">
    <p>{{ message }}</p>
    <child-test>This is a test</child-test>
  </div>
</template>

<script>
import { ChildTest } from '@/components/Test/ChildTest.vue`

export default {
  name: 'TestComponent',
  components: {
    ChildTest
  },
  props: {
    message: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.test-component { /* style scope class */
  p {
    color: $color-primary;
    font-size: 120%;
  }

  ::v-deep {
    .child-test-component {
      p {
        color: blue;
      }
    }
  }
}
</style>
```
