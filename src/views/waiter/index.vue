<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>角色管理</span>
    </div>
    <div>

        <el-row class="clearfix">
          <div class="el-botton-group pull-left">
              <el-button size="small" @click="handleUserAdd">添加角色</el-button>
              <el-button size="small" @click="handleBulkDelete">批量删除</el-button>
              <el-button size="small" @click="handleRefresh" icon="el-icon-refresh">刷新</el-button>
          </div>

          <div class="searh-row flex pull-right">
            <el-input size="small" v-model="user_name" placeholder="请输入用户名"></el-input>
            <el-button size="small" type="info" plain @click="getUserData">搜索</el-button>
          </div>
        </el-row>

        <el-table
          ref="multipleTable"
          :data="userData.items"
          v-loading="loading"
          tooltip-effect="dark"
          style="width: 100%;margin-top:20px"
          
          @selection-change="handleSelectionChange">
          <el-table-column
            align="center"
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="用户ID"
            align="center"
           
            prop="user_id">
          </el-table-column>
          <el-table-column
            align="center"
            prop="user_name"
            label="用户名"
            >
            <template slot-scope="scope">{{ scope.row.user_name }}</template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="user_mobile"
            label="用户电话"
            >
            <template slot-scope="scope">{{ scope.row.user_mobile }}</template>
          </el-table-column>

          <el-table-column
            align="center"
            prop="place_order_enable"
            label="支持代下单"
            >
            <template slot-scope="scope">
              <el-switch v-model="scope.row.place_order_enable" active-color="#13ce66" inactive-color="#dcdfe6" @change="handleSwitchChange(scope.row.user_id,'place_order_enable',$event)"></el-switch>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            prop="modify_order_enable"
            label="支持修改订单信息"
            >
            <template slot-scope="scope">
              <el-switch v-model="scope.row.modify_order_enable" active-color="#13ce66" inactive-color="#dcdfe6" @change="handleSwitchChange(scope.row.user_id,'modify_order_enable',$event)"></el-switch>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            prop="check_order_enable"
            label="支持待结单"
            >
            <template slot-scope="scope">
              <el-switch v-model="scope.row.check_order_enable" active-color="#13ce66" inactive-color="#dcdfe6" @change="handleSwitchChange(scope.row.user_id,'check_order_enable',$event)"></el-switch>
            </template>
          </el-table-column>

           <el-table-column
            align="center"
            prop="bind_table_ids"
            label="绑定桌台"
            >
            <template slot-scope="scope">
                <el-button size="mini" type="success" round @click="handleUserBindTable(scope.row.user_id)">查看</el-button>
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
                @click="handleUserEdit(scope.$index, scope.row)">编辑</el-button>
                <el-popover
                  placement="bottom-end"
                  width="160"
                  :ref="scope.$index"
                >
                  <p>确定删除吗？</p>
                  <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="text" @click="scope._self.$refs[scope.$index].doClose()">取消</el-button>
                      <el-button type="primary" size="mini" @click="scope._self.$refs[scope.$index].doClose();handleUserDelete(scope.$index, scope.row.user_id)">确定</el-button>
                  </div>
                   <el-button size="mini" type="danger" slot="reference">删除</el-button>
                </el-popover>
              </template>

            </el-table-column>
        </el-table>

      <el-pagination
        background
        layout="prev, pager, next"
        :total="userData.records"
        style="padding:20px 0;float:right"
        @current-change="changePage"
        v-if="userData.total > 1"
        >
      </el-pagination>

    </div>

    <el-dialog title="角色管理" :visible.sync="dialogFormVisible" width="480px">
      <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px">
        <el-form-item label="用户名" prop="user_name" v-show="form.user_id === 0">
          <el-col :span="20">
            <el-form-item prop="user_name">
              <el-input type="user_name" size="small" v-model="form.user_name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>

          
        </el-form-item>

        <el-form-item label="密码" prop="user_password" v-show="form.user_id === 0">
          <el-col :span="20">
            <el-form-item prop="user_password">
              <el-input type="user_password" size="small" v-model="form.user_password" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>

          
        </el-form-item>

        <el-form-item label="手机号" prop="user_mobile">
          <el-col :span="20">
            <el-form-item prop="user_mobile">
              <el-input type="user_mobile" size="small" v-model="form.user_mobile" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>

        </el-form-item>
       
        <el-form-item>
          <el-button type="primary" size="small" @click="submitForm('form')">提交</el-button>
          <el-button size="small" @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>

    <el-dialog title="绑定桌台" :visible.sync="dialogTransferVisible" width="625px">
      <el-transfer 
        v-model="userBindTableData" 
        :data="transferData"
        :titles="['所有桌台', '绑定桌台']"
      >
      </el-transfer>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTransferVisible = false">取 消</el-button>
        <el-button type="primary" @click="hanleUserTableBind">确 定</el-button>
      </span>

    </el-dialog>

  </el-card>
