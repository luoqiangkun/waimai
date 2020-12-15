<template>
    <el-card class="box-card">
      <div slot="header" class="clearfix" style="position:relative">
        <span>订单评论</span>
      </div>
       <el-table
          :data="data.items"
          v-loading="loading"
          style="width: 100%;">
          <el-table-column
            label="订单ID"
            align="center"
            prop="order_id">
          </el-table-column>
          <el-table-column
            label="用户名"
            align="center"
            prop="user_nickname">
          </el-table-column>
          <el-table-column
            label="评论内容"
            align="center"
            prop="comment_content">
          </el-table-column>
           <el-table-column
            label="评论图片"
            align="center"
            prop="comment_image">
             <template slot-scope="scope">
               <img :src="img" :key="img" v-for="img in scope.row.comment_image" style="width:30px;margin-right:5px">
            </template>
          </el-table-column>
           <el-table-column
            label="评论时间"
            align="center"
            prop="comment_time">
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            width="200"
           >
            <template slot-scope="scope">
              <el-button type="primary" size="mini">详情</el-button>
            </template>
          </el-table-column>
      </el-table>

      <el-pagination
        background
        layout="prev, pager, next"
        :total="data.records"
        style="padding:20px 0;float:right"
        @current-change="changePage"
        v-if="data.total > 1"
        >
      </el-pagination>
    </el-card>
</template>
<script>
import { commentLists } from '@/api/order'
console.log( commentLists )
export default {
    data() {
      return {
        data : {
          page:1,
          records:0,
          total:0,
          more:true,
          items:[]
        },
        loading:false
      };
    },
    methods: {
      getData( data ){
        let params = {
          rows:10,
          page:1
        };

        Object.assign(params, data);

        this.loading = true;
        commentLists( params ).then( res => {
          this.data = res.data;
          this.loading = false;
        })
      },
      changePage( page ){
        this.getData({page:page})
      },
     
      handleRefresh(){
        this.getData();
      },
    
      goback() {
        this.$router.go(-1);
      }
    },
    created(){
      this.getData();
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