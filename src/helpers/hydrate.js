const hydrate = (state, action, key, whitelists = []) => {
  let hydrateState = {}
  for (const whitelist of whitelists) {
    const newState = action.payload[key] || {}
    if (newState[whitelist]) {
      hydrateState[whitelist] = newState[whitelist]
    }
  }
  if (typeof window != 'undefined' && !state.hydrated) {
    hydrateState = action.payload[key] || {}
    hydrateState.hydrated = true
  } else if (typeof window == 'undefined') {
    hydrateState = action.payload[key] || {}
  }
  return hydrateState
}

export default hydrate
