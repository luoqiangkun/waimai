<template>
    <el-card class="box-card">
      <div slot="header" class="clearfix" style="position:relative">
        <span>订单详情</span>
          <div class="goback" @click="goback"><i class="el-icon-back back"></i>返回</div>
          
          <div class="goback refresh" @click="refresh"><i class="el-icon-refresh"></i>刷新</div>
      </div>
      <div class="container" v-loading="loading">
        <div class="block">
          <div class="block-content">
            <el-steps :active="active" finish-status="success" align-center>
            <template v-if="orderData.delivery_type == 1">
              <el-step>
                <dl class="step-text" slot="title">
                  <dt>提交订单</dt>
                  <dd>{{orderData.order_time}}</dd>
                </dl>
              </el-step>
              <el-step>
                <dl class="step-text" slot="title">
                  <dt>买家付款</dt>
                  <dd v-if="active >= 2">{{orderData.payment_time}}</dd>
                </dl>
              </el-step>
              <el-step>
                <dl class="step-text" slot="title">
                  <dt>商家发货</dt>
                  <dd v-if="active >= 3">{{orderData.delivered_time}}</dd>
                </dl>
              </el-step>
              <el-step>
                <dl class="step-text" slot="title">
                  <dt>确认收货</dt>
                  <dd v-if="active >= 4">{{orderData.order_finish_time}}</dd>
                </dl>
              </el-step>
              <el-step>
                <dl class="step-text" slot="title">
                  <dt>评价订单</dt>
                </dl>
              </el-step>
            </template>
            <template v-else>
              <el-step>
                <dl class="step-text" slot="title">
                  <dt>提交订单</dt>
                  <dd>{{orderData.order_time}}</dd>
                </dl>
              </el-step>
              <el-step>
                <dl class="step-text" slot="title">
                  <dt>买家付款</dt>
                  <dd v-if="active >= 2">{{orderData.payment_time}}</dd>
                </dl>
              </el-step>
              <el-step>
                <dl class="step-text" slot="title">
                  <dt>确认取货</dt>
                  <dd v-if="active >= 4">{{orderData.order_finish_time}}</dd>
                </dl>
              </el-step>
              <el-step>
                <dl class="step-text" slot="title">
                  <dt>评价订单</dt>
                </dl>
              </el-step>
            </template>
            </el-steps>
          </div>
        </div>
        <div class="block flex">
           <div class="left-block" style="padding-left:40px">
            <div class="block-content">
              <h3>收货及配送信息</h3>
              <div class="text-line"></div>
              <template v-if="orderData.delivery">
                <div>收货人：{{orderData.delivery.da_name }}</div>
                <div>收货地址：{{orderData.delivery.da_address}}</div>
                <div>联系方式：{{orderData.delivery.da_mobile}}</div>
                <div>预约电话：{{orderData.telephone}}</div>
                <div>预约时间：{{orderData.pickup_time}}</div>
              </template>
              

              <div class="text-line" v-if="orderData.delivery_type == 1 || orderData.delivery_type == 3"></div>
              <template v-if="orderData.delivery_type == 1">
                <div>期望时间：立即配送</div>
                <div>配送地址：{{orderData.delivery.da_address}}</div>
                <div>配送服务：骑手配送</div>
                <div>配送骑手：{{orderData.rider_row ? orderData.rider_row.user_realname : ''}}</div>
                <div>联系方式：{{orderData.rider_row ? orderData.rider_row.user_mobile : ''}}</div>
              </template>
              <template v-if="orderData.delivery_type == 3">
                <div>期望时间：立即配送</div>
                <div>配送地址：{{orderData.delivery.da_address}}</div>
                <div>配送服务：商家自配</div>
                <div>配送人：{{orderData.shipping ? orderData.shipping.shipping_contacter : ''}}</div>
                <div>联系方式：{{orderData.shipping ? orderData.shipping.shipping_mobile : ''}}</div>
              </template>

            </div>
          </div>
         
           <div class="right-block">
            <div class="block-content flex">
              <div class="icon-box" style="color:#67c23a;font-size:30px;width:40px">
                <i class="el-icon-success"></i>
              </div>
              <div class="content-box">
                <h3>订单状态：{{orderData.order_status_name}}</h3>
                <p>用户付款之后请及时处理订单，如果商家长时间不处理，系统将自动取消订单</p>
                
                <div class="text-line"></div>

                <div>订单编号：{{orderData.order_id}}</div>
                <div>下单时间：{{orderData.order_time}}</div>
                <div>支付方式：在线支付</div>
                <div>配送方式：
                    <span v-if="orderData.delivery_type == 1">骑手配送</span>
                    <span v-else-if="orderData.delivery_type == 2">到店自取</span>
                    <span v-else-if="orderData.delivery_type == 3">商家自配</span>
                </div>
                <div>
                  订单备注：{{orderData.order_remark}}
                </div>
                <div v-if="orderData.delivery_type == 1">配送状态：{{orderData.runner_state_name}}</div>

                <template v-if="orderData.order_status === 2 || orderData.order_status === 3 || orderData.return_row">
                  <div class="text-line"></div>

                  <div class="flex" style="margin-top:20px">
                    <template v-if="orderData.order_status === 2">
                        <el-button type="primary" size="mini" @click="modifyOrderStatus(orderData.order_id,3,orderData.index)">确认接单</el-button>
                        <el-button type="danger" size="mini" @click="modifyOrderStatus(orderData.order_id,6,orderData.index)">拒绝接单</el-button>
                    </template>
                    
                    <template v-if="orderData.order_status === 3">
                      <el-button type="primary" size="mini" @click="dialogFormVisible = !dialogFormVisible" v-if="orderData.delivery_type === 3">配送</el-button>
                      <el-button type="primary" size="mini" @click="pickUp" v-else-if="orderData.delivery_type === 2">确认取货</el-button>
                    
                    </template>
                    <el-button type="info" size="mini" @click="returnDetail(orderData.return_row.return_id)" v-if="orderData.return_row">退款信息</el-button>
                  </div>
                </template>
              </div>
            </div>
          </div>
         
        </div>
        <div class="block">
           <el-table
          :data="orderData.items"
          v-loading="loading"
          border
          :header-cell-style="{background:'#f8f8f9',color:'#606266'}"
          size="small"
          style="width: 100%;">
            <el-table-column
              label="商品图片"
              align="center"
              prop="item_image">
              <template slot-scope="scope">
              <img :src="scope.row.item_image" width="50"/>
              </template>
            </el-table-column>
            <el-table-column
                label="商品名称"
                align="center"
                prop="item_name">
                <template slot-scope="scope">
                  <dl>
                    <dt>{{scope.row.item_name}}</dt>
                    <dd>
                      <span v-if="scope.row.item_spec">{{scope.row.item_spec}}</span>
                    </dd>
                    <dd>
                      <template v-if="scope.row.order_item_attribute && scope.row.order_item_attribute.length > 0">
                        <span :key="i" v-for="(item,i) in scope.row.order_item_attribute">{{item.value}}</span>
                      </template>
                    </dd>
                  </dl>
                </template>
            </el-table-column>
            <el-table-column
                label="商品单价"
                align="center"
                prop="item_price">
            </el-table-column>
            <el-table-column
                label="购买数量"
                align="center"
                prop="order_item_quantity">
            </el-table-column>
            <el-table-column
                label="商品金额"
                align="center"
                prop="order_item_amount">
            </el-table-column>
          </el-table>
          <div style="margin: 10px 20px;text-align:right;font-size:13px">
            <p>运费金额：<em class="strong">{{orderData.freight}} ¥</em></p>
            <p>优惠金额：<em class="strong">{{orderData.order_discount_amount}} ¥</em></p>
            <p>支付金额: <em class="strong">{{orderData.order_payment_amount}} ¥</em></p>
          </div>
        </div>
       
      </div>
      
      <el-dialog title="配送" :visible.sync="dialogFormVisible" width="480px">
      <el-form :model="form" ref="form" style="padding:0 40px 0 20px">
        <el-form-item label="配送员" prop="shipping_contacter" label-width="80px">
          <el-input v-model="form.shipping_contacter" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="联系方式" prop="shipping_mobile" label-width="80px">
          <el-input v-model="form.shipping_mobile" autocomplete="off"></el-input>
        </el-form-item>


        <el-form-item label="备注" prop="shipping_explain" label-width="80px">
          <el-input type="textarea" v-model="form.shipping_explain"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
      </div>

    </el-dialog>

    </el-card>

  
