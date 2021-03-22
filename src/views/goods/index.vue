<template>
    <el-card class="box-card">
      <el-row>
        <el-col :span="4">

          <div class="el-top">
            <h4 class="title">商品分类</h4>
            <el-button type="success" size="small" @click="handleCateManage">分类管理</el-button>
          </div>

          <el-menu
            class="el-menu-vertical menu1"
            @select="handleSelect"
          >                   
            <el-menu-item index="t-0" key="">
              <span slot="title">全部分类</span>
            </el-menu-item>

            <el-menu-item :index="'' + item.category_id" :key="item.category_id" v-for="item in cateData.items" >
              <span slot="title">
                {{item.category_name}}
                <el-tag size="mini" v-if="item.category_property == 1">必须分类</el-tag>
                </span>
              
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="20" style="padding:10px 20px">
              <el-row class="clearfix">
                <div class="el-botton-group pull-left">
                  <el-button size="small" @click="handleAddGoods">添加商品</el-button>
                  <el-button size="small" @click="handleBulkOffShelves(1)">批量上架</el-button>
                  <el-button size="small" @click="handleBulkOffShelves(2)">批量下架</el-button>
                  <el-button size="small" @click="handleBulkDelete">批量删除</el-button>
                  <el-button size="small" @click="handleRefresh" icon="el-icon-refresh">刷新</el-button>
                </div>

                <div class="searh-row flex pull-right">
                  <el-input size="small" v-model="goods_name" placeholder="请输入内容"></el-input>
                  <el-button size="small" type="info" plain @click="getGoodsData">搜索</el-button>
                </div>
              </el-row>
              

              <el-table
                v-loading="loading"
                :data="goodsData.items"
                @selection-change="handleSelectionChange"
                style="width: 100%;margin-top:20px">
                <el-table-column
                  align="center"
                  type="selection"
                  width="60">
                </el-table-column>

                <el-table-column
                  prop="goods_image"
                  label="商品图片"
                  width="120"
                >
                  <template slot-scope="scope">
                    <img :src="scope.row.goods_image" class="image" width="80" height="80" />
                  </template>
                </el-table-column>
               
                <el-table-column
                  label="商品描述"

                >
                  <template slot-scope="scope">
                    <dl>
                      <dt class="name">{{scope.row.goods_name}}</dt>
                      <dd class="price">￥{{scope.row.goods_price}}</dd>
                      <dd class="stock">{{scope.row.goods_stock}}件</dd>
                    </dl>
                  </template>

                </el-table-column>

                <el-table-column
                  label="规格和属性"
                >
                  <template slot-scope="scope">

                    <el-row v-if="scope.row.goods_spec && scope.row.goods_spec.length > 0" >
                      规格：
                      <el-tag type="info" size="mini" :key="i" v-for="(item,i) in scope.row.goods_spec">{{item.spec_name}}</el-tag>
                    </el-row>

                    <template v-if="scope.row.goods_attribute && scope.row.goods_attribute.length > 0">
                      <el-row :key="i" v-for="(item,i) in scope.row.goods_attribute">
                        {{item.name}}：
                        <el-tag type="info" size="mini" :key="k" v-for="(value,k) in item.items ">{{value}}</el-tag>
                      </el-row>
                    </template>
                    

                  </template>

                </el-table-column>

               <el-table-column
                  align="center"
                  label="操作"
                  width="180"
                 >
                  <template slot-scope="scope">
                   

                     <el-row>
                      <el-button type="success" size="mini" v-if="scope.row.goods_state === 1 " @click="handleShelves(scope.row.goods_id,2)">下架</el-button>
                      <el-button type="info" size="mini" v-if="scope.row.goods_state === 2 " @click="handleShelves(scope.row.goods_id,1)">上架</el-button>
                      <el-button type="danger" size="mini" v-if="scope.row.goods_state === 3 ">禁售</el-button>
                    </el-row>

                    <el-row >
                      <el-button
                        size="mini"
                        type="text"
                        @click="handleGoodsEdit(scope.row.goods_id)">编辑</el-button>
                     
                        <el-popover
                          placement="bottom-end"
                          width="160"
                          :ref="scope.$index"
                        >
                          <p>确定删除吗？</p>
                          <div style="text-align: right; margin: 0">
                              <el-button size="mini" type="text" @click="scope._self.$refs[scope.$index].doClose()">取消</el-button>
                              <el-button type="primary" size="mini" @click="scope._self.$refs[scope.$index].doClose();handleGoodsDelete(scope.$index, scope.row.goods_id)">确定</el-button>
                          </div>
                           <el-button size="mini" type="text" slot="reference">删除</el-button>
                        </el-popover>

                    </el-row>
                  </template>
                </el-table-column>
              </el-table>

              <el-pagination class="pull-right" background layout="prev, pager, next" :total="goodsData.records" @current-change="changePage" position="bottom" v-if="goodsData.total > 1"></el-pagination>
        </el-col>
      </el-row>

    </el-card>
