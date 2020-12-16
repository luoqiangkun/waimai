
import { settledData } from '@/api'
const state = {
    settledStep:-1
}
const mutations = {
  SET_SETTLED: (state, settled) => {
      let settledStep = 0
      if( settled.store ){
        state.store = settled.store
        settledStep = 1
      }
      if( settled.company ){
        state.company = settled.company
        settledStep = 2
      }
      if( settled.legal ){
        state.legal = settled.legal
        settledStep = 3
      }
      state.settledStep = settledStep
  },
  SET_STEP: (state, settledStep) => {
      state.settledStep = settledStep
  },
}
const actions = {
  // get user info
  settledData({ commit, state }) {
    return new Promise((resolve, reject) => {
        settledData().then(response => {
        const data = response.data
        if( response.status === 200 ){
          if( !Array.isArray(data) ){
            commit('SET_SETTLED', data)
          } else {
            commit('SET_STEP', 0)
          }
        } else {
          reject('请求信息有误')
        }
        resolve(data);
      }).catch(error => {
        reject(error)
      })
    })
  },
  setStep({ commit, state },step){
    commit('SET_STEP', step)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
