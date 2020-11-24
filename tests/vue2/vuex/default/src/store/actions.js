export default {
  startLoading({ commit }) {
    commit('startLoading') // will call root mutation "startLoading"
  },
  stopLoading({ commit }) {
    commit('stopLoading') // will call root mutation "stopLoading"
  }
}
