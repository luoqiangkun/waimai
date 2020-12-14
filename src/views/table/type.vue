<template>
    <el-card class="box-card">
      <div slot="header" class="clearfix" style="position:relative">
        <span>类型管理</span>
        <div class="goback" @click="goback"><i class="el-icon-back back"></i>返回上一级</div>
      </div>

      <div>

        <el-row class="clearfix">
          <div class="el-botton-group pull-left">
              <el-button size="small" @click="handleTypeAdd">添加类型</el-button>
              <el-button size="small" @click="handleBulkDelete">批量删除</el-button>
              <el-button size="small" @click="handleRefresh" icon="el-icon-refresh">刷新</el-button>
          </div>

          <div class="searh-row flex pull-right">
            <el-input size="small" v-model="type_name" placeholder="请输入类型名称"></el-input>
            <el-button size="small" type="info" plain @click="getTypeData">搜索</el-button>
          </div>
        </el-row>

        <el-table
          :data="tableData.items"
          v-loading="loading"
          @selection-change="handleSelectionChange"
          style="width: 100%;margin-top:20px">
          <el-table-column
            align="center"
            type="selection"
            width="55">
          </el-table-column>

          <el-table-column
            label="类型ID"
            align="center"
            width="120"
            prop="type_id">
          </el-table-column>
          <el-table-column
            label="类型名称"
            align="center"
            prop="type_name">
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            width="200"
           >
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleTypeEdit(scope.$index, scope.row)">编辑</el-button>
                <el-popover
                  placement="bottom-end"
                  width="160"
                  :ref="scope.$index"
                >
                  <p>确定删除吗？</p>
                  <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="text" @click="scope._self.$refs[scope.$index].doClose()">取消</el-button>
                      <el-button type="primary" size="mini" @click="scope._self.$refs[scope.$index].doClose();handleTypeDelete(scope.$index, scope.row.type_id)">确定</el-button>
                  </div>
                   <el-button size="mini" type="danger" slot="reference">删除</el-button>
                </el-popover>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          background
          layout="prev, pager, next"
          :total="tableData.records"
          style="padding:20px 0;float:right"
          @current-change="changePage"
          v-if="tableData.total > 1"
          >
        </el-pagination>
      
      </div>
      

      <el-dialog title="桌台类型" :visible.sync="dialogFormVisible" width="480px">
        <el-form :rules="rules" :model="form"  ref="form" 
        style="padding:0 40px 0 20px">
          <el-form-item label="类型名称" prop="type_name" label-width="80px">
            <el-input v-model="form.type_name" autocomplete="off"></el-input>
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
import { tableTypeLists,tableTypeAdd,tableTypeEdit,tableTypeDelete } from '@/api/base'

export default {
    data() {
      return {
        tableData : {
          page:1,
          records:0,
          total:0,
          more:true,
          items:[]
        },
        form : {
          type_id:0,
          type_name:''
        },
        rules: {
          type_name: [
            { required: true, message: '请输入桌台名称', trigger: 'blur' }
          ]
        },
        type_name:'',
        selection:[],
        dialogFormVisible:false,
        popoverVisible:false,
        loading:false
      };
    },
    methods: {
      getTypeData( data ){
        let params = {
          type_name:this.type_name,
          rows:10,
          page:1
        };

        Object.assign(params, data);

        this.loading = true;
        tableTypeLists(params).then( res => {
          this.tableData = res.data;
          this.loading = false;
        })
      },
      changePage( page ){
        this.tableTypeLists({page:page})
      },
      getIndexById( id ){
        let index = [];
        if( !(id instanceof Array) ) {
          id = [id];
        } 
        for( let i in this.tableData.items ){
         
          if( id.indexOf( this.tableData.items[i].type_id ) > -1 ){
            index.push( i );
          }
        }
       
        return index;
      },
      
      handleTypeAdd( ) {
          this.dialogFormVisible = true
      },
      handleTypeEdit(index,row) {
          this.form = row;
          this.dialogFormVisible = true
      },
      handleTypeDelete(index, type_id) {
        tableTypeDelete( {type_id:type_id} ).then( res => {
          if( res.status === 200 ){
            this.tableData.items.splice(index,1);

          } else {
            this.$message.error(res.msg);
          }
        })
      },
      handleRefresh(){
        this.getTypeData();
      },
     
      handleSelectionChange( selection ){
        this.selection = selection;
      },
      handleBulkDelete(){
        let type_id = this.getSelectionId();
        if( type_id.length === 0 ) {
          return this.$alert('请勾选类型', '消息提示');
        }
        tableTypeDelete( {type_id:type_id} ).then( res => {
          if( res.status === 200 ){
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            
            this.getTypeData();
          } else {
            this.$message.error(res.msg);
          }
        })
      },
      getSelectionId( selection ){
        let id = [];
        this.selection.forEach( v => {
          id.push( v.type_id );
        })
        return id;
      },
      onSubmit( formName ) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if( this.form.type_id ){
              tableTypeEdit( this.form ).then( res => {
                if( res.status === 200 ){
                  let i = this.getIndexById( res.data.type_id );
                  Object.assign( this.tableData.items[i],res.data);
                  this.dialogFormVisible = false;
                } else {
                  this.$message.error(res.msg);
                }
              })
            } else {
              tableTypeAdd( this.form ).then( res => {
                if( res.status === 200 ){
                  this.tableData.items.push( res.data );
                  this.dialogFormVisible = false;
                } else {
                  this.$message.error(res.msg);
                }
              })
            }
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      goback() {
        this.$router.go(-1);
      }
    },
    created(){
      this.getTypeData();
    }
  };
</script>
<style scoped>
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
</style>