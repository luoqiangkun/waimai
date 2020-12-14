<template>
  <el-header>
    <div class="collapse"  @click="toggleCollapse">
      <i class="el-icon-s-unfold" v-if="collapse"></i>
      <i class="el-icon-s-fold" v-else></i>
    </div>
    <div class="wrapper">
      <div class="head-seach">
        <el-autocomplete placeholder="请输入内容" size="small" suffix-icon="el-icon-search" v-model="keyword" :fetch-suggestions="querySearchAsync" @select="handleSelect">
          <div slot-scope="scope" class="el-autocomplete__item">
            <span>{{ scope.item.value }}</span>
            <span>{{ scope.item.type }}</span>
          </div>
        </el-autocomplete>
      </div>
      <div class="head-topbar">
        <div class="head-topbar__item">
          <div class="avator">
            <img :src="shop.store_logo" alt="" />
          </div>
           <el-dropdown trigger="click" @command="storeOpen">
            <span class="el-dropdown-link link1">
              {{shop.store_name}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-s-shop" v-if="shop.store_is_open == 2" command="1">开始营业</el-dropdown-item>
              <el-dropdown-item icon="el-icon-remove" v-else command="2">退出营业</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
    
        <div class="head-topbar__item">
          <div class="avator">
            <img :src="user.avatar" alt="" />
          </div>

          <el-dropdown trigger="click" @command="logout">
            <span class="el-dropdown-link">
              {{user.name}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" >
              <el-dropdown-item icon="el-icon-warning" ><span>退出</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
            
      </div>
    </div>
    
  </el-header>
</template>

<script>
import { search } from '@/api/base'
import { storeOpen,storeConfiglogo } from '@/api/shop'
import {SYSURL} from '@/http/url'
import { mapGetters,mapActions } from 'vuex'
export default {
  name: "Header",
  computed: {
    ...mapGetters([
      'user',
      'collapse',
      'shop'
    ]),
  },
  data() {
    return {
      keyword: "",
      uploadUrl:SYSURL.upload
    };
  },
  methods: {
    ...mapActions('setting',[
        'toggleCollapse'
    ]),
    ...mapActions('shop',[
        'storeInfo',
        'setStoreIsOpen',
        'setStoreSiteLogo'
    ]),
    querySearchAsync(queryString, cb) {
      if( !this.keyword ){
        cb([]);
        return;
      }
      search({keyword:this.keyword}).then( res => {
        cb(res.data);
      })
        
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    storeOpen( command ){
      storeOpen({store_is_open:command}).then( res => {
        if( res.status === 200 ){
          this.setStoreIsOpen(res.data.store_is_open);
        }
      })
    },
    handleSelect(item) {
      if( item.type === '商品' ){
        return this.$router.push(`/goods`)
      } 

      if( item.type === '订单' ){
        return this.$router.push(`/order`)
      } 

      if( item.type === '用户' ){
        return this.$router.push(`/waiter`)
      } 

    },
    handleUploadSuccess(res) {
      if( res.status === 200 ){
        storeConfiglogo({sc_site_logo:res.data.url}).then( res => {
          if( res.status === 200 ){
            this.setStoreSiteLogo(res.data.sc_site_logo);
          } else {
            this.$message.error(res.msg);
          }
        })
      }         
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  },
  created(){
    if( !this.shop.store_id ){
      this.storeInfo();
    }
  }
};
</script>

<style scoped>

.el-header {
  background-color: #FF5C00;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  position: relative;
  height: 55px;

}

.collapse {
  margin-left:10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.collapse i {
  font-size:24px;
}

.wrapper {
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:0 20px;
}
.head-seach {
  width:300px;
}
.head-seach .el-autocomplete {
  width:100%
}
.head-seach .el-icon-search{
  color: #4f5258;
}


.head-topbar {
  display: flex;
  align-items: center;
}
.head-topbar__item {
  display: flex;
  align-items: center;
  padding: 5px 10px;
  height:30px;
}
.head-topbar__item:hover {
  background:#f0f3ff;
}
.avator {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  overflow:hidden;
}
.avator img {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}
.userName {
  width: 42%;
  margin-left: 10px;
  font-size: 14px;  
}
.messga{
  font-size:19px;
  color: #4f5258;
  margin:0 10px;
  position: relative;
}

.head-topbar .el-input{
   width:60%;
}
.messga em{
    position: absolute;
    top: -8px;
    right: calc(50% - 17px);
    border-radius: 10px;
    padding: 2px 4px;
    color: #fff;
    line-height: 10px;
    font-size: 10px;
    background-color: #FF3531;
    font-style: normal;
}
.el-dropdown{
  color:#fff;
  margin-left: .5rem;
}
.el-autocomplete__item {
  display:flex;
  justify-content: space-between;
  align-items: center;
}
.el-autocomplete__item span:nth-child(2) {
  color:#CCC;
  font-size:14px;
}
</style>