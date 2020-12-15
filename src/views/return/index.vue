<template>
    <el-card class="box-card">
      <el-row class="clearfix">
        <div class="searh-row flex">
          <el-input size="small" v-model="order_title" placeholder="请输入订单编号" style="width:200px"></el-input>
          <el-button size="small" type="info" plain @click="getReturnData">搜索</el-button>
        </div>
      </el-row>

       <el-table
        :data="returnData.items"
        v-loading="loading"
        style="width: 100%;margin-top:20px">
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
            <el-button size="mini" type="danger" slot="reference" @click="returnDetail(scope.row.return_id)">详情</el-button>
        </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        layout="prev, pager, next"
        :total="returnData.records"
        style="padding:20px 0;float:right"
        @current-change="changePage"
        v-if="returnData.total > 1"
        >
      </el-pagination>
    </el-card>
</template>
<script>
import { returnLists } from '@/api/order'
export default {
    data() {
      return {
        returnData : {
          page:1,
          records:0,
          total:0,
          more:true,
          items:[]
        },
        return_id:'',
        selection:[],
        loading:false,
        order_title:''
      };
    },
    methods: {
      getReturnData( data ){
        let params = {
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
        this.getReturnData({page:page})
      },
      returnDetail(id){
        this.$router.push("returnDetail/" + id);
      },
      goback() {
        this.$router.go(-1);
      }
    },
    created(){
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