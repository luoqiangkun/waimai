<template>
  <div>
    <!-- <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>权限设置</span>
      </div>
      <div>
        <el-form ref="form" :model="form" label-width="200px">
       
        <el-form-item label="餐具费用">
            <div class="slider-block">
              <el-slider v-model="form.sc_charge_cutlery_fee"></el-slider>
              <span class="demonstration">餐具费用 {{form.sc_charge_cutlery_fee}}元/人</span>
            </div>
        </el-form-item>

        <el-form-item label="服务费用">

          <div class="slider-block">
            <el-slider v-model="form.sc_charge_service_fee"></el-slider>
            <span class="demonstration">服务费用 {{form.sc_charge_service_fee}}元/桌</span>
          </div>

        </el-form-item>

        <el-form-item label="允许服务员修改订单">
            <el-switch v-model="form.sc_allow_waiter_modify_order_amount"></el-switch>
        </el-form-item>


        <el-form-item label="允许服务员撤销菜品">
            <el-switch v-model="form.sc_allow_waiter_cancel_dishes"></el-switch>
        </el-form-item>


          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button>取消</el-button>
        </el-form-item>

      </el-form>

      </div>
    </el-card> -->

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>搜索设置</span>
      </div>
      <div>
        <el-form ref="form" label-width="200px">

          <el-form-item label="店铺热搜">
            <tags-input placeholder="添加热搜值" :typeahead="true" :existing-tags="sc_search_hot_words" v-model="sc_search_hot_words"></tags-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" size="small" @click="onSubmit2">保存</el-button>
            <el-button size="small">取消</el-button>
          </el-form-item>

      </el-form>

      </div>
    </el-card>

     <el-card class="box-card" style="margin-top:10px">
      <div slot="header" class="clearfix">
        <span>其他设置</span>
      </div>
      <div>
        <el-form ref="form" :model="form" label-width="200px">
       
					<el-form-item label="服务范围">
						<el-input placeholder="服务范围" v-model="form.sc_service_radius">
              <template slot="append">米</template>
            </el-input>
						
					</el-form-item>

					<el-form-item label="出餐时间">
            <el-input placeholder="出餐时间" v-model="form.sc_meal_time">
              <template slot="append">分</template>
            </el-input>
					</el-form-item>

          <el-form-item label="起送费">
            <el-input placeholder="起送费" v-model="form.sc_min_money">
              <template slot="append">元</template>
            </el-input>
					</el-form-item>

          <div class="rule-content">
              <el-form-item label="运费规则">
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
            <el-form-item label="配送方式">
              <el-radio-group v-model="form.sc_delivery_type">
                  <el-radio :label="1">骑手配送</el-radio>
                  <el-radio :label="2">商家自配</el-radio>
              </el-radio-group>
          </el-form-item>

					<el-form-item>
						<el-button type="primary" size="small" @click="onSubmit3">保存</el-button>
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
import VoerroTagsInput from '@voerro/vue-tagsinput'
import '@voerro/vue-tagsinput/dist/style.css'
Vue.component('tags-input', VoerroTagsInput);

export default {
  	name: 'Config',
  	data() {
	    return {
	        form:{
	        	sc_charge_service_fee:0,
            sc_charge_cutlery_fee:0,
	        	sc_allow_waiter_modify_order_amount:0,
            sc_allow_waiter_cancel_dishes:0,
            sc_freight_rules:'',
            sc_meal_time:'',
            sc_service_radius:'',
            sc_min_money:''
	        },
          sc_search_hot_words:[],
          sc_freight_free:0,
          sc_freight_rules:{
              starting_price:'',
              starting_distance:'',
              increase_distance:'',
              increase_price:''
          },
          sc_delivery_type:'1'
      	}
    },
    methods: {
    	getConfigData(){
    		storeConfig().then( res => {
    			if( res.status === 200 ){
    				this.form = {
              sc_charge_cutlery_fee:res.data.sc_charge_cutlery_fee,
              sc_charge_service_fee:res.data.sc_charge_service_fee,
              sc_allow_waiter_modify_order_amount:res.data.sc_allow_waiter_modify_order_amount ? true : false,
              sc_allow_waiter_cancel_dishes:res.data.sc_allow_waiter_cancel_dishes ? true : false,
              sc_search_hot_words:res.data.sc_search_hot_words,
              sc_meal_time:res.data.sc_meal_time,
              sc_service_radius:res.data.sc_service_radius,
              sc_min_money:res.data.sc_min_money,
              sc_freight_free:res.data.sc_freight_free,
              sc_freight_rules:res.data.sc_freight_rules,
              sc_delivery_type:res.data.sc_delivery_type
            };

            let sc_search_hot_words = [];
            for( let i in res.data.sc_search_hot_words ){
              sc_search_hot_words.push( {key:i,value:res.data.sc_search_hot_words[i]} )
            }
            this.sc_search_hot_words = sc_search_hot_words;
    			}
    		})
    	},
      onSubmit() {
      		let data = { 
            sc_charge_cutlery_fee:this.form.sc_charge_cutlery_fee,
      			sc_charge_service_fee: this.form.sc_charge_service_fee,
      			sc_allow_waiter_modify_order_amount: this.form.sc_allow_waiter_modify_order_amount ? 1 : 0,
            sc_allow_waiter_cancel_dishes: this.form.sc_allow_waiter_cancel_dishes ? 1 : 0
      		};
         
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
      	},
      onSubmit2(){
        let sc_search_hot_words = [];
        for( let i in this.sc_search_hot_words ){
          sc_search_hot_words.push( this.sc_search_hot_words[i].value );
        }


        let data = { 
          sc_search_hot_words:sc_search_hot_words
        };

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
      },
      onSubmit3(){
        let data = { 
          sc_service_radius:this.form.sc_service_radius,
          sc_meal_time:this.form.sc_meal_time,
          sc_min_money:this.form.sc_min_money,
          sc_freight_free:this.form.sc_freight_free,
          sc_freight_rules:this.form.sc_freight_rules,
          sc_delivery_type:this.form.sc_delivery_type
        };

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
  .slider-block {
    width:500px;
    padding:10px;
        background-color: #fafafa
  }
  .slider-block .el-slider {
    float: left;
    width: 70%;
    margin-right: 20px;
  }

  .slider-block .demonstration {
    font-size: 14px;
    color: #8492a6;
    line-height: 44px;
}
.rule-content {
    display: flex;
}
.rule-content .el-input{
    width: 80px;
    margin: 0 2px;
}
</style>
