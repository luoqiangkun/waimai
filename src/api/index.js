import request from '@/utils/axios'

/********************* 会员相关接口开始 **********************/
//用户登陆
export function login(data) {
    return request({
      url: 'account.php?ctl=Login&met=doLogin&typ=json',
      method: 'post',
      data
    })
}

//用户退出
export function logout() {
    return request({
      url: 'account.php?ctl=Login&met=logout&typ=json',
      method: 'post'
    })
}

//获取用户信息
export function userInfo() {
    return request({
      url: 'index.php?ctl=User_Account&met=overview&typ=json',
      method: 'get'
    })
}
/********************* 会员相关接口结束 **********************/

/********************* 首台面板相关接口开始 **********************/

//商家统计
export function sellerData(params) {
    return request({
      url: 'catering?ctl=Analytics&met=sellerData&typ=json',
      method: 'get',
      params
    })
}

//商品数据
export function goodsData(params) {
    return request({
      url: 'catering?ctl=Analytics&met=getGoodsNums&typ=json',
      method: 'get',
      params
    })
}

//全局搜索
export function search(params) {
    return request({
      url: 'catering?ctl=Index&met=search&typ=json',
      method: 'get',
      params
    })
}
/********************* 首台面板相关接口结束 **********************/

/********************* 商品相关接口开始 **********************/
//商品列表
export function goodsLists(params) {
    return request({
      url: 'catering?ctl=Goods_Base&met=lists&typ=json',
      method: 'get',
      params
    })
}

//商品详情
export function goodsInfo(params) {
    return request({
      url: 'catering?ctl=Goods_Base&met=info&typ=json',
      method: 'get',
      params
    })
}

//添加/编辑商品
export function saveGoods(data) {
    return request({
      url: 'catering?ctl=Goods_Base&met=save&typ=json',
      method: 'post',
      data
    })
}

//删除商品
export function delGoods(data) {
    return request({
      url: 'catering?ctl=Goods_Base&met=remove&typ=json',
      method: 'post',
      data
    })
}


//商品分类列表
export function goodsCategoryLists(params) {
    return request({
      url: 'catering?ctl=Goods_Category&met=lists&typ=json',
      method: 'get',
      params
    })
}

//商品分类详情
export function goodsCategoryInfo(params) {
    return request({
      url: 'catering?ctl=Goods_Category&met=info&typ=json',
      method: 'get',
      params
    })
}

//添加商品分类
export function addGodosCategory(data) {
    return request({
      url: 'catering?ctl=Goods_Category&met=add&typ=json',
      method: 'post',
      data
    })
}

//编辑商品分类
export function editGodosCategory(data) {
    return request({
      url: 'catering?ctl=Goods_Category&met=edit&typ=json',
      method: 'post',
      data
    })
}

//删除商品分类
export function delGodosCategory(data) {
    return request({
      url: 'catering?ctl=Goods_Category&met=remove&typ=json',
      method: 'post',
      data
    })
}

//获取商品和分类
export function goodsAndCategory(params) {
    return request({
      url: 'catering?ctl=Goods_Base&met=getCateGoods&typ=json',
      method: 'get',
      params
    })
}


//商品单位列表
export function goodsUnitLists(params) {
    return request({
      url: 'catering?ctl=Goods_Unit&met=lists&typ=json',
      method: 'get',
      params
    })
}

//商品单位详情
export function goodsUnitInfo(params) {
    return request({
      url: 'catering?ctl=Goods_Unit&met=info&typ=json',
      method: 'get',
      params
    })
}

//添加商品单位
export function addGoodsUnit(data) {
    return request({
      url: 'catering?ctl=Goods_Unit&met=add&typ=json',
      method: 'post',
      data
    })
}

//编辑商品单位
export function editGoodsUnit(data) {
    return request({
      url: 'catering?ctl=Goods_Unit&met=edit&typ=json',
      method: 'post',
      data
    })
}

//删除商品单位
export function delGoodsUnit(data) {
    return request({
      url: 'catering?ctl=Goods_Unit&met=remove&typ=json',
      method: 'post',
      data
    })
}

/********************* 商品相关接口结束 **********************/

/********************* 店铺相关接口结束 **********************/

//店铺信息详情
export function storeInfo() {
    return request({
      url: 'catering?ctl=Store_Base&met=info&typ=json',
      method: 'get'
    })
}

