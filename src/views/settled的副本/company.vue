<template>
   <div class="main-content">
       <el-alert
            title="准确填写资质信息，市场经理会尽快联系您"
            type="warning"
            show-icon>
        </el-alert>

        <el-steps :active="2" simple>
            <el-step title="店铺信息" icon="el-icon-s-shop"></el-step>
            <el-step title="资质信息" icon="el-icon-c-scale-to-original"></el-step>
            <el-step title="法人信息" icon="el-icon-s-custom"></el-step>
        </el-steps>
        <el-form ref="form" :model="form" :rules="rules" label-width="130px" label-position="left">
            <el-form-item label="企业名称" prop="companyName">
                <el-input class="width-400" v-model="form.companyName"></el-input>
            </el-form-item>
            <el-form-item label="企业联系方式" prop="companyTelephone">
                <el-input class="width-400" v-model="form.companyTelephone"></el-input>
            </el-form-item>
             <el-form-item label="企业所在地" prop="autcompanyAddresshType">
                  <el-cascader
                    class="width-400"
                    :options="districtOptions" 
                    clearable 
                    v-model="form.companyAddress"
                >
                </el-cascader>
            </el-form-item>
            <el-form-item label="证件类型" prop="authType">
                <el-select class="width-400" placeholder="证件类型" v-model="form.authType">
                  <el-option label="一证" value=1></el-option>
                  <el-option label="三证" value=2></el-option>
                </el-select>
            </el-form-item>
            <template v-if="form.authType == 2">
                <el-form-item label="营业执照" prop="businessLicense">
                    <el-upload
                        class="image-uploader"
                        :action="uploadUrl"
                        name="upfile"
                        :on-success="(response,id)=>{handleUploadSuccess(response, 'businessLicense')}"
                        :show-file-list="false"
                        list-type="picture-card"
                    >
                        <img class="image" :src="form.businessLicense" v-if="form.businessLicense"/>
                        <i class="el-icon-plus" v-else></i>
                        <div slot="tip" class="el-upload__tip">请上传清晰的营业执照照片</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="税务登记证" prop="taxRegister">
                    <el-upload
                        class="image-uploader"
                        :action="uploadUrl"
                        name="upfile"
                        :on-success="(response,id)=>{handleUploadSuccess(response, 'taxRegister')}"
                        :show-file-list="false"
                        list-type="picture-card"
                    >
                    
                    <img class="image" :src="form.taxRegister" v-if="form.taxRegister"/>
                    <i class="el-icon-plus" v-else></i>
                    <div slot="tip" class="el-upload__tip">请上传清晰的税务登记证</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="组织机构代码" prop="organizationCode">
                    <el-input class="width-400" v-model="form.organizationCode"></el-input>
                </el-form-item>
            </template>
            <template v-else>
                <el-form-item label="统一社会信用" prop="uniCredit">
                    <el-upload
                        class="image-uploader"
                        :action="uploadUrl"
                        name="upfile"
                        :on-success="(response,id)=>{handleUploadSuccess(response, 'uniCredit')}"
                        :show-file-list="false"
                        list-type="picture-card"
                    >
                    
                    <img class="image" :src="form.uniCredit" v-if="form.uniCredit"/>
                    <i class="el-icon-plus" v-else></i>
                    <div slot="tip" class="el-upload__tip">请上传清晰的统一社会信用照</div>
                    </el-upload>
                </el-form-item>
            </template>
            
           
            <el-divider></el-divider>

            <el-form-item>
                <router-link to="/settled/store">
                    <el-button>上一步</el-button>
                </router-link>
                
                <el-button type="primary" @click="onSubmit">下一步</el-button>
            </el-form-item>
        </el-form>
   </div>
</template>
<script>
import { uploadUrl,settled } from "@/api"
import districtData from '@/data/districts'
export default {
    data(){
        return {
            rules: {
                companyName: [
                { required: true, message: '请输入企业名称', trigger: 'blur' },
                { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],
                companyAddress: [
                { required: true, message: '请选择企业所在地', trigger: 'blur' }
                ],
                companyTelephone: [
                { required: true, message: '请填写企业联系方式', trigger: 'blur' }
                ],
                authType: [
                { required: true, message: '请选择证照类型', trigger: 'change' }
                ],
                uniCredit: [
                { required: true, message: '请上传统一社会证', trigger: 'blur' }
                ],
                businessLicense: [
                { required: true, message: '请上传营业执照', trigger: 'blur' }
                ],
                taxRegister: [
                { required: true, message: '请上传税务登记证', trigger: 'blur' }
                ],
                organizationCode: [
                { required: true, message: '请填写组织机构代码', trigger: 'blur' }
                ]
            },
            form:{
                companyName:'',
                companyAddress:'',
                companyTelephone:'',
                authType:'',
                uniCredit:'',
                businessLicense:'',
                organizationCode:'',
                taxRegister:''
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
        formatDistrict(){
            var districtOptions = [];
            for( var i in districtData[100000]){
            
            districtOptions.push({
                value:i,
                label:districtData[100000][i],
                children:[]
            })
            }

            for( var n in districtOptions ){
            if( districtData[districtOptions[n].value] ){
                for( var m in districtData[districtOptions[n].value] ){
                districtOptions[n].children.push({
                    value:m,
                    label:districtData[districtOptions[n].value][m],
                    children:[]
                })
                }
            }
            }

            for( var i in districtOptions ){
            for( var m in districtOptions[i].children ){
                if( districtData[districtOptions[i].children[m].value] ){
                for( var n in districtData[districtOptions[i].children[m].value] ){
                    districtOptions[i].children[m].children.push({
                    value:n,
                    label:districtData[districtOptions[i].children[m].value][n]
                    })
                }
                }
            }
            }
            this.districtOptions = districtOptions;
        },
        formatFormDistrict(companyAddress){
            var newDistrice = []
            for( var i in companyAddress ){
                newDistrice.push(companyAddress[i].toString())
            }
            return newDistrice
        },
        handleUploadSuccess(res,id) {
            if( res.status === 200 ){
                this.form[id] = res.data.url
            }	        
     	},
        onSubmit() {
            this.form.key = 'company'
            this.$refs.form.validate((valid) => {
            if (valid) {
                settled(this.form).then(res => {
                if(res.status == 200){
                    this.$router.push("legal")
                }else{
                    this.$message.error(res.msg)
                }
                }) 
            }
            })
        }
    },
    created(){
        this.formatDistrict();
        if(this.settled.company){
            this.form = this.settled.company
            if(this.form.companyAddress && this.form.companyAddress.length > 0){
                this.form.companyAddress = this.formatFormDistrict(this.form.companyAddress)
            }
        }
        this.$store.dispatch('settled/setStep',2)
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
.image-uploader .image {
  width: 100%;
  height:100%;
}

</style>