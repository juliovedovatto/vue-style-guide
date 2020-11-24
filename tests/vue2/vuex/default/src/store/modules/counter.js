export default {
  namespaced: true, // mandatory
  state: {
    value: 0
  },
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
    }
  },
  mutations: {
    increase(state) {
      state.value++
    },
    decrease(state) {
      state.value--
    }
  }
}
