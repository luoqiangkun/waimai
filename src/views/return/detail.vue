<template>
    <el-card class="box-card">
      <div slot="header" class="clearfix" style="position:relative">
        <span>退单详情</span>
          <div class="goback" @click="goback"><i class="el-icon-back back"></i>返回</div>
      </div>
      <div class="container">
  
        <div class="block flex">
           <div class="left-block">
            <div class="block-content flex">
              <div class="icon-box" style="color:#67c23a;font-size:30px;width:40px">
                <i class="el-icon-success"></i>
              </div>
              <div class="content-box">
                <h3>退单状态：{{returnData.return_state_name}}</h3>
                <p style="font-size:13px;">用户提交退款退货申请时，请及时处理，超过24小时未处理，系统将自动处理确认通过</p>
                
                <div class="text-line"></div>
                <div>退单编号：{{returnData.return_id}}</div>
                <div>订单编号：{{returnData.order_id}}</div>
                <div>退单时间：{{returnData.return_add_time}}</div>
                <div>退款原因：{{returnData.return_reason}}</div>
                <div v-if="returnData.return_buyer_message">退款说明：{{returnData.return_buyer_message}}</div>

                <template v-if="returnData.return_state_id == 1">
                  <div class="text-line"></div>

                  <div class="flex" style="margin-top:20px" >
                    <el-button type="warning" size="mini" @click="modifyReturnState(2)">确认退单</el-button>
                    <el-button type="danger" size="mini" @click="modifyReturnState(3)">拒绝退单</el-button>
                  </div>
                </template>
      
              </div>
            </div>
          </div>
          <div class="right-block" style="padding-left:40px">
            <div class="block-content">
              <h3>退款退货流程</h3>
              <div class="text-line"></div>
              <div style="height: 180px;margin-top:15px">
                
                <el-steps direction="vertical" :active="returnData.return_timeline.length" align-center>
                  <el-step :key="index" v-for="(item,index) in returnData.return_timeline">
                    <dl class="step-text" slot="title">
                      <dt>{{item.content}}</dt>
                      <dd>{{item.time}}</dd>
                    </dl>
                  </el-step>
                  
                </el-steps>
              </div>
            </div>
          </div>
         
        </div>
        <div class="block">
           <el-table
          :data="returnData.items"
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
            </el-table-column>
            <el-table-column
                label="商品单价"
                align="center"
                prop="item_price">
            </el-table-column>
            <el-table-column
                label="退货数量"
                align="center"
                prop="return_item_num">
            </el-table-column>
            <el-table-column
                label="退款金额"
                align="center"
                prop="return_item_refund_amount">
            </el-table-column>
          </el-table>
          <div style="margin: 20px 20px;text-align:right">
            <span>退款金额: <em class="strong">{{returnData.return_refund_amount}} ¥</em></span>
          </div>
        </div>
       
      </div>
    </el-card>
</template>
<script>
import { returnDetail,modifyReturnState } from '@/api/order'
export default {
    data() {
      return {
        return_id:'',
        returnData : {},
        loading:false
      }
    },
    methods: {
      getreturnData( data ){
        let params = {
          return_id:this.return_id
        };

        Object.assign(params, data);

        this.loading = true;
        returnDetail( params ).then( res => {
          this.returnData = res.data;
          this.loading = false;
        })
      },
    
       modifyReturnState(return_id,return_state_id ){
        modifyReturnState({return_id:return_id,return_state_id:return_state_id}).then( res => {
          if( res.status === 200 ){
            this.$message({
              showClose: true,
              message: '操作成功',
              type: 'success'
            });

            this.returnData.return_state_id = res.data.return_state_id;
          } else {
            this.$message.error(res.msg);
          }
        })
      },
      goback() {
        this.$router.go(-1);
      }
    },
    created(){
      if( this.$route.params.id ){
        this.return_id = this.$route.params.id;
        this.getreturnData();
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
.step-text {
  font-size: 14px;
  line-height: 24px;
  color: #666;
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
.el-table td, .el-table th {
  padding: 0 !important;
}
.strong {
  font-size:14px;
  color:red;
  font-style:normal
}
</style>