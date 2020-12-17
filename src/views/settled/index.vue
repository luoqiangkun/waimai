<template>
    <el-container direction="vertical">
        <page-header :menus="menus"></page-header>
        <el-main>
            <router-view></router-view>
        </el-main>
        <page-footer></page-footer>
    </el-container>
</template>
<script>
import header from '@/views/layout/front/header'
import footer from '@/views/layout/front/footer'
export default {
    components:{
        'page-header':header,
        'page-footer':footer
    },
    data(){
        return {
            menus:[
                {
                    title:'帮助中心',
                    path:'/help',
                    type:'text'
                }
            ]
        }
    },
    computed: {
        profile () {
            return this.$store.state.profile
        },
        settled () {
            return this.$store.state.settled
        },
        store(){
            return this.$store.state.common.store
        }
    },
    methods:{
        redirect(){
            if( this.store.store_id ){
                this.$router.push("/settled/result");
            } else if( this.settled.settledStep == 0 ){
                this.$router.push("/settled/prompt");
            } else if( this.settled.settledStep == 1 ){
                this.$router.push("/settled/store");
            } else if( this.settled.settledStep == 2 ){
                this.$router.push("/settled/company");
            } else if( this.settled.settledStep == 3 ){
                this.$router.push("/settled/legal");
            }
        },
        async storeInfo(){
            await this.$store.dispatch('common/storeInfo')
        },
        async settledData(){
            await this.$store.dispatch('settled/settledData')
        }
    },
    created(){
       
    },
    beforeRouteEnter (to, from, next) {
        next(async(vm) => {
            if( !vm.$store.getters.common.store.loaded ){
                await vm.$store.dispatch('common/storeInfo')
            }
            if( !vm.$store.getters.common.store.store_id ){
               await vm.$store.dispatch('settled/settledData')
            }
            vm.redirect();
        });
    }
}
</script>
<style scoped>
.el-main {
    width: 1200px;
    margin: 10px auto;
    background: #fff;
    min-height: calc(100vh - 291px);
}


</style>>
   