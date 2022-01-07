import Cookies from 'js-cookie'
// create WebStorageCache instance.

export function getLocalStorage(key)
{
    return Cookies.get(key);
}

export function setLocalStorage(key, value)
{
    return Cookies.set(key, value, { expires: 7 })
}


export function delLocalStorage(key)
{
    return Cookies.remove(key);
}



// //获取cookie、
// export function getLocalStorage(name) {
//  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
//  if (arr = document.cookie.match(reg))
//   return (arr[2]);
//  else
//   return null;
// }
 
// //设置cookie,增加到vue实例方便全局调用
// export function setLocalStorage (c_name, value, expiredays) {
//  var exdate = new Date();
//  exdate.setDate(exdate.getDate() + expiredays);
//  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
// };
 
// //删除cookie
// export function delLocalStorage (name) {
//  var exp = new Date();
//  exp.setTime(exp.getTime() - 1);
//  var cval = getLocalStorage(name);
//  if (cval != null)
//   document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
// };