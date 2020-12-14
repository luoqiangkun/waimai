<template>
    <el-card class="box-card">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <div class="el-top">
              <h4 class="title">桌台类型</h4>
              <el-button type="success" size="small" @click="handleTypeManage">类型管理</el-button>
            </div>

            <el-menu
                class="el-menu-vertical"
                @select="handleSelect"
                style="width:auto"
              > 
      
            <el-menu-item :index="0">
                <span slot="title">全部类型</span>
            </el-menu-item>

            <el-menu-item :index="item.type_id" v-for="(item,i) in typeData.items">
              <span slot="title">{{item.type_name}}</span>
            </el-menu-item>
          </el-menu>

          </div>
        </el-col>
        <el-col :span="20">
          <div class="wrapper" style="padding:5px 20px">
            <el-tabs v-model="activeName" type="card">
              <el-tab-pane label="桌台管理" name="first">
                <div class="card-wrap" v-loading="loading">
                    <el-card class="box-card" :key="i" v-for="(item,i) in tableData.items" >
                      <div class="block">
                        <div class="front">
                          <div class="info-block">
                            <div class="name">{{item.table_name}}</div>
                            <div class="num">0/{{item.table_seats}}</div>
                          </div>
                        </div>
                        <div class="back">
                          <el-button size="mini" round @click="handleTableEdit(i,item)">编辑</el-button>
                          <el-button size="mini" round @click="handleTableDelete(i,item.table_id)">删除</el-button>
                        </div>
                      </div>
                     
                    </el-card>

                    <el-card class="box-card" :key="-1" style="background:#F2F6FC">
                      <div class="block" @click="handleTableAdd" style="cursor: pointer;">
                        <div class="icon-block">
                          <i class="el-icon-circle-plus-outline"></i>
                        </div>
                        <div class="text-block">
                            <span>添加桌台</span>
                        </div>
                      </div>
                    </el-card>
                </div>
              </el-tab-pane>
              <el-tab-pane label="桌台二维码" name="second">
                <div class="card-wrap" v-loading="loading">
                      <el-card class="box-card" :key="i" v-for="(item,i) in tableData.items" >
                        <div class="block">
                          <div class="front">
                            <div class="image-block">
                              <img :id="'qrcode_' + item.table_id" :src="item.qrcode" class="image" />
                            </div>
                            <div class="text-block">
                              <span>{{item.table_name}}</span>
                            </div>
                          </div>

                          <div class="back">
                            <el-button size="mini" round @click="handleDownload(item)">下载二维码</el-button>
                          </div>
                        </div>
                      </el-card>

                </div>

                <el-row>
                  <el-button type="primary" @click="handleBatchDownload">批量下载所有二维码</el-button>
                </el-row>

              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>

      <el-dialog title="桌台管理" :visible.sync="dialogFormVisible" width="480px">
        <el-form :model="form" :rules="rules" ref="form" style="padding:0 40px 0 20px">
          <el-form-item label="桌台名称" prop="table_name" label-width="80px">
            <el-input v-model="form.table_name" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="桌台类型" prop="table_type_id" label-width="80px">
            <el-select v-model="form.table_type_id" placeholder="请选择桌台类型" style="width:100%">
              <el-option :label="item.type_name" :value="item.type_id" v-for="(item,i) in typeData.items"></el-option>
            </el-select>
          </el-form-item>


          <el-form-item label="座位个数" prop="table_seats" label-width="80px">
            <el-input v-model.number="form.table_seats" autocomplete="off"></el-input>
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
import { tableLists,tableAdd,tableEdit,tableDelete,tableTypeLists  } from '@/api/base'
import { DownClass } from '@/utils/DownClass'

