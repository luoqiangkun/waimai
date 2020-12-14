const getters = {
	collapse:state => state.setting.collapse,
  	user:state => state.user.user,
  	shop:state => state.shop.shop,
  	orderData: state => state.order.orderData,
  	errorLogs: state => state.errorLog.logs,
}
export default getters