</template>
<script>
import { cateLists,goodsLists,goodsState,goodsDel } from '@/api/goods'
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
        goodsData: {
          page:1,
          records:0,
          total:0,
          more:true,
          items:[]
        },
        form : {
          category_id:0,
          category_name:'',
          category_image:''
        },
        selection:[],
        category_id:0,
        goods_name:'',
        activeName: 'first',
        dialogFormVisible:false,
        popoverVisible:false,
        loading:false
      };
    },
    methods: {
      getCateData(){
        cateLists().then( res => {
          this.cateData = res.data;
        })
      },
      getGoodsData( data ){
        let params = {
          category_id:this.category_id,
          goods_name:this.goods_name,
          rows:10,
          page:1
        };

        Object.assign(params, data);
        this.loading = true
        goodsLists(params).then( res => {
          this.goodsData = res.data;
          this.loading = false
        })
      },
      changePage( page ){
        this.getGoodsData({page:page})
      },
      handleGoodsEdit( id ) {
        this.$router.push("goodsManage/" + id);
      },
      handleGoodsDelete(index, goods_id) {
        goodsDel({goods_id:goods_id}).then( res => {
          if( res.status === 200 ){
            this.goodsData.items.splice(index,1);
          } else {
            this.$message.error(res.msg);
          }
        })
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleSelect( id ){
        this.category_id = id;
        this.getGoodsData();
      },
      handleShelves( id,goods_state ){
        goodsState({goods_id:id,goods_state:goods_state}).then( res => {
          if( res.status === 200 ){
            let index = this.getIndexById( id );
            this.fixGoodsState( index,goods_state );
          } else {
            this.$message.error(res.msg);
          }
        })
      },
      getIndexById( id ){
        let index = [];
        if( !(id instanceof Array) ) {
          id = [id];
        } 
        for( let i in this.goodsData.items ){
         
          if( id.indexOf( this.goodsData.items[i].goods_id ) > -1 ){
            index.push( i );
          }
        }

        return index;
      },
      fixGoodsState( index,goods_state ){
        index.forEach( v => {
          this.goodsData.items[v].goods_state = goods_state;
        })
      },
      handleRefresh(){
        this.getGoodsData();
      },
      handleAddGoods(){
        this.$router.push("goodsManage");
      },
      handleBulkDelete(){
        let id = this.getSelectionId( this.selection );
        if( id.length === 0 ) {
          return this.$alert('请勾选商品', '消息提示');
        }
        goodsDel({goods_id:id}).then( res => {
          if( res.status === 200 ){
            for( let i in id ){
              this.goodsData.items.splice(this.getSelectionId( i ),1); 
            }
            
          } else {
            this.$message.error(res.msg);
          }
        })

      },
      handleBulkOffShelves( goods_state ){
        let id = this.getSelectionId( this.selection );
        if( id.length === 0 ) {
          return this.$alert('请勾选商品', '消息提示');
        }
        goodsState({goods_id:id,goods_state:goods_state}).then( res => {
          if( res.status === 200 ){
            let index = this.getIndexById( id );
            this.fixGoodsState( index,goods_state );
          } else {
            this.$message.error(res.msg);
          }
        })
      },
      handleUploadSuccess(res, file) {
        if( res.status === 200 ){
          this.form.category_image = res.data.url;
        }         
      },
      handleSelectionChange( selection ){
        this.selection = selection;
      },
      getSelectionId( selection ){
        let id = [];
        selection.forEach( v => {
          id.push( v.goods_id );
        })
        return id;
      },
      handleCateManage(){
        this.$router.push("category");
      },
      handleAddUnit(){
        this.$router.push("unit");
      },
      onSubmit( formName ) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            cateAdd( this.form ).then( res => {
              if( res.status === 200 ){
                this.cateData.items.push( res.data );
                this.dialogFormVisible = false;
              } else {
                this.$message.error(res.msg);
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    created(){
      this.getCateData();
      this.getGoodsData();
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
   
  .el-tag.el-tag--info{
    margin-right: 5px;
  }
  .el-menu{
      border-right: solid 1px #e6e6e6;
  }
.menu1{
  width:auto !important;
}
</style>