<template>
  <div class="hello-world">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>

    <div class="container pt-5 tests">
      <h2>Styling tests</h2>
      <hr />

      <div class="row">
        <div class="col-12 col-md">
            <h3>BEM</h3>

            <div class="buttons">
              <button type="button" class="button">Regular Button</button>&nbsp;
              <button type="button" class="button button--good"><span class="button__icon button__icon--good">&#10003;</span> Good Button</button>&nbsp;
              <button type="button" class="button button--bad"><span class="button__icon button__icon--bad">&#10007;</span> Bad Button</button>&nbsp;
            </div>
        </div>
        <div class="col-12 col-md">
          <h3>Exported Values (JS)</h3>

          <div class="exported-style w-100">
            <div class="text-left font-monospace">
              <pre class="font-small" v-html="exportedStyles" />
            </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import exportedStyle from '@/assets/scss/base/_exports.scss'
import JSONView from 'pretty-print-json'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  computed: {
    exportedStyles() {
      return JSONView.toHtml(exportedStyle)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello-world {
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983; //hardcoded color
  }

  .tests {
    .exported-style {
      pre {
        padding: rem(10px);
        background: $color-secondary;
      }
    }
  }
}
</style>
