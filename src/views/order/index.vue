<template>
    <el-card class="box-card">
      <el-row class="clearfix">
        <div class="searh-row flex">
          <el-input size="small" v-model="order_title" placeholder="请输入订单编号" style="width:200px"></el-input>
          <el-button size="small" type="info" plain @click="getOrderData">搜索</el-button>
        </div>
      </el-row>

      <table class="table" style="border:0">
        <thead>
          <tr class="bg-dark">
            <td>商品信息</td>
            <td class="text-center" style="width:100px">实付金额</td>
            <td class="text-center" style="width:100px">支付方式</td>
            <td class="text-center" style="width:100px">订单状态</td>
            <td class="text-center" style="width:150px">配送信息</td>
            <td class="text-center" style="width:100px">买家信息</td>
            <td class="text-center" style="width:100px">操作</td>
          </tr>
        </thead>
      </table>
   
      <table class="table" :key="order.order_id" v-for="order in orderData.items">
        <thead>
          <tr class="bg-light">
            <td colspan="7" class="bd-bottem">
              <span>{{order.order_id}}</span>
              <span>下单时间：{{order.order_time}}</span>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr :key="item.order_item_id" v-for="(item,key) in order.items">
            <td class="bd-right" :class="{multiple:order.items.length > 1}">
              <div class="goods-box">
                <img class="goods-image" :src="item.item_image" >
                <dl class="goods-info">
                  <dt>{{item.item_name}}</dt>
                  <dd>¥{{item.order_item_price}} x {{item.order_item_quantity}}</dd>
                </dl>
              </div>
            </td>
            <td class="text-center bd-right" :rowspan="order.items.length" style="width:100px" v-if="key == 0">
              <span style="color:red">¥ {{order.order_payment_amount}}</span>
            </td>
            <td class="text-center bd-right" :rowspan="order.items.length" style="width:100px" v-if="key == 0">
              {{order.payment_name}}
            </td>
            <td class="text-center bd-right" :rowspan="order.items.length" style="width:100px" v-if="key == 0">
              <el-tag size="medium">{{ order.order_status_name }}</el-tag>
            </td>
            <td class="text-center bd-right" :rowspan="order.items.length" style="width:150px;" v-if="key == 0">
              <p>配送方式：
                <span v-if="order.delivery_type == 1">骑手配送</span>
                <span v-else-if="order.delivery_type == 2">到店自取</span>
                <span v-else-if="order.delivery_type == 3">商家自配</span>
                <span v-else></span>
              </p>
              <template v-if="order.delivery_type == 1">
                <p>配送状态：{{order.runner_state_name}}</p>
                <p>配送费用：{{order.freight}} ¥</p>
              </template>
              <template v-if="order.delivery_type == 3">
                <p>配送费用：{{order.freight}} ¥</p>
              </template>
              
            </td>
            <td class="text-center bd-right" :rowspan="order.items.length" style="width:100px" v-if="key == 0">
              {{order.buyer_name}}
            </td>

            <td class="text-center bd-right" :rowspan="order.items.length" style="width:100px" v-if="key == 0">
              <el-button size="mini" type="primary" @click="detail(order.order_id)">详情</el-button>
            </td>

          </tr>
        </tbody>
      </table>

      <el-pagination
        background
        layout="prev, pager, next"
        :total="orderData.records"
        style="padding:20px 0;float:right"
        @current-change="changePage"
        v-if="orderData.total > 1"
        >
      </el-pagination>
    </el-card>
</template>
<script>
import { orderLists } from '@/api/order'
export default {
    data() {
      return {
        orderData : {
          page:1,
          records:0,
          total:0,
          more:true,
          items:[]
        },
        order_id:'',
        return_id:'',
        selection:[],
        loading:false,
        activeName:'first',
        order_title:''
      };
    },
    methods: {
      getOrderData( data ){
        let params = {
          order_id:this.order_title,
          rows:10,
          page:1,
          from:'store'
        };

        Object.assign(params, data);

        this.loading = true;
        orderLists( params ).then( res => {
          this.orderData = res.data;
          this.loading = false;
        })
      },
      changePage( page ){
        this.getOrderData({page:page})
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      detail(id){
        this.$router.push("orderDetail/" + id);
      },
      returnDetail(id){
        this.$router.push("returnDetail/" + id);
      },
      goback() {
        this.$router.go(-1);
      }
    },
    created(){
      this.getOrderData();
    }
  };
</script>
<style>
.flex {
  display:flex;
}
.pull-left {
  float:left;
}
.pull-right {
  float:right;
}
.table {
  width: 100%;
  font-size:14px;
  border: 1px solid #dddee1;
  margin-top: 15px;
  border-spacing:0;  
  color: #606266;
}
.table th,
.table td {
  padding:12px 10px;
}
.bd-bottem {
  border-bottom:1px solid #dddee1;
}

.bd-right {
  border-right:1px solid #dddee1;
}
.bd-bottem {
  border-bottom:1px solid #dddee1;
}
.bd-top {
  border-top:1px solid #dddee1;
}
.bg-dark {
  background-color: #f8f8f9;
}
.bg-light {
  background-color: #e8f7f6;
}
.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}
.goods-box {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.goods-box .goods-image {
  width: 80px;
}

.goods-box .goods-info{
  line-height: 20px;
  margin-left: 10px;
} 
.multiple {
  padding: 5px 0;
}
.multiple .goods-image {
  width: 60px;
}

</style>