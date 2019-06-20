
const state = {
  a: ''
}

const getters = {}

const actions = {
  setA({ commit, state }, paylod){
    commit('setAstate', paylod)
  }
}

const mutations = {
  setAstate(state, n){
    state.a = n
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}