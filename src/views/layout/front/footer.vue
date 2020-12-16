<template>
    <el-footer style="height:auto">
        <div class="footer-container">
            <div class="link-row" :key="index" v-for="(item,index) in footer.help">
                <h4>{{item.category_name}}</h4>
                <ul>
                    <li :key="key" v-for="(help,key) in item.helpLists">
                        <router-link :to="'/help/detail/' + help.help_id">{{help.help_title}}</router-link>
                    </li>
                </ul>
            </div>
             <div class="link-row">
                <h4>手机端二维码</h4>
                <div class="qrcode">
                    <img :src="footer.qrcode ? footer.qrcode : ''" alt="">
                </div>
            </div>
        </div>
    </el-footer>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    computed: {
        footer() {
            return this.$store.state.common.footer
        }
    },
    methods:{
       
    },
    created(){
        if( !this.footer.loaded ){
            this.$store.dispatch('common/footerData')
        }  
    }
}
</script>
<style>
.el-footer {
    height: 500px;
    background: rgba(0,0,0,.7);
    color: #fff;
}
.footer-container {
    width: 900px;
    margin: 0 auto;
    text-align: left;
    display: flex;
    justify-content: space-between;
    padding: 30px 0;
}
.footer-container a {
    color: #fff;
}
.footer-container ul li {
    line-height: 24px;
}
.footer-container .qrcode {
    width: 120px;
}
.footer-container .qrcode img {
    width: 100%;
}
.link-row ul{
    margin-top:15px;
}
</style>>
   