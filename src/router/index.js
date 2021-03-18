import Vue from 'vue'
import Router from 'vue-router'

import login from '@/views/login'
import layout from '@/views/layout/default/'
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
import returnList from '@/views/return'
import returnDetail from '@/views/return/detail'
import comment from '@/views/comment'
import commentDetail from '@/views/comment/detail'

import config from '@/views/config'
import api from '@/views/config/api'

import waiter from '@/views/waiter'
import delivery from '@/views/delivery'
import error404 from '@/views/error/404'

//商家入驻
import Settled from '@/views/settled'
import SettledPrompt from '@/views/settled/prompt'
import SettledStore from '@/views/settled/store'
import SettledCompany from '@/views/settled/company'
import SettledLegal from '@/views/settled/legal'
import SettledResult from '@/views/settled/result'

// //帮助中心
import Help from '@/views/help'
import HelpLists from '@/views/help/lists'
import HelpDetail from '@/views/help/detail'
import HelpCategory from '@/views/help/cate'

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
        {
          path: 'return',
          name: 'return',
          component: returnList
        },
        {
          path: 'comment',
          name: 'comment',
          component: comment
        },
        {
          path: 'commentDetail/:id',
          name: 'commentDetail',
          component: commentDetail
        },
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
          path: 'api',
          name: 'api',
          component: api
        },
        {
          path: 'waiter',
          name: 'waiter',
          component: waiter
        },
        {
          path: 'delivery',
          name: 'delivery',
          component: delivery
        }
      ]
    },
    {
      path:'/settled',
      name:'Settled',
      component: Settled,
      //redirect: '/settled/prompt',
      children:[
        {
          path:'prompt',
          component:SettledPrompt
        },
        {
          path:'store',
          component:SettledStore
        },
        {
          path:'company',
          component:SettledCompany
        },
        {
          path:'legal',
          component:SettledLegal
        },
        {
          path:'result',
          component:SettledResult
        }
      ]
    },
    {
      path:'/help',
      name:'Help',
      component: Help,
      redirect: '/help/lists',
      children:[
        {
          path:'lists/:category_id?/:keyword?',
          component:HelpLists
        },
        {
          path:'detail/:id/:rand?',
          component:HelpDetail
        },
        {
          path:'category',
          component:HelpCategory
        }
      ]
    },
    // 404 page must be placed at the end !!!
    {
      path: '/404',
      component: error404,
      name: 'Page404',
      meta: { 
        title: '404', 
        noCache: true 
      }
    },
    { 
      path: '*', 
      redirect: '/404', 
      hidden: true 
    }
  ],
  linkActiveClass: "active"
})
