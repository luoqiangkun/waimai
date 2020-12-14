<template>
  <div>
     <el-card class="box-card manage">
      <div slot="header" class="clearfix">
        <span>创建活动</span>
        <div class="goback" @click="goback"><i class="el-icon-back back"></i>返回上一级</div>
      </div>

      <div  v-loading="loading">
        <el-form :model="form" :rules="rules" ref="form" label-width="200px">
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
                <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.activity_starttime" size="small" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">至</el-col>
            <el-col :span="8">
              <el-form-item prop="activity_endtime">
                <el-date-picker  type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.activity_endtime" size="small" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          
          <el-form-item label="活动内容" prop="name" >

            <div class="rules-input">

              <div class="rules-input-item" v-for="(item,i) in form.activity_rule.rules">
                <span>满</span> <el-input placeholder="填整数" suffix-icon="el-icon-date"  v-model="item.total" size="small"> </el-input> 
                <span>减</span> <el-input placeholder="填整数" suffix-icon="el-icon-date"  v-model="item.minus" size="small"> </el-input> 

                <div class="rules-icon" v-if=" i == 0 ">
                  <i class="el-icon-circle-plus" @click="addRule"></i>
                  添加活动规则
                </div>

                <div class="rules-icon" v-else >
                    <i class="el-icon-error" @click="delRule(i)"></i>
                </div>

              </div>


              

            </div>

          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('form')">确定</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
 
</template>
<script>
  import { activityInfo,activityAdd,activityEdit } from '@/api/base'

  export default {
    data() {
      return {
        form: {
          activity_id:0,
          activity_name: '',
          activity_starttime: '',
          activity_endtime: '',
          activity_type_id:1,
          activity_rule: {
            rules:[{
              total : 0,
              minus : 0
            }]
          }
        },
        rules: {
          activity_name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
          ],
          activity_starttime: [
            { required: true, message: '请选择日期', trigger: 'change' }
          ],
          activity_endtime: [
            { required: true, message: '请选择日期', trigger: 'change' }
          ]
        },
        loading:false
      };
    },
    methods: {
      getActivityInfo(){
        this.loading = true;
        activityInfo({activity_id:this.form.activity_id}).then( res => {
          if( res.status === 200 ){
            this.form = res.data
          } else {
            this.$message.error(res.msg);
          }

          this.loading = false
        })
      },
      addRule(){
        this.form.activity_rule.rules.push({
          total : 0,
          minus : 0
        });
      },
      delRule( i ){
        this.form.activity_rule.rules.splice(i,1);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if( this.form.activity_id ){
              activityEdit( this.form ).then( res => {
                if( res.status === 200 ){
                  this.$router.go(-1);
                } else {
                  this.$message.error(res.msg);
                }
              })
            } else {
              activityAdd( this.form ).then( res => {
                if( res.status === 200 ){
                  this.$router.go(-1);
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
    }
  }
</script>
<style scoped>
.manage {
  width:800px;
  margin:0 auto
}

.rules-input {
  display:flex;
  flex-wrap:wrap;
}
.rules-input span {
  display: inline-block;
  margin: 0 5px;
}
.rules-input .el-input {
  font-size:12px;
  width:100px;
}
.rules-input .rules-input-item {
  width:100%;
  position:relative;
}
.rules-icon {
  position: absolute;
  top: 0;
  left: 280px;
  color:#999;
}
.line {
  text-align: center;
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