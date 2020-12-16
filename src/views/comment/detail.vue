<template>
    <el-card class="box-card">
       <div slot="header" class="clearfix" style="position:relative">
        <span>评论详情</span>
          <div class="goback" @click="goback"><i class="el-icon-back back"></i>返回</div>
      </div>

      <div class="block">
        <div class="block-content">
           <h3>订单评价</h3>
          <div class="block-row">
            <label>订单编号:</label>
            {{data.order_id}}
          </div>
          <div class="block-row">
            <label>评价内容：</label>
            {{data.comment_content}}
          </div>
          <div class="block-row">
            <label>评价时间：</label>
            {{data.comment_time}}
          </div>
          <div class="block-row">
            <label>评价图片:</label>
            <img :src="img" :key="img" v-for="img in data.comment_image" style="width:50px;margin-right:5px">
          </div>
        </div>
      </div>

      <div class="block">
        <div class="block-content">
           <h3>店铺评价</h3>
          <div class="block-row">
            <span style="width:50px">总体</span>
            <el-rate v-model="data.commment_store_evaluation" disabled></el-rate>
          </div>
           <div class="block-row">
            <span style="width:50px">口味</span>
            <el-rate v-model="data.commment_store_taste_evaluation" disabled></el-rate>
          </div>
          <div class="block-row">
            <span style="width:50px">包装</span>
            <el-rate v-model="data.commment_store_package_evaluation" disabled></el-rate>
          </div>
        </div>
      </div>

    </el-card>
</template>
<script>
import { commentDetail } from '@/api/order'
export default {
    data() {
      return {
        order_id:'',
        data:{}
      }
    },
    methods:{
      getData(){
        let params = {
          order_id:this.order_id
        };
        this.loading = true;
        commentDetail( params ).then( res => {
          this.data = res.data;
          this.loading = false;
        })
      },
      goback() {
        this.$router.go(-1);
      }
    },
    created(){
      if( this.$route.params.id ){
        this.order_id = this.$route.params.id;
        this.getData();
      }
    }
  }
</script>
<style>
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
  .block .block-content {
    width:100%;
    padding:20px;
    box-sizing: border-box;
  }
  .block-row {
    display: flex;
    align-items:center;
  }
  .block-row label {
    width:80px;
    text-align: left;
    display: inline-block;
  }
  
</style>