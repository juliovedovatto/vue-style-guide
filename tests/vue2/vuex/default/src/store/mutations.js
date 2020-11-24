export default {
  startLoading(state) {
    state.isLoading = true // will change "isLoading" root state
  },
  stopLoading(state) {
    state.isLoading = false // will change "isLoading" root state
  }
}