</template>
<script>
import { orderDetail,orderStatus,modifyOrderStatus,shippingAdd,pickUp } from '@/api/order'
export default {
    data() {
      return {
        order_id:'',
        orderData : {},
        dialogFormVisible:false,
        loading:false,
        //active:0,
        form:{
          order_id:'',
          shipping_contacter:'',
          shipping_mobile:'',
          shipping_explain:''
        },
      }
    },
    methods: {
      getOrderData( data ){
        let params = {
          order_title:this.order_title,
          order_id:this.order_id
        };

        Object.assign(params, data);

        this.loading = true;
        orderDetail( params ).then( res => {
          this.orderData = res.data;
          this.loading = false;
        })
      },
      orderStatus(order_id,order_status){
        let params = {
          order_id:order_id,
          order_status:order_status
        };
        
        orderStatus( params ).then( res => {
          this.orderData.order_status = res.data.order_status;
          this.orderData.order_status_name = res.data.order_status_name;
        })
      },
       modifyOrderStatus(order_id,order_status ){
        modifyOrderStatus({order_id:order_id,order_status:order_status}).then( res => {
          if( res.status === 200 ){
            this.$message({
              showClose: true,
              message: '操作成功',
              type: 'success'
            });

            this.orderData.order_status = res.data.order_status;
          } else {
            this.$message.error(res.msg);
          }
        })
      },
      onSubmit( formName ) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.form.order_id = this.order_id;
            shippingAdd( this.form ).then( res => {
              if( res.status === 200 ){
                this.$message({
                  showClose: true,
                  message: '操作成功',
                  type: 'success'
                });

                this.getOrderData();
            
              } else {
                this.$message.error(res.msg);
              }
              this.dialogFormVisible = false;
            })
          } else {
            this.$message.error(res.msg);
            return false;
          }
        });
      },
      returnDetail(id){
        this.$router.push("returnDetail/" + id);
      },
      pickUp(){
        pickUp({order_id:this.order_id}).then( res => {
          if( res.status === 200 ){
            this.$message({
              showClose: true,
              message: '操作成功',
              type: 'success'
            });
            this.orderData.order_status = res.data.order_status;
          } else {
            this.$message.error(res.msg);
          }
        })
      },
      goback() {
        this.$router.go(-1);
      },
      refresh(){
        this.getOrderData()
      }
    },
    computed:{
      active: function () {
        let active = 0;
        let orderData = this.orderData;
        if( orderData.order_status ){
          if( orderData.order_status == 1){
            active = 1;
          }else if( orderData.order_status == 2 || orderData.order_status == 3 ){
            active = 2;
          }else if( orderData.order_status == 4 ){
            active = 3;
          }else if( orderData.order_status == 5 ){
            active = 4;
          }
        }
        return active;
      }
    },
    created(){
      if( this.$route.params.id ){
        this.order_id = this.$route.params.id;
        this.getOrderData();
      }
        
    }
  };
</script>
<style scoped>
.flex {
  display: flex;
}
.block {
  border: 1px solid #EBEEF5;
  background-color: #FFF;
  color: #606266;
  -webkit-transition: .3s;
  transition: .3s;
  margin-bottom:20px;
  font-size: 13px;
  line-height: 30px;
}
.block .left-block,
.block .right-block {
  width: 50%;
  box-sizing: border-box;
}
.block .left-block {
  border-right: 1px solid #EBEEF5;
}
.block .block-content {
  width:100%;
  padding:20px;
  box-sizing: border-box;
}
.block .content-box {
  flex-grow: 1;
}
.step-text {
  font-size: 14px;
  line-height: 24px;
  color: #666;
  margin-top: 10px;
}
.step-text dd {
  font-size: 12px;
  color: #999;
}
.text-line {
  margin: 10px 0;
  border-bottom:1px dashed #ccc;
  list-style:none;
}
.strong {
  font-size:14px;
  color:red;
  font-style:normal
}
.goback {
  cursor: pointer;
}
.refresh {
  margin-right: 10px;
}
.refresh i {
   font-size: 18px;
}
</style>