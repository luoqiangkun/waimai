<template>
    <div>
        <el-card class="prompt-card" >
            <div slot="header" class="clearfix">
                <span>开店证照准备</span>
            </div>
            <div class="image-container">
                <div class="image-box">
                    <el-image :src="require('@/assets/image/1.png')"></el-image>
                    <p>门脸照片 <span>(需拍出完整牌匾、门框，建议距离门店2米外拍摄)</span> </p>
                    
                </div>  
                <div class="image-box">
                    <el-image :src="require('@/assets/image/2.png')"></el-image>
                    <p>店内环境照片 <span>(需真实反映用餐环境，拍摄整体就餐区域，请勿局部拍摄桌椅)</span> </p>
                </div>   
                <div class="image-box">
                    <el-image :src="require('@/assets/image/3.png')"></el-image>
                    <p>身份证正面照片 <span>(需清晰拍摄身份证信息拍摄完整，不可有遮盖物遮挡)</span> </p>
                </div>  
                <div class="image-box">
                    <el-image :src="require('@/assets/image/4.png')"></el-image>
                    <p>身份证反面照片 <span>(需清晰拍摄身份证信息拍摄完整，不可有遮盖物遮挡)</span> </p>
                </div>  
                <div class="image-box">
                    <el-image :src="require('@/assets/image/5.png')"></el-image>
                    <p>营业执照照片 <span>(需清晰拍摄身份证信息拍摄完整，不可有遮盖物遮挡)</span> </p>
                </div>   
                <div class="image-box">
                    <el-image :src="require('@/assets/image/6.png')"></el-image>
                    <p>经营许可证照片 <span>(需清晰拍摄身份证信息拍摄完整，不可有遮盖物遮挡)</span> </p>
                </div>  
            </div>
            <div class="submit-box">
                <el-row>
                    <el-checkbox v-model="aggressive">
                        <a href="javascript:;" @click="visible = !visible">我已阅读并同意《外卖商家入驻协议》</a>
                    </el-checkbox>
                </el-row>
                <el-row>
                    <el-button type="primary" @click="nextHandle">资料已准备好，进入下一步</el-button>
                </el-row>
            </div>
        </el-card>
        <el-dialog
            title="商家入驻协议"
            :visible.sync="visible"
            width="600px"
        >
            <div v-html="config.catering_settlement_agreement">
        
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="visible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
    
</template>
<script>
import { config } from "@/api"
export default {
    data(){
        return {
            aggressive:false,
            visible:false,
            config:{}
        }
    },
    methods:{
        getConfig(){
            config().then( res => {
                if( res.status === 200 ){
                    this.config = res.data
                }
            })
        },
        nextHandle(){
            if(this.aggressive){
                this.$router.push("store");
            } else {
                this.$alert('请先阅读并勾选商家入驻协议', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$message({
                        type: 'info',
                        message: `action: ${ action }`
                        });
                    }
                });
            }
        }
    },
    created(){
        this.$store.dispatch('settled/setStep',0)
        this.getConfig();
    }
}
</script>
<style scoped>
    .prompt-card {
        width: 800px;
        margin: 0 auto;
    }
    .prompt-card .image-container {
        display: flex;
        flex-wrap: wrap;
    }
    .image-container .image-box {
        width: 33.33%;
        padding: 5px;
        box-sizing: border-box;
        position: relative;
    }
    .image-container .image-box img {
        width: 100%;
    }
    .image-container .image-box span {
       font-size: 12px;
       color: #666;
    }
    .submit-box {
        margin-top: 20px;
        text-align: center;
    }
    .submit-box .el-row {
        margin-bottom: 10px;
    }
</style>