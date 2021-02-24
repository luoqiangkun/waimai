<template>
  <el-aside width="auto" class="aside">
    <el-menu
      :default-active="activeIndex"
      :collapse="collapse"
      background-color="#324157"
      text-color="#fff"
      active-text-color="#FF5C00"
      :unique-opened="uniqueOpened"
      router
      @select="handleSelect"
      class="el-menu-vertical"
    >
      <el-menu-item>
        <img :src="logo" style="width:37px">
        <el-divider direction="vertical"></el-divider>
        <span slot="title" style="font-size:16px">外卖商家系统</span>
      </el-menu-item>

      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-menu-item :index="subItem.index" :key="subItem.index">
                <span slot="title">{{ subItem.title }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'

export default {
  data() {
    return {
      logo:require('@/assets/images/chi.png'),
      activeIndex: 'dashboard',
      uniqueOpened:true,
      items: [
        {
          icon: "el-icon-house",
          index: "/dashboard",
          title: "系统首页"
        },
        {
          icon: "el-icon-takeaway-box",
          index: "/shop",
          title: "店铺管理",
          subs:[
            {
              index: "/shop",
              title: "店铺信息",
            }
          ]
        },
        {
          icon: "el-icon-data-board",
          index: "table",
          title: "桌台管理",

        },
        {
          icon: "el-icon-goods",
          index: "/goods",
          title: "商品管理",
          subs:[
            {
              index: "/goods",
              title: "商品管理"
            },
            {
              index: "/category",
              title: "分类管理"
            },
            {
              index: "/unit",
              title: "单位管理"
            }
          ]
        },
        {
          icon: "el-icon-tickets",
          index: "/order",
          title: "订单管理",
          subs:[
            {
              index: "/order",
              title: "订单管理",
            },
            {
              index: "/return",
              title: "售后管理",
            },
            {
              index: "/comment",
              title: "评价管理",
            }
          ]
        },
        {
          icon: "el-icon-shopping-bag-1",
          index: "/activity",
          title: "营销活动",
          subs:[
            {
              index: "/activity",
              title: "活动管理",
            }
          ]
        },
        {
          icon: "el-icon-setting",
          index: "/config",
          title: "设置管理",
          subs:[
            {
              index: "/config",
              title: "基本设置",
            }
          ]
        },
        {
          icon: "el-icon-user",
          index: "waiter",
          title: "会员管理",
          subs:[
            {
              index: "/waiter",
              title: "角色设置",
            }
          ]
        }
      ]
    };
  },
  computed: {
    ...mapGetters([
      'collapse'
    ]),
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  watch: {
    '$route' () {
      this.handleSelect(this.activeIndex)
    }
  },
  mounted () {
      this.activeIndex = this.$route.matched[0].path || 'dashboard'
  },
  methods: {
    handleSelect (index) {
        this.activeIndex = index
    }
  },
  created() {}
};
</script>

<style>

.aside {
  color: #333;
  height: 100%;
  background-color: rgb(50, 65, 87);
}
.aside .el-menu {
  border-right: 0;
}

.aside .el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.aside .el-menu--collapse{
  width:70px;
}
.aside .el-menu-item,
.aside .el-submenu__title{
  height: 55px;
  line-height: 55px;
}

.aside .el-menu-item i,
.aside .el-submenu__title i{
  color: white;
}


.aside .el-menu-item.is-active i{
  color: #FF5C00 !important;
}

.aside  .is-opened .el-menu-item{
  color: #a9b1b5 !important;
  background-color: #1f2d3d !important;
}
.aside  .is-opened .el-submenu__title{
   color: #a9b1b5;
  background-color: #1f2d3d !important;
}
.aside  .is-opened .el-menu-item:hover{
  color: #a9b1b5 !important;
  background-color: #001528 !important;
}
.aside  .is-opened .el-submenu__title:hover{
   color: #a9b1b5;
  background-color: #001528 !important;
}

.aside .el-menu-item.is-active {
  color: #a9b1b5;
  background-color: #001528 !important;
}


</style>