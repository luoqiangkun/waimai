<template>
  <div>
     <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>创建活动</span>
      </div>

      <div>
        <el-row :gutter="40">
            <el-col :sm="12" :lg="8" :xl="6" >
              <el-card shadow="always">
                <div class="block">
                  <div class="icon el-button--warning">
                    特
                  </div>

                  <div class="info">
                    <h4>特价活动</h4>
                    <span>特价活动</span>
                  </div>

                  <el-button size="small" type="primary" @click="addActivityBargain">创建活动</el-button>
                </div>
              </el-card>
            </el-col>
            
            <el-col :sm="12" :lg="8" :xl="6" >
              <el-card shadow="always">
                <div class="block">
                  <div class="icon el-button--danger">
                    减
                  </div>

                  <div class="info">
                    <h4>满减活动</h4>
                    <span>满减活动</span>
                  </div>

                  <el-button size="small" type="primary" @click="addActivityReduction">创建活动</el-button>
                </div>
              </el-card>
            </el-col>


          </el-row>
      </div>
    </el-card>

    <el-card class="box-card" style="margin-top:20px;padding-bottom:20px">
      <div slot="header" class="clearfix">
        <span>活动列表</span>
      </div>
         
      <div>
        <el-table
          ref="multipleTable"
          :data="tableData.items"
          tooltip-effect="dark"
          style="width: 100%"
          v-loading="loading"
          border
          @selection-change="handleSelectionChange">
          <el-table-column
            align="center"
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            align="center"
            label="活动名称"
            prop="activity_name"
            width="180">
            <template slot-scope="scope">
                <div class="block" v-if="scope.row.activity_type_id === 1">
                  <div class="icon icon-sm el-button--danger" >
                    减
                  </div>

                  <div class="name">
                   {{ scope.row.activity_name }}
                  </div>
                </div>

                <div class="block" v-if="scope.row.activity_type_id === 2">
                  <div class="icon icon-sm el-button--warning" >
                    特
                  </div>

                  <div class="name">
                   {{ scope.row.activity_name }}
                  </div>
                </div>

            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="activity_state"
            label="活动状态"
            width="120">
            <template slot-scope="scope">{{ scope.row.activity_state_name }}</template>
          </el-table-column>

          <el-table-column
            align="center"
            label="活动时间"
            width="180">
            <template slot-scope="scope">
              <p>{{ scope.row.activity_starttime }}</p>
              <p>至</p>
              <p>{{ scope.row.activity_endtime }}</p>
                
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            prop="name"
            label="活动内容"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.activity_type_id === 1">
                <p :key="i" v-for="( rule,i) in scope.row.activity_rule.rules ">满{{rule.total}}元,减{{rule.minus}}元</p>
              </div>
              <div v-if="scope.row.activity_type_id === 2">
                {{scope.row.activity_rule.rules ? scope.row.activity_rule.rules.length : 0}}件商品参与了活动
              </div>
            </template>
          </el-table-column>

           <el-table-column
              align="center"
              label="操作"
              width="180"
             >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleActivityEdit(scope.$index, scope.row)" v-if="scope.row.activity_state == 0 || scope.row.activity_state == 1">编辑</el-button>

                <el-button
                  size="mini"
                  disabled
                  v-else
                >编辑</el-button>

                <el-popover
                  placement="bottom-end"
                  width="160"
                  :ref="scope.$index"
                  v-if="scope.row.activity_state == 0 || scope.row.activity_state == 2 || scope.row.activity_state == 3"
                >
                  <p>确定删除吗？</p>
                  <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="text" @click="scope._self.$refs[scope.$index].doClose()">取消</el-button>
                      <el-button type="primary" size="mini" @click="scope._self.$refs[scope.$index].doClose();handleActivityDelete(scope.$index, scope.row.activity_id)">确定</el-button>
                  </div>
                   <el-button size="mini" type="danger" slot="reference">删除</el-button>


                </el-popover>

                <el-button
                  size="mini"
                  type="danger"
                  disabled
                  v-else
                >删除</el-button>

              </template>


            </el-table-column>
        </el-table>

        <el-pagination style="float:right;margin-top:10px" background layout="prev, pager, next" :total="tableData.records" @current-change="changePage" position="bottom" v-if="tableData.total > 1"></el-pagination>
      </div>
    </el-card>


  </div>
 
</template>
<script>
  import { activityLists,activityDelete } from '@/api/base'
  export default {
    data() {
      return {
        tableData: {
          page:1,
          records:0,
          total:0,
          items:[]
        },
        popoverVisible : false,
        loading:false
      }
    },
    methods:{
      getTableData( data ){
        let params = {
          rows:10,
          page:1
        };

        Object.assign(params, data);
        this.loading = true;
        activityLists(params).then( res => {
          this.tableData = res.data;
          this.loading = false;
        })
      },
      addActivityBargain(){
        this.$router.push("bargainManage");
      },
      addActivityReduction(){
        this.$router.push("reductionManage");
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleActivityEdit(index,row){
        if( row.activity_type_id === 1 ){
          this.$router.push("reductionManage/" + row.activity_id);
        }

        if( row.activity_type_id === 2 ){
          this.$router.push("bargainManage/" + row.activity_id);
        }
        
      },
      handleActivityDelete( index,id ){
        activityDelete( {activity_id:id}).then ( res => {
          if( res.status === 200 ){
            this.$message({
              message: '删除成功',
              type: 'success'
            });

            this.tableData.items.splice(index,1);
          } else {
            this.$message.error(res.msg);
          }
          this.popoverVisible = false
        })
      },
      fixActivityRule(){

      },
      changePage( page ){
        this.getTableData({page:page})
      },
    },
    created(){
      this.getTableData();
    }
  }
</script>
<style scoped>
.block {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  padding: 10px;
}
.block .icon {
  width: 55px;
  height: 55px;
  border-radius: 10px;
  line-height: 55px;
  text-align: center;
  font-size: 28px;
} 
.block .icon-sm {
  width:30px;
  height: 30px;
  border-radius: 5px;
  line-height: 30px;
  text-align: center;
  font-size: 20px;
}
.block .info {
  height: 100%;
  margin-left:10px;
  display:block;
  flex-grow:1;
}
.block .name {
  height: 100%;
  margin-left:10px;
  display:block;
}
.block .info h4 {
  color:#666;
  font-size:16px;
  font-weight:0;
}
.block .info span {
  font-size:14px;
  color:#999;
  display: inline-block;
  margin-top:5px;
}

</style>