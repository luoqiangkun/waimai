import Vue from 'vue'
import Router from 'vue-router'

import login from '@/views/login'
import layout from '@/views/layout'
import dashboard from '@/views/dashboard'
import shop from '@/views/shop'
import table from '@/views/table'
import tableType from '@/views/table/type'

import goods from '@/views/goods'
import goodsManage from '@/views/goods/manage'
import category from '@/views/goods/category'
import unit from '@/views/goods/unit'

import activity from '@/views/activity'
import bargainManage from '@/views/activity/bargainManage'
import reductionManage from '@/views/activity/reductionManage'

import order from '@/views/order'
import orderDetail from '@/views/order/detail'
import returnDetail from '@/views/return/detail'
//import comment from '@/views/comment'
//import commentDetail from '@/views/comment/detail'

import config from '@/views/config'
import waiter from '@/views/waiter'
//import delivery from '@/views/delivery'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  routes: [
    {
      path: '/login/:redirect?',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'layout',
      component: layout,
      redirect: { path: 'dashboard' },
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: dashboard
        },
        {
          path: 'shop',
          name: 'shop',
          component: shop
        },
        {
          path: 'table',
          name: 'table',
          component: table,
          children:[
            {
              path:'tableType',
              name:'tableType',
              component:tableType
            },
          ]
        },
        {
          path: 'tableType',
          name: 'tableType',
          component: tableType
        },
        {
          path: 'goods',
          name: 'goods',
          component: goods,
        },
        {
          path: 'goodsManage/:id?',
          name: 'goodsManage',
          component: goodsManage,
        },
        {
          path: 'category',
          name: 'category',
          component: category,
        },
        {
          path: 'unit',
          name: 'unit',
          component: unit,
        },
        {
          path: 'order',
          name: 'order',
          component: order
        },
        {
          path: 'orderDetail/:id?',
          name: 'orderDetail',
          component: orderDetail,
        },
        {
          path: 'returnDetail/:id?',
          name: 'returnDetail',
          component: returnDetail,
        },
        // {
        //   path: 'comment',
        //   name: 'comment',
        //   component: comment
        // },
        // {
        //   path: 'commentDetail/:id',
        //   name: 'commentDetail',
        //   component: commentDetail
        // },
        {
          path: 'activity',
          name: 'activity',
          component: activity
        },
        {
          path: 'bargainManage/:id?',
          name: 'bargainManage',
          component: bargainManage,
        },
        {
          path: 'reductionManage/:id?',
          name: 'reductionManage',
          component: reductionManage,
        },
        {
          path: 'order',
          name: 'order',
          component: order
        },
        {
          path: 'config',
          name: 'config',
          component: config
        },
        {
          path: 'waiter',
          name: 'waiter',
          component: waiter
        },
        // {
        //   path: 'delivery',
        //   name: 'delivery',
        //   component: delivery
        // }
      ]
    },
  ],
  linkActiveClass: "active"
})