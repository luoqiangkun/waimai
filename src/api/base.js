  
import {get,post} from '@/http/http'

/**
 * 获取桌台列表
 */
export const tableLists = data => get('table/lists',data);

/**
 * 添加桌台
 */
export const tableAdd = data => post('table/add',data);


/**
 * 编辑桌台
 */
export const tableEdit = data => post('table/edit',data);


/**
 * 删除桌台
 */
export const tableDelete = data => post('table/delete',data);


/**
 * 获取桌台类型列表
 */
export const tableTypeLists = data => get('table/type/lists',data);

/**
 * 添加桌台类型
 */
export const tableTypeAdd = data => post('table/type/add',data);


/**
 * 编辑桌台类型
 */
export const tableTypeEdit = data => post('table/type/edit',data);


/**
 * 删除桌台类型
 */
export const tableTypeDelete = data => post('table/type/delete',data);


/**
 * 排队列表
 */
export const queueLists = data => get('queue/lists',data);

/**
 * 取号
 */
export const addQueue = data => post('queue/add',data);


/**
 * 取号
 */
export const editQueue = data => post('queue/edit',data);


/**
 * 获取活动列表
 */
export const activityLists = data => get('activity/lists',data);

/**
 * 获取活动信息
 */
export const activityInfo = data => get('activity/info',data);

/**
 * 添加活动
 */
export const activityAdd = data => post('activity/add',data);


/**
 * 编辑活动
 */
export const activityEdit = data => post('activity/edit',data);


/**
 * 删除活动
 */
export const activityDelete = data => post('activity/delete',data);

/**
 * 活动商品
 */
export const activityCateGoods = data => post('activity/cate_goods',data);

/**
 * 获取服务员列表
 */
export const waiterLists = data => get('waiter/lists',data);

/**
 * 添加服务员
 */
export const waiterAdd = data => post('waiter/add',data);


/**
 * 编辑服务员
 */
export const waiterEdit = data => post('waiter/edit',data);


/**
 * 删除服务员
 */
export const waiterDelete = data => post('waiter/delete',data);



/**
 * 统计
 */
export const analyticsSeller = data => get('analytics/seller',data);

export const analyticsGoods = data => get('analytics/goods',data);

/**
 * 搜索
 */
export const search = data => get('search',data);