<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <hr />
    <div class="content">
      <h2>Vuex Examples</h2>
      <div class="vuex-test">
        <h3>Loading State</h3>
        <div class="loading" v-if="isLoading">
          <img :src="loadingIcon" alt="Loading..." />
        </div>
        <button type="button" @click.prevent="handleStartLoading">Start Loading</button>
        <button type="button" @click.prevent="handleStopLoading">Stop Loading</button>
      </div>
      <div class="vuex-test">
        <h3>Counter State</h3>
        <h4>Count: {{ countValue }} </h4>
        <button type="button" @click.prevent="handleIncrease"> + </button>
        <button type="button" @click.prevent="handleDecrease"> - </button>
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

import { mapGetters } from 'vuex'
import LoadingIcon from '@/assets/loading.svg'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  computed: {
    ...mapGetters(['isLoading']),
    ...mapGetters({ countValue: 'counter/value' }),
    loadingIcon() {
      return LoadingIcon
    }
  },
  methods: {
    handleStartLoading() {
      this.$store.dispatch('startLoading')
    },
    handleStopLoading() {
      this.$store.dispatch('stopLoading')
    },
    handleIncrease() {
      this.$store.dispatch('counter/add')
    },
    handleDecrease() {
      this.$store.dispatch('counter/remove')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.content {
  width: 700px;
  margin: 0 auto;
}
.vuex-test {
  margin: 0 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #2c3e50;
}
.vuex-test .loading {
  width: 30px;
  margin: 10px auto;
}
.vuex-test .loading img {
  width: 100%;
}
.vuex-test button {
  margin-right: 10px;
}
</style>
