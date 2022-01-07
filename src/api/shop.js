
import {get,post} from '@/http/http'


/**
 * 获取店铺信息
 */
export const storeInfo = data => get('store/self',data);

/**
 * 检查店铺状态
 * @param data
 * @returns {*}
 */
export const storeCheck = data => get('store/check',data);


/**
 * 编辑店铺信息
 */
export const storeEdit = data => post('store/edit',data);


/**
 * 编辑店铺信息
 */
export const storeOpen = data => post('store/open',data);


/**
 * 获取店铺配置
 */
export const storeConfig = data => get('store/config/info',data);

/**
 * 编辑店铺配置
 */
export const storeConfigSave = data => post('store/config/save',data);

/**
 * 编辑
 */
export const storeConfiglogo = data => post('store/config/logo',data);
