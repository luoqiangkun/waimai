<template>
    <div class="result-container">
         <el-steps :active="active" simple>
            <el-step title="店铺信息" icon="el-icon-s-shop"></el-step>
            <el-step title="资质信息" icon="el-icon-c-scale-to-original"></el-step>
            <el-step title="法人信息" icon="el-icon-s-custom"></el-step>
            <el-step title="等待审核" icon="el-icon-coordinate"></el-step>
        </el-steps>

        <div class="alert-box" style="margin-top:20px">
            <el-alert
                title="店铺已开通"
                type="success"
                description="你的店铺已开通，可前往外卖系统商家管理后台管理自己的店铺"
                show-icon
                :center="center"
                :closable="false"
                v-if="store.store_is_open == 1">
            </el-alert>

            <el-alert
                title="待完善资料"
                type="success"
                description="你的商家入驻申请资料不全，请尽快完善资料，重新提交"
                show-icon
                :center="center"
                :closable="false"
                v-else-if="store.store_state_id == 3210">
            </el-alert>

            <el-alert
                title="等待平台审核"
                type="info"
                description="你的商家入驻申请已提交，请耐心等待平台审核，预计会在2个工作日内得到审核结果"
                show-icon
                :center="center"
                :closable="false"
                v-else-if="store.store_state_id == 3220">
            </el-alert>

            <el-alert
                title="平台审核通过"
                type="success"
                description="你的商家入驻申请已通过，等待平台为您开通店铺"
                show-icon
                :center="center"
                :closable="false"
                v-else-if="store.store_state_id == 3240">
            </el-alert>

            <el-alert
                title="平台审核不通过"
                type="error"
                description="你的商家入驻申请未通过，请参照审核失败原因进行修改"
                show-icon
                :center="center"
                :closable="false"
                v-else-if="store.store_state_id == 3230">
            </el-alert>

             <el-alert
                title="店铺已关闭"
                type="error"
                description="你的店铺已关闭，如有疑问，可找平台客服进行沟通"
                show-icon
                :center="center"
                :closable="false"
                v-else-if="store.store_is_open == 0">
            </el-alert>

             <el-alert
                title="等待平台审核"
                type="info"
                description="你的商家入驻申请已提交，请耐心等待平台审核，预计会在2个工作日内得到审核结果"
                show-icon
                :center="center"
                :closable="false"
                v-else>
            </el-alert>

        </div>
     
        <el-card shadow="never">
            <p>1、审核结果会在1到2个工作日以短信的方式发送到你的手机，请注意查看</p>

            <p>2、如果审核未通过，请参照审核失败原因进行修改，之后重新提交</p>


        </el-card>
    </div>
    
    
</template>
<script>
export default {
    data(){
        return {
            active:3,
            center:false
        }
    },
    computed: {
        store(){
            return this.$store.state.common.store
        }
    },
    methods:{
        
    },
    created(){
        if(this.store.store_state_id > 3220){
            this.active = 4
        }
    }
}
</script>
<style scoped>
    .result-container {
        text-align: left;
    }
    .el-card {
        color: #666;
    }
    .el-alert {
        padding: 20px 16px;
    }
    .el-alert__content {
        text-align: left;
    }
    .el-alert__title {
        font-size: 16px;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
</style>