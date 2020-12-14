import {SYSURL} from './url'
import axios from './axios'
import qs from 'qs'
import { getLocalStorage } from '@/utils/storage'

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params){
	url = SYSURL[url];
	if( !params ){
		params = {};
	}
	if( getLocalStorage('uid') ){
		params.perm_id = getLocalStorage('uid');
	}
	if( getLocalStorage('ukey') ){
		params.perm_key = getLocalStorage('ukey');
	}
  	return new Promise((resolve, reject) =>{ 
 		axios.get(url, {  
  	   		params: params 
 		}).then(res => {
  	   		resolve(res.data);
 		}).catch(err =>{
  	   		reject(err.data) 
 	}) 
  });
}

/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
	url = SYSURL[url];
	if( !params ){
		params = {};
	}
	
	if( getLocalStorage('uid') ){
		params.perm_id = getLocalStorage('uid');
	}
	if( getLocalStorage('ukey') ){
		params.perm_key = getLocalStorage('ukey');
	}
 	return new Promise((resolve, reject) => {
  		axios.post(url, qs.stringify(params))
 	.then(res => {
  		resolve(res.data);
 	})
 	.catch(err =>{
  		reject(err.data)
 	})
 });
}
