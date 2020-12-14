const state = {
  orderData:{
    order_id : '',
    order_amount : '0.00',
    order_payment_amount : '',
    order_discount_amount : '',
    items : []
  }
}

const mutations = {
  SET_ORDER_DATA: (state, order) => {
    state.orderData = order
  },
  CLEAR_ORDER_DATA: (state) => {
    state.orderData = {
      order_id : '',
      order_amount : '0.00',
      order_payment_amount : '',
      order_discount_amount : '',
      items : []
    }
  }
}

const actions = {
  setOrderData({ commit }, order) {
    commit('SET_ORDER_DATA', order)
  },
  clearOrderData({ commit }) {
    commit('CLEAR_ORDER_DATA')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
