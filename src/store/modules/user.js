import { setLocalStorage,getLocalStorage,delLocalStorage} from '@/utils/storage'
import { login,getInfo,logout } from '@/api/user'

const state = {
  user: {
    uid:'',
    name: '',
    avatar: ''
  }
}
const mutations = {
  SET_UID: (state, uid) => {
    state.user.uid = uid
  },
  SET_NAME: (state, name) => {
    state.user.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.user.avatar = avatar
  },

  CLEAR_UID: (state) => {
    state.user.uid = 0
  }
}

const actions = {
   // user login
  login({ commit }, userInfo) {
    const { user_account, user_password } = userInfo
    return new Promise((resolve, reject) => {
      login({ user_account: user_account, user_password: user_password }).then(res => {
        if( res.status == 200 ){

          const { user_id, user_account, user_avator,key } = res.data

          commit('SET_NAME', user_account)
          commit('SET_AVATAR', user_avator)
          commit('SET_UID', user_id )

          setLocalStorage('uid',user_id,24 * 365 * 5 )
          setLocalStorage('ukey',key,24 * 365 * 5 )
          
          resolve( res.data )

        } else {
          reject(res.msg)
        }
        
      }).catch(error => {
        reject(error)
      })
    })
  },


  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const data = response.data
        if( response.status === 200 ){
          if (!data) {
           return reject('账号信息有误，请重新登录')
          }
          const { uid, name, avatar, rid } = data
          commit('SET_NAME', name)
          commit('SET_AVATAR', avatar)
          commit('SET_UID', uid )
        } else {
          return reject('账号信息有误，请重新登录')
        }
        resolve(data);
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout().then(response => {
       
        const data = response.data
        commit('CLEAR_UID' )
        delLocalStorage('uid');
        delLocalStorage('ukey');

        resolve(data);
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
