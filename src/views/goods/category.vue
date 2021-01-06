<template>
    <el-card class="box-card">
      <div slot="header" class="clearfix" style="position:relative">
        <span>分类管理</span>
          <div class="goback" @click="goback"><i class="el-icon-back back"></i>返回</div>
      </div>

      <div>

        <el-row class="clearfix">
          <div class="el-botton-group pull-left">
              <el-button size="small" @click="handleCateAdd">添加分类</el-button>
              <el-button size="small" @click="handleBulkDelete">批量删除</el-button>
              <el-button size="small" @click="handleRefresh" icon="el-icon-refresh">刷新</el-button>
          </div>

          <div class="searh-row flex pull-right">
            <el-input size="small" v-model="category_name" placeholder="请输入分类名称"></el-input>
            <el-button size="small" type="info" plain @click="getCateData">搜索</el-button>
          </div>
        </el-row>

        <el-table
          :data="cateData.items"
          v-loading="loading"
          @selection-change="handleSelectionChange"
          style="width: 100%;margin-top:20px">
          <el-table-column
            align="center"
            type="selection"
            width="55">
          </el-table-column>

          <el-table-column
            label="分类ID"
            align="center"
            width="120"
            prop="category_id">
          </el-table-column>
          <el-table-column
            label="分类名称"
            align="center"
            prop="category_name">

            <template slot-scope="scope">
              <span>{{scope.row.category_name}}</span>
              <el-tag size="mini" v-if="scope.row.category_property == 1">必须分类</el-tag>
            </template>

          </el-table-column>
          <el-table-column
            label="分类图片"
            align="center"
            prop="category_image">
            <template slot-scope="scope">
              <el-image
              style="width: 50px; height: 50px"
              :src="scope.row.category_image"
              fit="fill"></el-image>
            </template>
          </el-table-column>

          <el-table-column
            label="分类排序"
            align="center"
            prop="category_order">
          </el-table-column>

          <el-table-column
            align="center"
            label="操作"
            width="200"
           >
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleCateEdit(scope.$index, scope.row)">编辑</el-button>
                <el-popover
                  placement="bottom-end"
                  width="160"
                  :ref="scope.$index"
                >
                  <p>确定删除吗？</p>
                  <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="text" @click="scope._self.$refs[scope.$index].doClose()">取消</el-button>
                      <el-button type="primary" size="mini" @click="scope._self.$refs[scope.$index].doClose();handleCateDelete(scope.$index, scope.row.category_id)">确定</el-button>
                  </div>
                   <el-button size="mini" type="danger" slot="reference">删除</el-button>
                </el-popover>
            </template>
          </el-table-column>
      </el-table>

      <el-pagination
        background
        layout="prev, pager, next"
        :total="cateData.records"
        style="padding:20px 0;float:right"
        @current-change="changePage"
        v-if="cateData.total > 1"
        >
      </el-pagination>

      </div>
      

      <el-dialog title="商品分类" :visible.sync="dialogFormVisible" width="600px">
        <el-form :model="form"  ref="form" 
        style="padding:0 40px 0 20px">
          <el-form-item label="分类名称" prop="category_name" label-width="80px">
            <el-input v-model="form.category_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="分类图片" prop="category_image" label-width="80px">
          <el-upload
            class="image-uploader category_image"
            :action="uploadUrl"
            name="upfile"
            :on-success="handleUploadSuccess"
            :show-file-list="false"
          >
            <img v-if="form.category_image" :src="form.category_image" class="image" />
            <i v-else class="el-icon-plus image-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="分类属性" prop="category_property" label-width="80px">
          <el-checkbox v-model="form.category_property">下单必选分类</el-checkbox>
          <div style="line-height:20px;color:#999">
            设置为下单必选分类时，顾客下单时必须选择改分类下至少一个商品才能成功下单，每个店铺只能设置一个必选分类
          </div>
         
        </el-form-item>

        <el-form-item label="分类排序" prop="category_order" label-width="80px">
          <el-input v-model="form.category_order" autocomplete="off"></el-input>
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
import { cateLists,cateAdd,cateEdit,cateDel } from '@/api/goods'
import {SYSURL} from '@/http/url'
export default {
    data() {
      return {
        cateData : {
          page:1,
          records:0,
          total:0,
          more:true,
          items:[]
        },
        form : {
          category_id:0,
          category_name:'',
          category_image:'',
          category_property:0,
          category_order:''
        },
        category_name:'',
        selection:[],
        uploadUrl:SYSURL.upload,
        dialogFormVisible:false,
        popoverVisible:false,
        loading:false
      };
    },
    methods: {
      getCateData( data ){
        let params = {
          category_name:this.category_name,
          rows:10,
          page:1
        };

        Object.assign(params, data);

        this.loading = true;
        cateLists( params ).then( res => {
          this.cateData = res.data;
          this.loading = false;
        })
      },
      changePage( page ){
        this.getCateData({page:page})
      },
      getIndexById( id ){
        let index = [];
        if( !(id instanceof Array) ) {
          id = [id];
        } 
        for( let i in this.cateData.items ){
         
          if( id.indexOf( this.cateData.items[i].category_id ) > -1 ){
            index.push( i );
          }
        }
       
        return index;
      },
      
      handleCateAdd() {
          this.dialogFormVisible = true
          this.form = {
            category_id:0,
            category_name:'',
            category_image:'',
            category_property:0,
            category_order:''
          }
      },
      handleCateEdit(index,row) {
          row.category_property = row.category_property ? true : false
          this.form = row;
          this.dialogFormVisible = true
      },
      handleCateDelete(index, category_id) {
        cateDel( {category_id:category_id} ).then( res => {
          if( res.status === 200 ){
            this.cateData.items.splice(index,1);

          } else {
            this.$message.error(res.msg);
          }
        })
      },
      handleRefresh(){
        this.getCateData();
      },
      handleUploadSuccess(res, file) {
        if( res.status === 200 ){
          this.form.category_image = res.data.url;
        }         
      },
      handleSelectionChange( selection ){
        this.selection = selection;
      },
      handleBulkDelete(){
        let category_id = this.getSelectionId();
        if( category_id.length === 0 ) {
          return this.$alert('请勾选分类', '消息提示');
        }
        cateDel( {category_id:category_id} ).then( res => {
          if( res.status === 200 ){
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            
            this.getCateData();
          } else {
            this.$message.error(res.msg);
          }
        })
      },
      getSelectionId(){
        let id = [];
        this.selection.forEach( v => {
          id.push( v.category_id );
        })
        return id;
      },
      onSubmit( formName ) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if( this.form.category_id ){
              let data = this.form
              data.category_property = this.form.category_property ? 1 : 0
              cateEdit( this.form ).then( res => {
                if( res.status === 200 ){
                  let i = this.getIndexById( res.data.category_id );
                  Object.assign( this.cateData.items[i],res.data);
                  this.dialogFormVisible = false;
                } else {
                  this.$message.error(res.msg);
                }
              })
            } else {
              cateAdd( this.form ).then( res => {
                if( res.status === 200 ){
                  this.cateData.items.push( res.data );
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
      this.getCateData();
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
  .category_image .el-upload {
    width:100px;
    height:100px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .category_image .el-upload:hover {
    border-color: #409EFF;
  }

  .category_image .image {
    width:100%;
  }

  .category_image .image-uploader-icon {
    width:100%;
    height:100%;
    font-size: 28px;
    color: #8c939d;
    text-align: center;
  }
  .category_image .image-uploader-icon {
    line-height:100px;
  }
  

</style>