</template>

<script>
import { waiterLists,waiterAdd,waiterEdit,waiterDelete  } from '@/api/base'
import { tableLists  } from '@/api/base'

export default {
      data() {
        var checkPhone = (rule, value, callback) => {
          const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
          if (!value) {
            return callback(new Error('电话号码不能为空'))
          }
          setTimeout(() => {
            // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
            // 所以我就在前面加了一个+实现隐式转换

            if (!Number.isInteger(+value)) {
              callback(new Error('请输入数字值'))
            } else {
              if (phoneReg.test(value)) {
                callback()
              } else {
                callback(new Error('电话号码格式不正确'))
              }
            }
          }, 100)
        }
        return {
          user_id:0,
          transferData:[],
          userBindTableData: [],
          dialogFormVisible:false,
          dialogTransferVisible:false,
          popoverVisible:false,
          form: {
            user_id:0,
            user_name:'',
            user_password : '',
            user_mobile : ''
          },
          rules: {
            user_name: [
              { required: true, message: '请输入用户名称', trigger: 'blur' }
            ],
            user_password: [
              { required: true, message: '请输入密码', trigger: 'blur' }
            ]
          },
          userData: {
            page:1,
            records:0,
            total:0,
            items:[]
          },
          tableData:[],
          user_name:'',
          multipleSelection:[],
          loading:false
        }
      },
      methods:{
        getUserData( data ){
          let params = {
            user_name:this.user_name,
            rows:10,
            page:1
          };

          Object.assign(params, data);

          this.loading = true;
          waiterLists(params).then( res => {
            if( res.status === 200 ){
              this.userData = res.data;
              
              this.userData.items = this.fixUserData(res.data.items);

            } 
            this.loading = false;
          })
        },
        fixUserData( data ){
          if( data instanceof Array ) {
            for( let i in data ){
              data[i].place_order_enable = data[i].place_order_enable === 1 ? true : false;
              data[i].modify_order_enable = data[i].modify_order_enable === 1 ? true : false;
              data[i].check_order_enable = data[i].check_order_enable === 1 ? true : false;
            }
          } else {
              data.place_order_enable = data.place_order_enable === 1 ? true : false;
              data.modify_order_enable = data.modify_order_enable === 1 ? true : false;
              data.check_order_enable = data.check_order_enable === 1 ? true : false;
          }

          
          return data;
        },
        getTableData(){
          let params = {
            rows:500,
            page:1
          };
          tableLists(params).then( res => {
            this.tableData = res.data.items;
          })
        },
        getTransferData( user_id ){
          let data = [],
                userBindTableData = [],
                allBindTableData = [];

          const {items} = this.userData;
          for( let n in items ){

            if( items[n].user_id === user_id && items[n].bind_table_ids ){
              userBindTableData = items[n].bind_table_ids;
            }
            if( items[n].bind_table_ids ){
              allBindTableData  = allBindTableData.concat( items[n].bind_table_ids );
            }
          }
          
          this.userBindTableData = userBindTableData;

          for( let i in this.tableData ){
            data.push({
              key: this.tableData[i].table_id,
              label: this.tableData[i].table_name + '',
              disabled: allBindTableData.indexOf(this.tableData[i].table_id) > -1 && userBindTableData.indexOf(this.tableData[i].table_id) === -1
            });
          } 

          this.transferData = data;

          console.log( this.transferData );
        },
        handleUserBindTable( user_id ){
          this.user_id = user_id;
          this.dialogTransferVisible = true;
          this.getTransferData(user_id);
        },
        handleUserAdd(index,row){
          this.form = {
            user_id:0,
            user_name:'',
            user_password : '',
            user_mobile : ''
          };
          this.dialogFormVisible = true
        },
        handleUserEdit(index,row){
          this.form = {
            user_id : row.user_id,
            user_name:row.user_name,
            user_mobile : row.user_mobile,
            user_password:''
          };
          this.dialogFormVisible = true
        },
        handleUserDelete( index,id ){
          waiterDelete({user_id:id}).then( res => {
            if( res.status === 200 ){
              this.$message({
                message: '删除成功',
                type: 'success'
              });

              this.userData.items.splice(index,1);
            } else {
              this.$message.error(res.msg);
            }
          })
        },
        handleBulkDelete(){
          let user_id = [];
          for( let i in this.multipleSelection ){
            user_id.push( this.multipleSelection[i].user_id )
          }

          waiterDelete({user_id:user_id}).then( res => {
            if( res.status === 200 ){
              this.$message({
                message: '删除成功',
                type: 'success'
              });

              this.getUserData();
            } else {
              this.$message.error(res.msg);
            }
          })
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
        handleSwitchChange( user_id,field_name,val ){
          let data = {}; 
          data.user_id = user_id;
          data[field_name] = val ? 1 : 0;
          waiterEdit( data ).then( res => {
            if( res.status === 200 ){
            } else {
              this.$message.error(res.msg);
            }
          })
        },
        handleRefresh(){
          this.getUserData();
        },
        getIndexById( id ){
          for (let i = 0; i < this.userData.items.length; i++) {
            if (this.userData.items[i].user_id == id) {
              return i;
            }
          }
        },
        submitForm(formName) {
          if( this.form.user_id ){
            delete this.rules.user_password;
          }
          this.$refs[formName].validate((valid) => {
            if (valid) {
              if( this.form.user_id ){
                waiterEdit( this.form ).then( res => {
                  if( res.status === 200 ){
                    let i = this.getIndexById( res.data.user_id );
                    Object.assign( this.userData.items[i],res.data);
                    this.dialogFormVisible = false;
                  } else {
                    this.$message.error(res.msg);
                  }
                })
              } else {
                waiterAdd( this.form ).then( res => {
                  if( res.status === 200 ){
                    this.userData.items.push( res.data )
                    this.dialogFormVisible = false;
                  } else {
                    this.$message.error(res.msg);
                  }
                })
              }
              
            } else {
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        hanleUserTableBind(){
          let params = {
            user_id:this.user_id,
            bind_table_ids:this.userBindTableData
          };

          waiterEdit( params ).then( res => {
            if( res.status === 200 ){
              let i = this.getIndexById( this.user_id );
              this.userData.items[i].bind_table_ids = res.data.bind_table_ids;
            } else {

            }
            this.dialogTransferVisible = false;
          })
        }
      },
      created(){
        this.getUserData();
        this.getTableData();
      }
    }
</script>
<style scoped>
  .menu-search {
    display: flex;
       padding: 10px 20px;
      border-right: solid 1px #e6e6e6;
  }
    .card-wrap {
      display:flex;
      flex-wrap:wrap;
      justify-content:space-start;
      padding-left:50px;
      padding-top:10px;
    }
    .card-wrap .box-card {
      width:300px;
      height:185px;
      margin-right:50px;
      margin-bottom:40px;
    }
    .box-card .rectangle {
      width:100%;
      display:flex;
      flex-wrap:wrap;
    }
    .rectangle .rectangle-l {
      width:60%;
    }
    .rectangle .rectangle-r {
      width:40%;
    }
    .rectangle .rectangle-b {
      width:100%;
      display:flex;
      justify-content:space-between;
      margin-top:10px;
    }
    .rectangle .name {
      color:#333;
      line-height: 25px;
    }
    .rectangle .price {
      color:#ff5c38;
      font-size:14px;
      margin-top:10px;
    }
    .rectangle .image {
      width:100%;
      height:100%;
    }
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