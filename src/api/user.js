  
import {get,post} from '@/http/http'


/**
 * 用户信息
 */
export const getInfo = data => get('info',data);

/**
 * 登录
 */
export const login = data => post('login',data);

/**
 * 退出
 */
export const logout = data => post('logout',data);

