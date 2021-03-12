  
import {get,post} from '@/http/http'

/**
 * 获取订单列表
 */
export const orderLists = data => get('order/lists',data);


/**
 * 获取订单详情
 */
export const orderDetail = data => get('order/detail',data);


/**
 * 修改订单状态
 */
export const orderStatus = data => get('order/status',data);



/**
 * 修改订单状态
 */
export const modifyOrderStatus = data => post('order/modify_status',data);



/**
 * 确认取货
 */
export const pickUp = data => post('order/pickup',data);



/**
 * 配送
 */
export const shippingAdd = data => post('shipping/add',data);


/**
 * 配送
 */
export const shippingEdit = data => post('shipping/edit',data);


/**
 * 获取退单列表
 */
export const returnLists = data => get('return/lists',data);


/**
 * 获取退单详情
 */
export const returnDetail = data => get('return/detail',data);


/**
 * 获取退单详情
 */
export const modifyReturnState = data => get('return/modify_state',data);

/**
 * 获取评价列表
 */
export const commentLists = data => get('comment/lists',data);

/**
 * 获取评价详情
 */
export const commentDetail = data => get('comment/detail',data);