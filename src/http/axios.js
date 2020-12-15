
import axios from 'axios'


// request interceptor
axios.interceptors.request.use(
  config => {
    // do something before request is sent
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => { 
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据 
    // 否则的话抛出错误
    if (response.status === 200) {  
      return Promise.resolve(response); 
    } else {  
      return Promise.reject(response); 
    }  
  },
  error => {  
   if (error.response.status) {  
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          router.replace({   
              path: '/login',   
              query: { 
                redirect: router.currentRoute.fullPath 
              }
            });
          break;
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面  
        case 403:
          break;
        // 404 找不到页面
        // 跳转登录页面 
        case 404:
          break;
        default:
          return Promise.reject(error.response);
      }
   } 
  }
)

export default axios