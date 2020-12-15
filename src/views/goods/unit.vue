<template>
    <el-card class="box-card">
      <div slot="header" class="clearfix" style="position:relative">
        <span>单位管理</span>
        <div class="goback" @click="goback"><i class="el-icon-back back"></i>返回</div>
      </div>

      <div>

        <el-row class="clearfix">
          <div class="el-botton-group pull-left">
              <el-button size="small" @click="handleUnitAdd">添加单位</el-button>
              <el-button size="small" @click="handleBulkDelete">批量删除</el-button>
              <el-button size="small" @click="handleRefresh" icon="el-icon-refresh">刷新</el-button>
          </div>

          <div class="searh-row flex pull-right">
            <el-input size="small" v-model="unit_name" placeholder="请输入单位名称"></el-input>
            <el-button size="small" type="info" plain @click="getUnitData">搜索</el-button>
          </div>
        </el-row>

        <el-table
          :data="unitData.items"
          v-loading="loading"
          @selection-change="handleSelectionChange"
          style="width: 100%;margin-top:20px">
          <el-table-column
            align="center"
            type="selection"
            width="55">
          </el-table-column>

          <el-table-column
            label="单位ID"
            align="center"
            width="120"
            prop="unit_id">
          </el-table-column>
          <el-table-column
            label="单位名称"
            align="center"
            prop="unit_name">
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            width="200"
           >
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleUnitEdit(scope.$index, scope.row)">编辑</el-button>
                <el-popover
                  placement="bottom-end"
                  width="160"
                  :ref="scope.$index"
                >
                  <p>确定删除吗？</p>
                  <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="text" @click="scope._self.$refs[scope.$index].doClose()">取消</el-button>
                      <el-button type="primary" size="mini" @click="scope._self.$refs[scope.$index].doClose();handleUnitDelete(scope.$index, scope.row.unit_id)">确定</el-button>
                  </div>
                   <el-button size="mini" type="danger" slot="reference">删除</el-button>
                </el-popover>
            </template>
          </el-table-column>
      </el-table>

      <el-pagination
        background
        layout="prev, pager, next"
        :total="unitData.records"
        style="padding:20px 0;float:right"
        @current-change="changePage"
        v-if="unitData.total > 1"
        >
      </el-pagination>

      </div>
      

      <el-dialog title="商品单位" :visible.sync="dialogFormVisible" width="480px">
        <el-form :model="form"  ref="form" 
        style="padding:0 40px 0 20px">
          <el-form-item label="单位名称" prop="unit_name" label-width="80px">
            <el-input v-model="form.unit_name" autocomplete="off"></el-input>
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
import { unitLists,unitAdd,unitEdit,unitDel } from '@/api/goods'
export default {
    data() {
      return {
        unitData : {
          page:1,
          records:0,
          total:0,
          more:true,
          items:[]
        },
        form : {
          unit_id:0,
          unit_name:'',
          unit_image:''
        },
        unit_name:'',
        selection:[],
        dialogFormVisible:false,
        popoverVisible:false,
        loading:false
      };
    },
    methods: {
      getUnitData( data ){
        let params = {
          unit_name:this.unit_name,
          rows:10,
          page:1
        };

        Object.assign(params, data);

        this.loading = true;
        unitLists( params ).then( res => {
          this.unitData = res.data;
          this.loading = false;
        })
      },
      changePage( page ){
        this.getUnitData({page:page})
      },
      getIndexById( id ){
        let index = [];
        if( !(id instanceof Array) ) {
          id = [id];
        } 
        for( let i in this.unitData.items ){
         
          if( id.indexOf( this.unitData.items[i].unit_id ) > -1 ){
            index.push( i );
          }
        }
       
        return index;
      },
      
      handleUnitAdd() {
          this.dialogFormVisible = true
      },
      handleUnitEdit(index,row) {
          this.form = row;
          this.dialogFormVisible = true
      },
      handleUnitDelete(index, unit_id) {
        unitDel( {unit_id:unit_id} ).then( res => {
          if( res.status === 200 ){
            this.unitData.items.splice(index,1);

          } else {
            this.$message.error(res.msg);
          }
        })
      },
      handleRefresh(){
        this.getUnitData();
      },
      handleSelectionChange( selection ){
        this.selection = selection;
      },
      handleBulkDelete(){
        let unit_id = this.getSelectionId();
        if( unit_id.length === 0 ) {
          return this.$alert('请勾选单位', '消息提示');
        }
        unitDel( {unit_id:unit_id} ).then( res => {
          if( res.status === 200 ){
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            
            this.getUnitData();
          } else {
            this.$message.error(res.msg);
          }
        })
      },
      getSelectionId(){
        let id = [];
        this.selection.forEach( v => {
          id.push( v.unit_id );
        })
        return id;
      },
      onSubmit( formName ) {
        this.$refs[formName].validate((valid) => {
          if( this.form.unit_id ){
            unitEdit( this.form ).then( res => {
              if( res.status === 200 ){
                  this.$message({
                    message: '操作成功',
                    type: 'success'
                  });

                let i = this.getIndexById( res.data.unit_id );
               
                Object.assign( this.unitData.items[i],res.data);
                this.dialogFormVisible = false;

              } else {
                this.$message.error(res.msg);
              }
            })
          } else {
            unitAdd( this.form ).then( res => {
              if( res.status === 200 ){
                this.$message({
                  message: '操作成功',
                  type: 'success'
                });

                this.unitData.items.push( res.data );
                this.dialogFormVisible = false;
              } else {
                this.$message.error(res.msg);
              }
            })
          }
        });
      },
      goback() {
        this.$router.go(-1);
      }
    },
    created(){
      this.getUnitData();
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

    .action-botton {
      position:absolute;
      top:-6px;
      right:0;
    }
</style>