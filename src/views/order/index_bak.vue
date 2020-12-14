<template>
    <el-card class="box-card">
      <el-tabs v-model="activeName">
        <el-tab-pane label="销售订单" name="first">
          <el-row class="clearfix">
            <div class="searh-row flex">
              <el-input size="small" v-model="order_title" placeholder="请输入订单编号" style="width:200px"></el-input>
              <el-button size="small" type="info" plain @click="getOrderData">搜索</el-button>
            </div>
          </el-row>

          <el-table
            :data="orderData.items"
            v-loading="loading"
            @selection-change="handleSelectionChange"
            style="width: 100%;margin-top:20px">
            <el-table-column
              align="center"
              type="selection"
              width="55">
            </el-table-column>

            <el-table-column
              label="订单编号"
              align="center"
              prop="order_id">
            </el-table-column>
            <el-table-column
              label="订单金额"
              align="center"
              prop="order_payment_amount">
            </el-table-column>
            <el-table-column
              label="订单状态"
              align="center"
              prop="order_status_name">
            </el-table-column>
            <el-table-column
              label="下单时间"
              align="center"
              prop="order_time">
            </el-table-column>
            <el-table-column
              align="center"
              label="操作"
              width="120"
            >
            <template slot-scope="scope">
                <el-button size="mini" type="danger" slot="reference" @click="detail(scope.row.order_id)">查看详情</el-button>
            </template>
            </el-table-column>
          </el-table>

          <el-pagination
            background
            layout="prev, pager, next"
            :total="orderData.records"
            style="padding:20px 0;float:right"
            @current-change="changePage"
            v-if="orderData.total > 1"
            >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="退款订单" name="second">
          <el-row class="clearfix">
            <div class="searh-row flex">
              <el-input size="small" v-model="order_title" placeholder="请输入订单编号" style="width:200px"></el-input>
              <el-button size="small" type="info" plain @click="getOrderData">搜索</el-button>
            </div>
          </el-row>

          <el-table
            :data="returnData.items"
            v-loading="loading"
            @selection-change="handleSelectionChange"
            style="width: 100%;margin-top:20px">
            <el-table-column
              align="center"
              type="selection"
              width="55">
            </el-table-column>
             <el-table-column
              label="退款编号"
              align="center"
              prop="return_id">
            </el-table-column>
            <el-table-column
              label="订单编号"
              align="center"
              prop="order_id">
            </el-table-column>
            <el-table-column
              label="退款金额"
              align="center"
              prop="return_refund_amount">
            </el-table-column>
            <el-table-column
              label="退款状态"
              align="center"
              prop="return_state_name">
            </el-table-column>
            <el-table-column
              label="退款时间"
              align="center"
              prop="return_add_time">
            </el-table-column>
            <el-table-column
              align="center"
              label="操作"
              width="120"
            >
            <template slot-scope="scope">
                <el-button size="mini" type="danger" slot="reference" @click="returnDetail(scope.row.return_id)">查看详情</el-button>
            </template>
            </el-table-column>
          </el-table>

          <el-pagination
            background
            layout="prev, pager, next"
            :total="orderData.records"
            style="padding:20px 0;float:right"
            @current-change="changePage"
            v-if="orderData.total > 1"
            >
          </el-pagination>
        </el-tab-pane>
		  </el-tabs>
      
    </el-card>
</template>
<script>
import { orderLists,returnLists } from '@/api/order'
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
        returnData : {
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
          page:1
        };

        Object.assign(params, data);

        this.loading = true;
        orderLists( params ).then( res => {
          this.orderData = res.data;
          this.loading = false;
        })
      },
      getReturnData( data ){
        let params = {
          return_id:this.return_id,
          rows:10,
          page:1
        };

        Object.assign(params, data);

        this.loading = true;
        returnLists( params ).then( res => {
          this.returnData = res.data;
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
      this.getReturnData();
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
</style>