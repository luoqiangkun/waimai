const getters = {
	collapse:state => state.setting.collapse,
  	user:state => state.user.user,
  	shop:state => state.shop.shop,
  	orderData: state => state.order.orderData,
	  errorLogs: state => state.errorLog.logs,
	  profile:state => state.profile,
  	auth:state => state.auth,
  	common:state => state.common
}
export default getters
