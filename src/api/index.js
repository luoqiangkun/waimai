import request from '@/utils/request'

//check
export function check() {
  // return request({
  //   url: 'account.php?ctl=Login&met=doLogin&typ=json',
  //   method: 'post',
  //   data:{redirect:window.location.href}
  // })
  window.location.href =  process.env.API_URL + 'index.php?ctl=Login&met=check&redirect=' + process.env.API_URL;
}

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


//获取首页数据
export function homeData() {
    return request({
      url: 'catering?ctl=Home&met=get',
      method: 'get'
    })
}

//获取用户信息
export function userInfo() {
    return request({
      url: 'index.php?ctl=User_Account&met=overview&typ=json',
      method: 'get'
    })
}

//获取店铺信息
export function storeInfo() {
    return request({
      url: 'index.php?ctl=Store&met=self&typ=json',
      method: 'get'
    })
}

//获取店铺分类
export function storeCategoryLists() {
    return request({
      url: 'catering.php?ctl=Store_Category&met=lists&typ=json',
      method: 'get',
    })
}

//获取店铺入驻悉信息
export function settledData(){
  return request({
    url: 'index.php?ctl=Store&met=settled&typ=json',
    method: 'get',
  })
}

//保存店铺入驻信息
export function settled(data){
  return request({
    url: 'index.php?ctl=Store&met=settled&typ=json',
    method: 'post',
    data
  })
}

//上传地址
export var uploadUrl = process.env.UPLOAD_URL + 'index.php?ctl=Media&met=uploadImage&typ=json'


//底部信息
export function footerData(){
  return request({
    url: 'index.php?ctl=Store&met=footerData&typ=json',
    method: 'get'
  })
}

//帮助分类
export function helpCategoryTree(){
  return request({
    url: 'catering.php?ctl=Help_Category&met=tree&typ=json',
    method: 'get'
  })
}

//帮助列表
export function helpList(params){
  return request({
    url: 'catering.php?ctl=Help_Base&met=lists&typ=json',
    method: 'get',
    params
  })
}

//帮助内容
export function helpDetail(params){
  return request({
    url: 'catering.php?ctl=Help_Base&met=detail&typ=json',
    method: 'get',
    params
  })
}