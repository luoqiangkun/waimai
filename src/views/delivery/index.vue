<template>
  <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>搜索设置</span>
      </div>
      <div>
        <el-form ref="form" label-width="200px">
            <div class="rule-content">
                <el-form-item label="运费规则设置:">
                    <span>起送价</span>
                    <el-input size="small" v-model="form.sc_freight_rules.starting_price"></el-input>
                    <span>元，超过</span>
                    <el-input size="small" v-model="form.sc_freight_rules.starting_distance"></el-input>
                    <span>米,每增加</span>
                    <el-input size="small" v-model="form.sc_freight_rules.increase_distance"></el-input>
                    <span>米，增加运费</span>
                    <el-input size="small" v-model="form.sc_freight_rules.increase_price"></el-input>
                    <span>元</span>
                </el-form-item>
            </div>
             <el-form-item label="配送方式:">
                <el-radio-group v-model="form.sc_delivery_type">
                    <el-radio :label="1">骑手配送</el-radio>
                    <el-radio :label="2">商家自配</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="onSubmit">保存</el-button>
                <el-button size="small">取消</el-button>
            </el-form-item>
      </el-form>

      </div>
    </el-card>
</template>

<script>
import Vue from 'vue'
import { storeConfig,storeConfigSave } from '@/api/shop'
export default {
  	name: 'Config',
  	data() {
	    return {
	        form:{
	        	sc_freight_free:0,
                sc_freight_rules:{
                    starting_price:'',
                    starting_distance:'',
                    increase_distance:'',
                    increase_price:''
                },
                sc_delivery_type:'1'
	        }
      	}
    },
    methods: {
    	getConfigData(){
    		storeConfig().then( res => {
    			if( res.status === 200 ){
    				this.form = {
                        sc_freight_free:res.data.sc_freight_free,
                        sc_freight_rules:res.data.sc_freight_rules,
                        sc_delivery_type:res.data.sc_delivery_type
                    }
    			}
    		})
    	},
      onSubmit() {
            let data = {
                sc_freight_free:this.form.sc_freight_free,
                sc_freight_rules:this.form.sc_freight_rules,
                sc_delivery_type:this.form.sc_delivery_type
            }
      		storeConfigSave( data ).then( res => {
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
.rule-content {
    display: flex;
}
.rule-content .el-input{
    width: 80px;
    margin: 0 2px;
}
</style>
