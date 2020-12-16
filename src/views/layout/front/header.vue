<template>
    <el-header direction="vertical">
        <div class="header-left">
            <div class="site-logo">
                <img :src="logo" alt="logo">
            </div>
            <div class="vertical-line"></div>
            <h3>外卖系统</h3>
            <div class="vertical-line"></div>
            <h4>商家入驻</h4>
        </div>
        <div class="header-right">
            <el-menu mode="horizontal">
                <el-menu-item index="99">
                    <a href="javascript:;" @click="redirectShop">商城首页</a>
                </el-menu-item>
                <el-menu-item :key="index" v-for="(item,index) in menus">
                    <router-link :to="item.path">
                        <el-button type="primary" size="mini" v-if="item.type == 'button'">{{item.title}}</el-button>
                        <span v-else>{{item.title}}</span>
                    </router-link>
                </el-menu-item>
                
                 <el-menu-item index="100">
                    <el-dropdown trigger="click" @command="logout">
                        <span class="el-dropdown-link">
                        {{profile.userName}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown" >
                        <el-dropdown-item icon="el-icon-warning" ><span>退出</span></el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-menu-item>
            </el-menu>
        </div>
    </el-header>
</template>
<script>
export default {
    props: {
        title:'外卖系统',
        subTitle:'',
        menus: {
            type: Array,
            default:()=>[]
        }
    },
    data(){
        return {
           logo:require('@/assets/image/logo.jpg')
        }
    },
    computed: {
        profile () {
            return this.$store.state.profile
        },
        settled () {
            return this.$store.state.settled
        }
    },
    methods:{
        async logout() {
            await this.$store.dispatch('auth/logout')
            this.$store.dispatch('profile/clearUserId')
            this.$store.dispatch('shop/clearStoreId')
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        },
        redirectShop(){
            window.location.href = process.env.API_URL
        }
    },
    created(){
       
    }
}
</script>
<style>
.el-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 50px;
    background: #fff;
    border-bottom: solid 1px #e6e6e6;
}
.header-left {
    display: flex;
    align-items: center;
}
.header-left .site-logo {
    width: 50px;
}
.header-left .site-logo img {
    width: 100%;
}
.header-left .vertical-line {
    width: 0;
    height: 20px;
    margin: 0 10px;
    border-right: 1px solid #dfdfdf;
}
.header-left h3,
.header-left h4 {
    font-weight: 400;
}
</style>>
   