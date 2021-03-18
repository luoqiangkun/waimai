<template>
    <div>
        <el-card class="box-card" style="margin-top:10px">
        <div slot="header" class="clearfix">
            <span>易联云设置</span>
        </div>
        <div>
            <el-form ref="form" :model="form" label-width="200px">
                <el-form-item label="版本号">
                    <el-input placeholder="版本号" v-model="form.sc_yilianyun.number"></el-input>
                </el-form-item>
                <el-form-item label="终端号">
                    <el-input placeholder="终端号" v-model="form.sc_yilianyun.clientId"></el-input>
                </el-form-item>
                <el-form-item label="密钥">
                    <el-input placeholder="密钥" v-model="form.sc_yilianyun.clientSecret"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="onSubmit">保存</el-button>
                    <el-button size="small">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        </el-card>
    </div>
</template>

<script>
import Vue from 'vue'
import { storeConfig,storeConfigSave } from '@/api/shop'

export default {
  	name: 'Config',
  	data() {
	    return {
	        form:{
                sc_yilianyun:{
                    number:'',
                    clientId:'',
                    clientSecret:''
                }
            }
      	}
    },
    methods: {
    	getConfigData(){
    		storeConfig().then( res => {
    			if( res.status === 200 ){
                    if( res.data.sc_yilianyun ){
                        this.form.sc_yilianyun = res.data.sc_yilianyun
                    }
                }
    		})
    	},
      onSubmit() {
      		storeConfigSave( this.form ).then( res => {
          	if( res.status === 200 ){
          		this.$message({
			          message: res.msg,
			          type: 'success'
			        });
          	} else {
          		this.$message.error(res.msg);
          	}
          })
      	}
    },
    created(){
    	this.getConfigData();
    }
}
</script>

<style scoped>
 
</style>
