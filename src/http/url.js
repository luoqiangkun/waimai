const SITEURL = SiteUrl;
const WAPSITEURL = WapSiteUrl;
const APIURL = ApiUrl + '/catering.php';
const ACCOUNTURL = ApiUrl + '/account.php';
const VERSION = 'v1'; 
const SYSURL = {
		'store/info' :APIURL + '?ctl=Store_Base&met=info&typ=json',
		'store/edit' :APIURL + '?ctl=Store_Base&met=edit&typ=json',
		'store/open' :APIURL + '?ctl=Store_Base&met=open&typ=json',
		'store/config/info' : APIURL + '?ctl=Store_Config&met=info&typ=json',
		'store/config/save' : APIURL + '?ctl=Store_Config&met=save&typ=json',
		'store/config/logo' : APIURL + '?ctl=Store_Config&met=logo&typ=json',

		'goods/lists' :APIURL + '?ctl=Goods_Base&met=lists&typ=json',
		'goods/cate_goods' :APIURL + '?ctl=Goods_Base&met=getCateGoods&typ=json',
		'goods/info' :APIURL + '?ctl=Goods_Base&met=info&typ=json',
		'goods/add'  :APIURL + '?ctl=Goods_Base&met=save&typ=json',
		'goods/edit' :APIURL + '?ctl=Goods_Base&met=save&typ=json',
		'goods/delete' : APIURL + '?ctl=Goods_Base&met=remove&typ=json',
		'goods/state' : APIURL + '?ctl=Goods_Base&met=state&typ=json',

		'category/lists' : APIURL + '?ctl=Goods_Category&met=lists&typ=json',
		'category/add' : APIURL + '?ctl=Goods_Category&met=add&typ=json',
		'category/edit' : APIURL + '?ctl=Goods_Category&met=edit&typ=json',
		'category/delete' : APIURL + '?ctl=Goods_Category&met=remove&typ=json',

		'unit/lists' : APIURL + '?ctl=Goods_Unit&met=lists&typ=json',
		'unit/add' : APIURL + '?ctl=Goods_Unit&met=add&typ=json',
		'unit/edit' : APIURL + '?ctl=Goods_Unit&met=edit&typ=json',
		'unit/delete' : APIURL + '?ctl=Goods_Unit&met=remove&typ=json',

		'order/lists' : APIURL + '?ctl=Order_Base&met=lists&typ=json',
		'order/detail' : APIURL + '?ctl=Order_Base&met=detail&typ=json',
		'order/add' : APIURL + '?ctl=Order_Base&met=addOrder&typ=json',
		'order/add_item' : APIURL + '?ctl=Order_Base&met=addItem&typ=json',
		'order/delete_item' : APIURL + '?ctl=Order_Base&met=removeItem&typ=json',
		'order/change_item' : APIURL + '?ctl=Order_Base&met=changeItemQuantity&typ=json',
		'order/status' : APIURL + '?ctl=Order_Base&met=status&typ=json',
		'order/modify_status' : APIURL + '?ctl=Order_Base&met=modifyOrderStatus&typ=json',
		
		'return/lists' :APIURL + '?ctl=Order_Return&met=lists&typ=json',
		'return/detail'  :APIURL + '?ctl=Order_Return&met=detail&typ=json',
		'return/modify_state'  :APIURL + '?ctl=Order_Return&met=modifyReturnState&typ=json',

		'comment/lists' :APIURL + '?ctl=Order_Comment&met=lists&typ=json',
		'comment/detail' :APIURL + '?ctl=Order_Comment&met=detail&typ=json',

		'shipping/add'  :APIURL + '?ctl=Order_Shipping&met=add&typ=json',
		'shipping/edit' :APIURL + '?ctl=Order_Shipping&met=edit&typ=json',
		'table/lists' : APIURL + '?ctl=Table_Base&met=lists&typ=json',
		'table/add' : APIURL + '?ctl=Table_Base&met=add&typ=json',
		'table/edit' : APIURL + '?ctl=Table_Base&met=edit&typ=json',
		'table/delete' : APIURL + '?ctl=Table_Base&met=remove&typ=json',

		'table/type/lists' : APIURL + '?ctl=Table_Type&met=lists&typ=json',
		'table/type/add' : APIURL + '?ctl=Table_Type&met=add&typ=json',
		'table/type/edit' : APIURL + '?ctl=Table_Type&met=edit&typ=json',
		'table/type/delete' : APIURL + '?ctl=Table_Type&met=remove&typ=json',

		'waiter/lists' : APIURL + '?ctl=Store_Waiter&met=lists&typ=json',
		'waiter/add' : APIURL + '?ctl=Store_Waiter&met=add&typ=json',
		'waiter/edit' : APIURL + '?ctl=Store_Waiter&met=edit&typ=json',
		'waiter/delete' : APIURL + '?ctl=Store_Waiter&met=remove&typ=json',

		'activity/lists' : APIURL + '?ctl=Activity_Base&met=lists&typ=json',
		'activity/info' : APIURL + '?ctl=Activity_Base&met=info&typ=json',
		'activity/add' : APIURL + '?ctl=Activity_Base&met=add&typ=json',
		'activity/edit' : APIURL + '?ctl=Activity_Base&met=edit&typ=json',
		'activity/delete' : APIURL + '?ctl=Activity_Base&met=remove&typ=json',
		'activity/cate_goods' : APIURL + '?ctl=Activity_Base&met=cateGoods&typ=json',

		'search':APIURL + '?ctl=Index&met=search&typ=json',

		'info':APIURL + '?ctl=Index&met=info&typ=json',
		//'login':ACCOUNTURL + '?ctl=Login&met=toLogin&typ=json',
		'login':APIURL + '?ctl=Login&met=login&typ=json',
		'logout':APIURL + '?ctl=Login&met=logout&typ=json',
		'register': APIURL + '?ctl=Login&met=register&typ=json',
		'queue/lists' : APIURL + '?ctl=Queue&met=lists&typ=json',
		'queue/add' : APIURL + '?ctl=Queue&met=add&typ=json',
		'queue/edit' : APIURL + '?ctl=Queue&met=edit&typ=json',


		'analytics/seller' : APIURL + '?ctl=Analytics&met=sellerData&typ=json',
		'analytics/goods' : APIURL + '?ctl=Analytics&met=getGoodsNums&typ=json',

		'upload':SITEURL + '?ctl=Media&met=uploadImage&typ=json'
	}

	export {
		SITEURL,
		WAPSITEURL,
		APIURL,
		VERSION,
		SYSURL
	}