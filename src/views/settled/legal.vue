<template>
   <div class="main-content">
       <el-alert
            title="准确填写法人信息，市场经理会尽快联系您"
            type="warning"
            show-icon>
        </el-alert>
        <el-steps :active="3" simple>
            <el-step title="店铺信息" icon="el-icon-s-shop"></el-step>
            <el-step title="资质信息" icon="el-icon-c-scale-to-original"></el-step>
            <el-step title="法人信息" icon="el-icon-s-custom"></el-step>
        </el-steps>
        <el-form ref="form" :model="form" :rules="rules" label-width="130px" label-position="left">
            <el-form-item label="法人名称" prop="legalName">
                <el-input class="width-400" v-model="form.legalName"></el-input>
            </el-form-item>
             <el-form-item label="法人联系方式" prop="legalPhone">
                <el-input class="width-400" v-model="form.legalPhone"></el-input>
            </el-form-item>
             <el-form-item label="法人身份证号" prop="legalIdCardNo">
                <el-input class="width-400" v-model="form.legalIdCardNo"></el-input>
            </el-form-item>
            <el-form-item label="身份证正面照" prop="legalIdCardFront">
                <el-upload
                    class="image-IDCard"
                    :action="uploadUrl"
                    name="upfile"
                    :on-success="(response,id)=>{handleUploadSuccess(response, 'legalIdCardFront')}"
                    :show-file-list="false"
                    list-type="picture-card"
                >
                    <img class="image" :src="form.legalIdCardFront" v-if="form.legalIdCardFront"/>
                    <i class="el-icon-plus" v-else></i>
                    <div slot="tip" class="el-upload__tip">请上传清晰的身份证正面照片</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="身份证反面照" prop="legalIdCardBack">
                <el-upload
                    class="image-IDCard"
                    :action="uploadUrl"
                    name="upfile"
                    :on-success="(response,id)=>{handleUploadSuccess(response, 'legalIdCardBack')}"
                    :show-file-list="false"
                    list-type="picture-card"
                    style="width:180px"
                >
                    <img class="image" :src="form.legalIdCardBack" v-if="form.legalIdCardBack"/>
                    <i class="el-icon-plus" v-else></i>
                    <div slot="tip" class="el-upload__tip">请上传清晰的身份证反面照片</div>
            </el-upload>
            </el-form-item>
             <el-form-item label="企业对公账号" prop="accountNo">
                <el-input class="width-400" v-model="form.accountNo"></el-input>
            </el-form-item>
             <el-form-item label="开户银行名称" prop="parentBankName">
                <el-input class="width-400" v-model="form.parentBankName"></el-input>
            </el-form-item>
            <el-form-item label="开户支行名称" prop="bankName">
                <el-input class="width-400" v-model="form.bankName"></el-input>
            </el-form-item>
            <el-divider></el-divider>

            <el-form-item>
                <router-link to="/settled/company"><el-button>上一步</el-button></router-link>
                
                <el-button type="primary" @click="onSubmit">确认</el-button>
            </el-form-item>
        </el-form>
   </div>
</template>
<script>
import { uploadUrl,settled } from "@/api"
export default {
    data(){
        return {
            rules: {
                legalName: [
                { required: true, message: '请填写法人名称', trigger: 'blur' },
                ],
                legalPhone: [
                { required: true, message: '请填写法人联系方式', trigger: 'blur' }
                ],
                legalIdCardNo: [
                { required: true, message: '请填写法人身份证号', trigger: 'blur' }
                ],
                legalIdCardFront: [
                { required: true, message: '请上传身份证正面照', trigger: 'change' }
                ],
                legalIdCardBack: [
                { required: true, message: '请上传身份证反面照', trigger: 'blur' }
                ],
                accountNo: [
                { required: true, message: '请填写企业对公账号', trigger: 'blur' }
                ],
                parentBankName: [
                { required: true, message: '请填写开户银行名称', trigger: 'blur' }
                ],
                bankName: [
                { required: true, message: '请填写开户支行名称', trigger: 'blur' }
                ]
            },
            form:{
                legalName:'',
                legalPhone:'',
                legalIdCardNo:'',
                legalIdCardFront:'',
                legalIdCardBack:'',
                accountNo:'',
                parentBankName:'',
                bankName:''
            },
            uploadUrl:uploadUrl
        }
    },
    computed: {
        settled () {
            return this.$store.state.settled
        }
    },
    methods:{
        handleUploadSuccess(res,id) {
            if( res.status === 200 ){
                this.form[id] = res.data.url
            }	        
     	},
        onSubmit() {
            this.form.key = 'legal'
            this.$refs.form.validate((valid) => {
            if (valid) {
                settled(this.form).then(res => {
                if(res.status == 200){
                    this.$router.push("result")
                }else{
                    this.$message.error(res.msg)
                }
                }) 
            }
            })
        }
    },
    created(){
        if(this.settled.legal){
            this.form = this.settled.legal
        }
        this.$store.dispatch('settled/setStep',3)
    }
}
</script>
<style scoped>
.width-400 {
    width: 400px;
}
.main-content {
    padding: 0 50px;
    text-align: left;
}
.main-content .el-alert {
    padding: 14px 16px;
    margin-bottom: 20px;
}
.main-content .el-steps {
    margin-bottom: 20px;
}


</style>