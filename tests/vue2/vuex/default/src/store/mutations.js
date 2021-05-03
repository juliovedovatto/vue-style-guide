import { initialState } from './index'
import { resetStore } from './helpers'

export default {
  startLoading(state) {
    state.isLoading = true // will change "isLoading" root state
  },
  stopLoading(state) {
    state.isLoading = false // will change "isLoading" root state
  },
  setRootState(state, value) {
    state.variable1 = value
  },
  reset(state) {
    resetStore(state, initialState())
  }
}
