
import { storeInfo,storeCheck } from '@/api/shop'
const state = {
  shop: {
    store_id:'',
    store_name: '',
    store_logo: '',
    store_is_open:'',
    store_site_logo:'',
  }
}
const mutations = {
  SET_STORE_ID: (state, store_id) => {
    state.shop.store_id = store_id
  },
  SET_STORE_NAME: (state, store_name) => {
    state.shop.store_name = store_name
  },
  SET_STORE_LOGO: (state, store_logo) => {
    state.shop.store_logo = store_logo
  },
  SET_STORE_IS_OPEN: (state, store_is_open) => {
    state.shop.store_is_open = store_is_open
  },
  SET_STORE_SITE_LOGO: (state, store_site_logo) => {
    state.shop.store_site_logo = store_site_logo
  },
  CLEAR_STORE_ID: (state) => {
    state.shop.store_id = 0
  },
}

const actions = {
  // get shop info
  storeInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      storeInfo().then(response => {
        let data = response.data
        if( response.status === 200 ){
          const { store_id, store_name, store_logo,store_is_open,store_site_logo } = data
          if( store_id ){
            commit('SET_STORE_ID', store_id)
            commit('SET_STORE_NAME', store_name)
            commit('SET_STORE_LOGO', store_logo)
            commit('SET_STORE_IS_OPEN', store_is_open)
            commit('SET_STORE_SITE_LOGO', store_site_logo)
          } else {
            data = {}
          }
          resolve(data)
        } else {
          reject(response.msg)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  setStoreInfo({ commit }, data){
    const { store_id, store_name, store_logo,store_is_open,store_site_logo } = data
    commit('SET_STORE_ID', store_id)
    commit('SET_STORE_NAME', store_name)
    commit('SET_STORE_LOGO', store_logo)
    commit('SET_STORE_IS_OPEN', store_is_open)
    commit('SET_STORE_SITE_LOGO', store_site_logo)
  },
  setStoreIsOpen({ commit }, store_is_open) {
    commit('SET_STORE_IS_OPEN', store_is_open)
  },
  setStoreSiteLogo({ commit }, store_site_logo) {
    commit('SET_STORE_SITE_LOGO', store_site_logo)
  },
  clearStoreId({ commit }) {
    commit('CLEAR_STORE_ID')
  },
  storeCheck({ commit, state }) {
    return new Promise((resolve, reject) => {
      storeCheck().then(response => {
        let data = response.data
        if( response.status === 200 ){
          const { store_id, store_name, store_logo,store_is_open,store_site_logo } = data
          commit('SET_STORE_ID', store_id)
          commit('SET_STORE_NAME', store_name)
          commit('SET_STORE_LOGO', store_logo)
          commit('SET_STORE_IS_OPEN', store_is_open)
          commit('SET_STORE_SITE_LOGO', store_site_logo)
          resolve(data)
        } else {
          reject(response.msg)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
