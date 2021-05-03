/**
 * Iterates over the state and assigns its initial value
 * @param {object} state
 * @param {object} [initialState={}]
 */
export function resetStore(state, initialState = {}) {
  Object.entries(initialState).forEach(([k, v]) => state[k] = v)
}
