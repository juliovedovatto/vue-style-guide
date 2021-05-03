import { resetStore } from "../helpers"

export const initialState = () => ({
  value: 0
})

export default {
  namespaced: true, // mandatory
  state: initialState(),
  getters: {
    value({ value }) {
      return value
    }
  },
  actions: {
    add({ commit }) {
      commit('increase')
    },
    remove({ commit }) {
      commit('decrease')
    },
    reset({ commit }) {
      commit('reset')
    }
  },
  mutations: {
    increase(state) {
      state.value++
    },
    decrease(state) {
      state.value--
    },
    reset(state) {
      resetStore(state, initialState())
    }
  }
}
