<template>
    <el-container direction="vertical">
        <page-header :menus="menus"></page-header>
        <el-main class="flex-main">
            <category></category>
            <div class="main-content">
                <router-view></router-view>
            </div>
        </el-main>
        <page-footer></page-footer>
    </el-container>
</template>
<script>
import header from '@/views/layout/front/header'
import footer from '@/views/layout//front/footer'
import category from '@/views/help/cate'
import lists from '@/views/help/lists'
export default {
    components:{
        'page-header':header,
        'page-footer':footer,
        'category':category
    },
    computed: {
        profile () {
            return this.$store.state.profile
        }
    },
    data(){
        return {
            menus:[
                {
                    title:'商家入驻',
                    path:'/settled',
                    type:'button'
                }
            ],
            input:''
        }
    },
    methods:{
    
    },
    created(){
        console.log( window.location.href );
    }
}
</script>
<style scoped>
.el-main {
    width: 1200px;
    margin: 10px auto;
    padding: 0;
    text-align: left;
    min-height: calc(100vh - 291px);
}

.flex-main {
    display: flex;
    justify-content: space-between;
}
.main-content {
    background: #fff;
    padding: 20px 50px;
    width: 840px;
    border: solid 1px #e6e6e6;
    text-align: left;
    position: relative;
}

</style>>
   