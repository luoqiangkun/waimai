<template>
  <div>
    <el-card class="box-card ">
       <el-steps :active="active" simple>
          <el-step title="填写活动信息" icon="el-icon-edit"></el-step>
          <el-step title="选择活动商品" icon="el-icon-goods"></el-step>
          <el-step title="提交活动" icon="el-icon-circle-check"></el-step>
        </el-steps>

    </el-card>

    <el-card class="box-card manage" style="margin-top:20px" v-show="active == 0" v-loading="loading">
      <div slot="header" class="clearfix">
        <span>填写活动信息</span>
        <div class="goback" @click="goback"><i class="el-icon-back back"></i>返回上一级</div>
      </div>
      <div>
        <el-form :model="form" :rules="rules" ref="form" label-width="160px">
          <el-form-item label="活动名称" prop="activity_name">
            <el-col :span="18">
              <el-form-item prop="activity_name">
                <el-input v-model="form.activity_name" size="small"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          
          <el-form-item label="活动时间" required>
            <el-col :span="8">
              <el-form-item prop="activity_starttime">
                <el-date-picker type="datetime" placeholder="选择日期" v-model="form.activity_starttime" value-format="yyyy-MM-dd HH:mm:ss" size="small" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">至</el-col>
            <el-col :span="8">
              <el-form-item prop="activity_endtime">
                <el-date-picker  type="datetime" placeholder="选择日期" v-model="form.activity_endtime" value-format="yyyy-MM-dd HH:mm:ss" size="small" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
        
          <el-form-item>
            <el-button @click="handleNextStep">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-card class="box-card" style="margin-top:20px" v-show="active == 1">
      <div slot="header" class="clearfix">
        <span>选择活动商品</span>
        <div class="goback" @click="goback"><i class="el-icon-back back"></i>返回上一级</div>
      </div>
      <div>
      <el-row :gutter="100">
      <el-col :span="8">
        <el-collapse v-model="activeName" accordion :key="index" v-for="(item,index) in cateGoodsData">
          <el-collapse-item :title="item.category_name" :name="item.category_id">
            <div class="rectangle" :key="i" v-for="(row,i) in item.items">
              <div class="rectangle-l">
                <img :src="row.goods_image" class="image" />
              </div>

              <div class="rectangle-c">
                <dl>
                  <dt class="name">{{row.item_name}} {{row.spec_name ? row.spec_name : ''}}</dt>
                  <dd class="price">￥{{row.item_price}}</dd>
                </dl>
              </div>
              
              <div class="rectangle-r">
                 <el-checkbox v-model="row.checked" @change="handleChange($event,row)" :disabled="row.disabled"></el-checkbox>
              </div>
            </div>

          </el-collapse-item>
        </el-collapse>
      </el-col>
     
      <el-col :span="16">

          <el-table
              :data="form.items"
              border
              style="width: 100%">
              <el-table-column
                align="center"
                prop="item_name"
                label="商品名称"
              >
              </el-table-column>
              
              <el-table-column
                align="center"
                label="商品图片"
              >
                <template slot-scope="scope">
                  <img :src="scope.row.goods_image" class="image" width="80"/>
                </template>
              </el-table-column>

              <el-table-column
                align="center"
                prop="item_price"
                label="商品价格"
              >
              </el-table-column>

              <el-table-column
                align="center"
                label="活动价格"
              >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.activity_item_price" size="small" class="input-text-80" min="0" :max="scope.row.item_price"></el-input>
                </template>
              </el-table-column>

              <el-table-column
                align="center"
                label="活动库存"
              >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.activity_item_stock" size="small" class="input-text-80"></el-input>
                </template>
              </el-table-column>

              <el-table-column
                align="center"
                label="活动限购"
              >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.activity_item_buylimit" size="small" class="input-text-80"></el-input>
                </template>
              </el-table-column>

              <el-table-column
                align="center"
                label="操作"
                width="80"
               >
                <template slot-scope="scope">
                  <i class="el-icon-delete" @click="handleDelete( scope.$index )"></i>
                </template>

              </el-table-column>
          </el-table>

          <div class="bottom-block">
            <el-button @click="() => { this.active = 0 }">上一步</el-button>
            <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
          </div>
      </el-col>
      </el-row>
      </div>
    </el-card>


  </div>
 
