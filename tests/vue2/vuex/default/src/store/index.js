import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import modules from './modules'
import mutations from './mutations'

Vue.use(Vuex)

console.log(modules)

export default new Vuex.Store({
  state: {
    isLoading: false
  },
  getters,
  mutations,
  actions,
  modules
})
