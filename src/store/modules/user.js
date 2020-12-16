import { setLocalStorage,getLocalStorage,delLocalStorage} from '@/utils/storage'
import { login,getInfo,logout } from '@/api/user'

const state = {
  user: {
    uid:'',
    name: '',
    avatar: '',
    rid:0 ,
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
  SET_RID: (state, rid) => {
    state.user.rid = rid
  },


  CLEAR_UID: (state) => {
    state.user.uid = 0
  },
  CLEAR_NAME: (state) => {
    state.user.name = ''
  },
  CLEAR_AVATAR: (state) => {
    state.user.avatar = ''
  },
  CLEAR_RID: (state) => {
    state.user.rid = 0
  },
}

const actions = {
   // user login
  login({ commit }, userInfo) {
    const { user_account, user_password } = userInfo
    return new Promise((resolve, reject) => {
      login({ user_account: user_account, user_password: user_password }).then(res => {
        if( res.status == 200 ){

          const { uid, name, avatar, rid,ukey } = res.data

          if( rid !== 2 ){
            return reject('无访问权限')
          }
          
          commit('SET_NAME', name)
          commit('SET_AVATAR', avatar)
          commit('SET_RID', rid)
          commit('SET_UID', uid )

          setLocalStorage('uid',uid,24 * 365 * 5 )
          setLocalStorage('ukey',ukey,24 * 365 * 5 )
          
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
    
          if( rid !== 2 ){
            return reject('无访问权限')
          }

          commit('SET_NAME', name)
          commit('SET_AVATAR', avatar)
          commit('SET_RID', rid)
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

        commit('CLEAR_NAME')
        commit('CLEAR_AVATAR')
        commit('CLEAR_RID')
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
