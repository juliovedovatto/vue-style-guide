export default {
  rootState({ variable1 }) {
    return variable1
  },
  isLoading({ isLoading }) {
    return isLoading // this will return the current value of the state
  }
}
