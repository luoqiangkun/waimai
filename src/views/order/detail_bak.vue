<template>
    <el-card class="box-card">
      <div slot="header" class="clearfix" style="position:relative">
        <span>订单详情</span>
          <div class="goback" @click="goback"><i class="el-icon-back back"></i>返回上一级</div>
      </div>
      <div style="width:800px">
        <el-row>
            <h3>{{orderData.order_status_name}}</h3>

            <div class="bgground flex" v-if="orderData.order_status === 2 || orderData.return_row" >
    
                <template v-if="orderData.order_status === 2">
                    <el-button type="primary" size="mini" @click="modifyOrderStatus(orderData.order_id,3,orderData.index)">确认接单</el-button>
                    <el-button type="danger" size="mini" @click="modifyOrderStatus(orderData.order_id,6,orderData.index)">拒绝接单</el-button>
                </template>

                <template v-if="orderData.order_status === 3 && orderData.delivery_type === 3">
                  <el-button type="primary" @click="dialogFormVisible = !dialogFormVisible">配送</el-button>
                </template>

                <el-button type="info" size="mini" @click="returnDetail(orderData.return_row.return_id)" v-if="orderData.return_row">退款信息</el-button>

            </div>

            <div>订单编号：{{orderData.order_id}}</div>
            <div>下单时间：{{orderData.order_time}}</div>
            <div>支付方式：在线支付</div>
            <div>配送方式：
                <span v-if="orderData.delivery_type == 1">骑手配送</span>
                <span v-else-if="orderData.delivery_type == 2">到店自取</span>
                <span v-else-if="orderData.delivery_type == 3">商家自配</span>
            </div>

        </el-row>

        <el-row class="mgr20">
            <h3>商品信息</h3>
            <div class="bgground">
                <el-table
                :data="orderData.items"
                v-loading="loading"
                border
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
            </div>
            <div>
                <div>打包费：¥{{orderData.order_cutlery_fee}}</div>
                <div>配送费：¥{{orderData.order_cutlery_fee}}</div>
                
            </div>
        </el-row>
        
       
        <el-row class="mgr20"  v-if="orderData.delivery_type == 1 || orderData.delivery_type == 3">
          <template>
            <h3>收货信息</h3>
            <div>收货人：{{orderData.delivery.da_contacter}}</div>
            <div>收货地址：{{orderData.delivery.da_address}}</div>
            <div>联系方式：{{orderData.delivery.da_mobile}}</div>
          </template>
        </el-row>

        <el-row class="mgr20"  v-else>
          <template>
            <h3>取货信息</h3>
            <div>预约电话：{{orderData.telephone}}</div>
            <div>预约时间：{{orderData.pickup_time}}</div>
        
          </template>
        </el-row>


        <el-row class="mgr20" v-if="orderData.delivery_type == 1">
          <template>
            <h3>配送信息</h3>
            <div>期望时间：立即配送</div>
            <div>配送地址：{{orderData.delivery.da_address}}</div>
            <div>配送服务：骑手配送</div>
            <div>配送骑手：{{orderData.rider_row ? orderData.rider_row.user_realname : ''}}</div>
            <div>联系方式：{{orderData.rider_row ? orderData.rider_row.user_mobile : ''}}</div>
          </template>
        </el-row>

        <el-row class="mgr20" v-if="orderData.delivery_type == 3">
          <template>
            <h3>配送信息</h3>
            <div>期望时间：立即配送</div>
            <div>配送地址：{{orderData.delivery.da_address}}</div>
            <div>配送服务：商家自配</div>
            <div>配送人：{{orderData.shipping ? orderData.shipping.shipping_contacter : ''}}</div>
            <div>联系方式：{{orderData.shipping ? orderData.shipping.shipping_mobile : ''}}</div>
          </template>
        </el-row>
      
     
        
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
import { orderDetail,orderStatus,modifyOrderStatus,shippingAdd } from '@/api/order'
export default {
    data() {
      return {
        order_id:'',
        orderData : {},
        order_title:'',
        selection:[],
        dialogFormVisible:false,
        popoverVisible:false,
        loading:false,
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
            this.form.order_id = this.orderInfoData.order_id;
            shippingAdd( this.form ).then( res => {
              if( res.status === 200 ){
                this.$message({
                  showClose: true,
                  message: '操作成功',
                  type: 'success'
                });

                this.orderListsData.items[this.orderInfoData.index].order_status = res.data.order_status;
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
      goback() {
        this.$router.go(-1);
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
.el-row {
  color: #666;
  line-height: 20px;
  font-size: 14px;
}
.bgground {
    padding: 15px 15px;
    background-color: #fafafa;
    border: 1px solid #eaeefb;
    margin-bottom: 15px;
    border-radius: 4px;
    -webkit-font-smoothing: auto;
}
.goback{
    display: inline-block;
    float:right;
    vertical-align: middle;
    color: #409EFF;
  }
.back{
    font-size: 21px;
    vertical-align: middle;
    color: #409EFF;
}
.mgr20 {
  margin: 20px 0;
}
h3 {
  margin-bottom: 10px;
}
</style>