export default {
    data() {
      return {
        activeName: 'first',
        typeData:{
          page:1,
          records:0,
          total:0,
          items:[]
        },
        tableData : {
          page:1,
          records:0,
          total:0,
          items:[]
        },
        form:{
          table_name:'',
          table_type_id:'',
          table_seats:''
        },
        rules: {
          table_name: [
            { required: true, message: '请输入桌台名称', trigger: 'blur' }
          ],
          table_seats: [
            { required: true, message: '请输入座位数', trigger: 'blur' }
          ]
        },
        dialogFormVisible:false,
        popoverVisible:false,
        loading:false,
        type_id:0,
        table_name:'',
      };
    },
    methods: {
      getTypeData(){
        tableTypeLists().then( res => {
          this.typeData = res.data;
        })
      },
      getTableData( data ){
        let params = {
          type_id:this.type_id,
          table_name:this.table_name,
          rows:100,
          page:1
        };
        Object.assign(params, data);
        this.loading = true;
        tableLists(params).then( res => {
          this.tableData = res.data;
          this.loading = false;
        })
      },
      handleTableAdd(){
        this.form = {
          table_name:'',
          table_type_id:this.type_id,
          table_seats:''
        }
        this.dialogFormVisible = true
      },
      handleTableEdit(index, row) {
        this.form = row;
        this.dialogFormVisible = true
      },
      handleTableDelete(index, id) {
        this.$confirm('确定要删除此桌台吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          tableDelete( {table_id:id} ).then( res => {
            if( res.status === 200 ){
              this.tableData.items.splice(index,1);
            } else {
              this.$message.error(res.msg);
            }
          })
        }).catch(() => {
                  
        });
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleSelect( id ){
        this.type_id = id;
        this.getTableData();
      },
      handleTypeManage(){
         this.$router.push("tableType");
      },
      handleDownload( item ){
        const downClass = new DownClass()
        let imageObject = {
          lock: false,
          fullName: item.table_name,
          blob: null,
          url:item.qrcode
        }
        downClass.downFile(imageObject)

      },
      handleBatchDownload() {
        const downClass = new DownClass();
        let imageArray = [];
        for( let i in this.tableData.items ){
          let item = this.tableData.items[i];
          imageArray.push({
            lock: false,
            fullName: item.table_name,
            blob: null,
            url:item.qrcode
          })
        }

        downClass.queue = imageArray
        downClass.toZip('店铺二维码')
      },

      getIndexById( id ){
        for (let i = 0; i < this.tableData.items.length; i++) {
          if (this.tableData.items[i].table_id == id) {
            return i;
          }
        }
      },
      onSubmit( formName ) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if( this.form.table_id ){
              tableEdit( this.form ).then( res => {
                if( res.status === 200 ){
                  let i = this.getIndexById( res.data.table_id );
                  Object.assign( this.tableData.items[i],res.data);
                  this.dialogFormVisible = false;
                } else {
                  this.$message.error(res.msg);
                }
              })
            } else {
              tableAdd( this.form ).then( res => {
                if( res.status === 200 ){
                  this.tableData.items.push( res.data )
                  this.dialogFormVisible = false;
                } else {
                  this.$message.error(res.msg);
                }
              })
            }
            
          } else {
            this.$message.error(res.msg);
            return false;
          }
        });
      },
      downloadImg( id ){
        var img = document.getElementById(id);        // 获取要下载的图片
        var url = img.src;                            // 获取图片地址
        var a = document.createElement('a');          // 创建一个a节点插入的document
        var event = new MouseEvent('click')           // 模拟鼠标click点击事件
        a.download = 'beautifulGirl'                  // 设置a节点的download属性值
        a.href = url;                                 // 将图片的src赋值给a节点的href
        a.dispatchEvent(event)                        // 触发鼠标点击事件
      }
    },
    created(){
      this.getTypeData();
      this.getTableData();
    }
  };
</script>
<style scoped>
  .el-top {
    display:flex;
    justify-content: space-between;
    border-right: solid 1px #e6e6e6;
    padding:10px 10px 0;
  }
  .el-top .title {
    display: flex;
    align-items:center;
  }

  .card-wrap {
    display:flex;
    flex-wrap:wrap;
    justify-content:space-start;
    padding-top:10px;
    min-height:200px;
  }
  .box-card {
    margin-right:50px;
    margin-bottom:40px;
    position:relative;
  }
  .box-card .block {
    width:150px;
    height:150px;
    position:relative;
    display:flex;
    flex-wrap: wrap;
    justify-content:center;
  }

  .block .front {
    width:100%;
    height:100%;
    display:flex;
    flex-wrap: wrap;
    justify-content:center;
    align-items:center;
    text-align: center;
    position: relative;
  }

  .block .back {
    width:100%;
    height:100%;
    justify-content: center;
    align-items: center;
    background: rgba(0,0,0,.8);
    position: absolute;
    display:none;
  }

  .block:hover .back{
    display:flex;
    position:absolute;
    top:0;
    left:0;
  }

  .block .info-block {
    width:100%;
    height:80px;
    display:flex;
    flex-wrap: wrap;
    justify-content:center;
    align-items:center;
  }
  .block .image-block {
   
  }
  .block .text-block {

  }
  .block .icon-block {
    width:100%;
    font-size:30px;
    display:flex;
    flex-wrap: wrap;
    justify-content:center;
    align-items:center;
  }
  .box-card .name {
    font-size:20px;
    width:100%;
  }
  .box-card .num {
    width:100%;
  }
  .box-card .image {
    width:130px;
    height:130px;
  }
  .text-center {
    text-align:center;
  }
  .menuitem{
    padding-left: 0 !important;
  }
.el-menu{
  border-right: solid 1px #e6e6e6;
}
</style>