//编辑店铺
export function editStore(data) {
    return request({
      url: 'catering?ctl=Store_Base&met=edit&typ=json',
      method: 'post',
      data
    })
}

//编辑店铺营业状态
export function editStore(data) {
    return request({
      url: 'catering?ctl=Store_Base&met=open&typ=json',
      method: 'post',
      data
    })
}

//店铺配置
export function storeConfig() {
    return request({
      url: 'catering?ctl=Store_Config&met=info&typ=json',
      method: 'get'
    })
}

//编辑店铺配置
export function  saveStoreConfig(data) {
    return request({
      url: 'catering?ctl=Store_Config&met=save&typ=json',
      method: 'post',
      data
    })
}

//编辑店铺LOGO
export function  saveStoreLogo(data) {
    return request({
      url: 'catering?ctl=Store_Config&met=logo&typ=json',
      method: 'post',
      data
    })
}

/********************* 店铺相关接口结束 **********************/

/********************* 订单相关接口结束 **********************/

//订单列表
export function orderLists(params) {
    return request({
      url: 'catering?ctl=Order_Base&met=lists&typ=json',
      method: 'get',
      params
    })
}

//订单详情
export function orderDetail(params) {
    return request({
      url: 'catering?ctl=Order_Base&met=detail&typ=json',
      method: 'get',
      params
    })
}

//订单状态列表
export function orderStatus() {
    return request({
      url: 'catering?ctl=Order_Base&met=status&typ=json',
      method: 'get',
    })
}

//修改订单状态
export function  editOrderStatus(data) {
    return request({
      url: 'catering?ctl=Order_Base&met=modifyOrderStatus&typ=json',
      method: 'post',
      data
    })
}

//添加配送信息
export function  addOrderShipping(data) {
    return request({
      url: 'catering?ctl=Order_Shipping&met=add&typ=json',
      method: 'post',
      data
    })
}

//修改配送信息
export function  editOrderShipping(data) {
    return request({
      url: 'catering?ctl=Order_Shipping&met=edit&typ=json',
      method: 'post',
      data
    })
}

//退款退货列表
export function orderReturnLists(params) {
    return request({
      url: 'catering?ctl=Order_Return&met=lists&typ=json',
      method: 'get',
      params
    })
}

//退款退货详情
export function orderReturnDetail(params) {
    return request({
      url: 'catering?ctl=Order_Return&met=detail&typ=json',
      method: 'get',
      params
    })
}

//修改退款退货订单状态
export function  editOrderReturnState(data) {
    return request({
      url: 'catering?ctl=Order_Return&met=modifyReturnState&typ=json',
      method: 'post',
      data
    })
}

//订单评论列表
export function orderCommentLists(params) {
    return request({
      url: 'catering?ctl=Order_Comment&met=lists&typ=json',
      method: 'get',
      params
    })
}

//订单评论详情
export function orderCommentDetail(params) {
    return request({
      url: 'catering?ctl=Order_Comment&met=detail&typ=json',
      method: 'get',
      params
    })
}

/********************* 订单相关接口结束 **********************/

/********************* 活动相关接口结束 **********************/
//活动列表
export function activityLists(params) {
    return request({
      url: 'catering?ctl=Activity_Base&met=lists&typ=json',
      method: 'get',
      params
    })
}

//活动详情
export function activityInfo(params) {
    return request({
      url: 'catering?ctl=Activity_Base&met=info&typ=json',
      method: 'get',
      params
    })
}

//添加活动
export function addActivity(data) {
    return request({
      url: 'catering?ctl=Activity_Base&met=add&typ=json',
      method: 'post',
      data
    })
}

//编辑活动
export function editActivity(data) {
    return request({
      url: 'catering?ctl=Activity_Base&met=edit&typ=json',
      method: 'post',
      data
    })
}

//删除活动
export function delActivity(data) {
    return request({
      url: 'catering?ctl=Activity_Base&met=remove&typ=json',
      method: 'post',
      data
    })
}

//活动详情
export function activityAndCategoryAndGoods(params) {
    return request({
      url: 'catering?ctl=Activity_Base&met=cateGoods&typ=json',
      method: 'get',
      params
    })
}

/********************* 活动相关接口结束 **********************/