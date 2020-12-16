import { getCookie,setCookie,delCookie} from '@/utils/cookie'
import { login,userInfo,logout } from '@/api'

const state = {
    authToken:''
}
const mutations = {
    SET_AUTH: (state, ukey) => {
        state.authToken = ukey
    },
    CLEAT_AUTH: (state) => {
        state.authToken = ''
    }
}
const actions = {
   // user login
  login({ commit }, data) {
    const { user_account, user_password } = data
    return new Promise((resolve, reject) => {
      login({ user_account: user_account, user_password: user_password }).then(res => {
        if( res.status == 200 ){
          const { uid,key } = res.data
          setCookie('uid',uid,24 * 365 * 5 )
          setCookie('ukey',key,24 * 365 * 5 )
          commit('SET_AUTH', key)
          resolve( res.data )
        } else {
          commit('CLEAT_AUTH')
          reject('登录失败，请重新登录')
        }
        
      }).catch(error => {
        commit('CLEAT_AUTH')
        reject(error)
      })
    })
  },
   // user logout
  logout({ commit, state, dispatch }) {
     return new Promise((resolve, reject) => {
      logout().then(response => {
        delCookie('uid')
        delCookie('uid')
        commit('CLEAT_AUTH')
        resolve(response)
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