</template>
<script>
  import { activityCateGoods } from '@/api/base'
  import { activityInfo,activityAdd,activityEdit } from '@/api/base'

  export default {
    data() {
      return {
        active: 0,
        activeName: '1',
        loading:false,
        form: {
          activity_id:0,
          activity_name: '',
          activity_starttime: '',
          activity_endtime: '',
          activity_type_id:2,
          activity_rule: {
            rules:[]
          },
          items : []
        },
        rules: {
          activity_name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
          ],
          activity_starttime: [
            {  required: true, message: '请选择日期', trigger: 'change' }
          ],
          activity_endtime: [
            {  required: true, message: '请选择日期', trigger: 'change' }
          ]
        },
        cateGoodsData : {}
      };
    },
    methods: {
      next() {
        if (this.active++ > 2) this.active = 0;
      },
      getActivityInfo(){
        this.loading = true;
        activityInfo({activity_id:this.form.activity_id}).then( res => {
          if( res.status === 200 ){
            this.form = res.data
            
          } else {
            this.$message.error(res.msg);
          }

          this.loading = false;
        })
      },
      getCateData(){
        activityCateGoods().then( res => {
          if( res.status === 200 ){
            this.cateGoodsData = this.fixCheckBoxValue(res.data);
          }
          
        })
      },
      handleChange( val,row ){
        if( val ){
          this.form.items.push( row )
        } else {
          let index = this.getIndexById( this.form.items,row.item_id );
          this.form.items.splice(index,1);
        }
       
      },
      handleDelete( i ){
        this.form.items.splice(i,1);
        this.cateGoodsData = this.fixCheckBoxValue(this.cateGoodsData);
      },
      handleNextStep(){
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.active = 1;
          } 
        });
      },
      getIndexById( items,id ){
        for (let i = 0; i < items.length; i++) {
          if (items[i].item_id == id) {
            return i;
          }
        }
      },
      fixCheckBoxValue( data ){
        let item_ids = [];
       
        for( let m in this.form.items ){
          
          item_ids.push( this.form.items[m].item_id )
        }
       
        for( let i in data ){
          for(let k in data[i].items ){
            if( item_ids.indexOf( data[i].items[k].item_id ) > -1 ){
              data[i].items[k].checked = true
            } else {
              data[i].items[k].checked = false
            }
          }
        }
       return data;
      },
      submitForm(formName) {
        this.form.activity_rule.rules = [];
        for( let i in this.form.items ){

          if( this.form.items[i].activity_item_price > this.form.items[i].item_price ){
            return this.$message.error('活动价格需小于商品价格');
          }

          if( this.form.items[i].activity_item_stock ){
            if( this.form.items[i].activity_item_stock > this.form.items[i].item_stock ){
              return this.$message.error('活动库存需小于商品库存');
            }
          } 

          this.form.activity_rule.rules.push({
            item_id:this.form.items[i].item_id,
            price:this.form.items[i].activity_item_price,
            stock:this.form.items[i].activity_item_stock,
            buylimit:this.form.items[i].activity_item_buylimit
          })
        }

        this.$refs[formName].validate((valid) => {
          if (valid) {
            if( this.form.activity_id ){
              activityEdit( this.form ).then( res => {
                if( res.status === 200 ){
                  this.$router.push("/activity");
                } else {
                  this.$message.error(res.msg);
                }
              })
            } else {
              activityAdd( this.form ).then( res => {
                if( res.status === 200 ){
                  this.$router.push("/activity");
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      goback() {
        this.$router.go(-1);
      }
    },
    created(){
      if( this.$route.params.id ){
        this.form.activity_id = this.$route.params.id;
        this.getActivityInfo();
      }

      this.getCateData();
    }
  }
</script>
<style scoped>
.manage {
  width:800px;
  margin:0 auto
}
.line {
  text-align:center;
}

.rectangle {
  display:flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}
.rectangle .image {
  width:60px;
  height:60px;
}
.rectangle .rectangle-c {
  flex-grow:1;
  margin-left: 10px;
}
.top-block {
  margin-bottom:10px;
}
.bottom-block {
  margin-top:20px;
   margin-bottom:10px;
}
.input-text-80 {
  width:80px !important;
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