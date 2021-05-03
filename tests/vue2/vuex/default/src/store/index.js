import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import modules from './modules'
import mutations from './mutations'

Vue.use(Vuex)

export const initialState = () => ({
  variable1: '',
  isLoading: false
})

export default new Vuex.Store({
  state: initialState(),
  getters,
  mutations,
  actions,
  modules
})
