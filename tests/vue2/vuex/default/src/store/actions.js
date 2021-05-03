import modules from './modules'

export default {
  startLoading({ commit }) {
    commit('startLoading') // will call root mutation "startLoading"
  },
  stopLoading({ commit }) {
    commit('stopLoading') // will call root mutation "stopLoading"
  },
  setRootState({ commit }, value) {
    commit('setRootState', value)
  },
  reset({ commit }) {
    commit('reset')
    Object.keys(modules).forEach(m => commit(`${m}/reset`))
  }
}
