  
import {get,post} from '@/http/http'

/**
 * 获取商品列表
 */
export const goodsLists = data => get('goods/lists',data);

/**
 * 获取商品详情
 */
export const goodsInfo = data => get('goods/info',data);

/**
 * 添加商品
 */
export const goodsAdd = data => post('goods/add', data);


/**
 * 编辑商品
 */
export const goodsEdit = data => post('goods/edit', data);

/**
 * 删除商品
 */
export const goodsDel = data => post('goods/delete', data);


/**
 * 更改商品状态
 */
export const goodsState = data => post('goods/state', data);

/**
 * 获取商品分类
 */
export const cateLists = data => get('category/lists',data);

/**
 * 获取分类和商品
 */
export const cateGoods = data => get('goods/cate_goods',data);


/**
 * 添加分类
 */
export const cateAdd = data => post('category/add', data);


/**
 * 编辑分类
 */
export const cateEdit = data => post('category/edit', data);

/**
 * 删除分类
 */
export const cateDel = data => post('category/delete', data);

/**
 * 单位列表
 */
export const unitLists = data => post('unit/lists', data);

/**
 * 添加单位
 */
export const unitAdd = data => post('unit/add', data);


/**
 * 编辑单位
 */
export const unitEdit = data => post('unit/edit', data);

/**
 * 删除单位
 */
export const unitDel = data => post('unit/delete', data);