const state = {
  collapse: false
}

const mutations = {
  TOGGLE_COLLAPSE: (state) => {
    state.collapse = !state.collapse
  }
}

const actions = {
  toggleCollapse({ commit }) {
    commit('TOGGLE_COLLAPSE')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
