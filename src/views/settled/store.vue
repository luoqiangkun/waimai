<template>
    <div class="main-content">
        <el-alert
            title="准确填写牌匾名、地址和类目，市场经理会尽快联系您"
            type="warning"
            show-icon>
        </el-alert>

        <el-steps :active="1" simple>
            <el-step title="店铺信息" icon="el-icon-s-shop"></el-step>
            <el-step title="资质信息" icon="el-icon-c-scale-to-original"></el-step>
            <el-step title="法人信息" icon="el-icon-s-custom"></el-step>
        </el-steps>
        <el-form ref="form" :model="form" :rules="rules" label-width="130px" label-position="left">
            <el-form-item label="店铺门匾名称" prop="storeName">
                <el-input class="width-400" v-model="form.storeName"></el-input>
            </el-form-item>
            <el-form-item label="店铺经营分类" prop="storeCategory">
                <el-select class="width-400" v-model="form.storeCategory" placeholder="请选择经营分类">
                  <el-option
                    v-for="item in categorylists"
                    :key="item.category_id"
                    :label="item.category_name"
                    :value="item.category_id">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="门店联系人" prop="storeContactPerson">
                <el-input class="width-400" v-model="form.storeContactPerson" placeholder="请填写门店联系人"></el-input>
            </el-form-item>
            <el-form-item label="门店联系方式" prop="storeContactNumber">
                <el-input class="width-400" v-model="form.storeContactNumber" placeholder="请填写门店联系方式"></el-input>
            </el-form-item>
            <el-divider></el-divider>

            <el-form-item label="门店区域" prop="storeDiscrict">
                <el-cascader
                    class="width-400"
                    :options="districtOptions" 
                    clearable 
                    v-model="form.storeDiscrict"
                >
                </el-cascader>
            </el-form-item>
           <el-form-item label="门店详细地址" prop="storeAddress">
                <el-input class="width-400" v-model="form.storeAddress" placeholder="请填写门店详细地址" name="storeAddress" id="storeAddress"></el-input>
            </el-form-item>
            <el-form-item label="门店经纬度" prop="storeLongitude">
              <div>
                <el-input
                  placeholder="经度"
                  v-model="form.storeLongitude"
                  style="width:150px">
                </el-input>
                <span>--</span>
                <el-input
                  placeholder="纬度"
                  v-model="form.storeLatitude"
                  style="width:150px">
                </el-input>
              </div>
            </el-form-item>

            <el-form-item>
              <baidu-map class="bm-view" :center="map.center" :zoom="map.zoom" @ready="initMap"></baidu-map>
            </el-form-item>

            <el-divider></el-divider>

            <el-form-item label="门店门脸照" prop="storeDoorPhoto">
                <el-upload
                    class="image-uploader"
                    :action="uploadUrl"
                    name="upfile"
                    :on-success="(response,id)=>{handleUploadSuccess(response, 'storeDoorPhoto')}"
                    :show-file-list="false"
                    list-type="picture-card"
                >
                <img class="image" :src="form.storeDoorPhoto" v-if="form.storeDoorPhoto"/>
                <i class="el-icon-plus" v-else></i>
                
                <div slot="tip" class="el-upload__tip">需拍出完整牌匾、门框（建议正对店铺2米处拍摄）</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="门店店内环境照" prop="storeInsidePhoto">
                <el-upload
                    class="image-uploader"
                    :action="uploadUrl"
                    name="upfile"
                    :on-success="(response,id)=>{handleUploadSuccess(response, 'storeInsidePhoto')}"
                    :show-file-list="false"
                    list-type="picture-card"
                >
                
                <img class="image" :src="form.storeInsidePhoto" v-if="form.storeInsidePhoto"/>
                <i class="el-icon-plus" v-else></i>
                <div slot="tip" class="el-upload__tip">需真实反映用餐环境，拍摄整体就餐区域，请勿局部拍摄桌椅</div>
                </el-upload>
            </el-form-item>
           
            <el-divider></el-divider>

            <el-form-item>
              <router-link to="/settled/prompt"><el-button>上一步</el-button></router-link>  
               <el-button type="primary" @click="onSubmit">下一步</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
import Vue from 'vue'
import { storeCategoryLists ,uploadUrl,settled } from "@/api"
import districtData from '@/data/districts'
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, { 
  ak: 'Yi9XWlwa7sUGSuKGDiPBrS261bMeu6YF'
})
export default {
  data() {
    return {
      rules: {
        storeName: [
          { required: true, message: '请输入门店名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        storeCategory: [
          { required: true, message: '请选择店铺分类', trigger: 'change' }
        ],
        storeContactPerson: [
          { required: true, message: '请填写店铺联系人', trigger: 'blur' }
        ],
        storeContactNumber: [
          { required: true, message: '请填写店铺联系方式', trigger: 'blur' }
        ],
        storeDiscrict: [
          { required: true, message: '请选择店铺省市区', trigger: 'change' }
        ],
        storeAddress: [
          { required: true, message: '请填写店铺详细地址', trigger: 'blur' }
        ],
        storeLongitude: [
          { required: true, message: '请填写店铺经度', trigger: 'blur' }
        ],
        storeLatitude: [
          { required: true, message: '请填写店铺纬度', trigger: 'blur' }
        ],
        storeDoorPhoto: [
          { required: true, message: '请上传店铺门脸照片', trigger: 'blur' }
        ],
        storeInsidePhoto: [
          { required: true, message: '请上传店内环境照片', trigger: 'blur' }
        ]
      },
      form: {
        storeName: '',
        storeCategory: '',
        storeContactPerson: '',
        storeContactNumber: '',
        storeDiscrict: '',
        storeAddress: '',
        storeDoorPhoto: '',
        storeInsidePhoto: '',
        storeLongitude:'',
        storeLatitude:''
      },
      categorylists:[],
      districtOptions:[],
      uploadUrl:uploadUrl,
      map:{
        center: {
          lng: 121.50109,
          lat: 31.23691
        },
        zoom: 3,
      }
    }
  },
  computed: {
      settled () {
          return this.$store.state.settled
      }
  },
  
  methods: {
      initMap({BMap, map}) {
          var _this = this;
          this.map = map;
          // 初始化地图,设置中心点坐标
          var point = new BMap.Point(121.50109, 31.23691);
          map.centerAndZoom(point, 14);
          // 添加鼠标滚动缩放
          map.enableScrollWheelZoom();

          var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
            {
              "input" : "storeAddress",
              "location" : map
            });

          var myValue;
          ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
            var _value = e.item.value;
            myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
  
           _this.form.storeAddress = myValue;
           setPlace();
            
        });

          function setPlace(){
            map.clearOverlays();    //清除地图上所有覆盖物
            function myFun(){
                var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
                console.info(pp)
                map.centerAndZoom(pp, 18);
                map.addOverlay(new BMap.Marker(pp));    //添加标注
                _this.form.storeLongitude = local.getResults().getPoi(0).point.lat;
                _this.form.storeLatitude = local.getResults().getPoi(0).point.lng;
            }
            var local = new BMap.LocalSearch(map, { //智能搜索
                onSearchComplete: myFun
            });

            local.search(myValue);
          }

      },
      formatDistrict(){
        var districtOptions = [];
        for( var i in districtData[100000]){
        
          districtOptions.push({
            value:i,
            label:districtData[100000][i],
            children:[]
          })
        }

        for( var n in districtOptions ){
          if( districtData[districtOptions[n].value] ){
            for( var m in districtData[districtOptions[n].value] ){
              districtOptions[n].children.push({
                value:m,
                label:districtData[districtOptions[n].value][m],
                children:[]
              })
            }
          }
        }

        for( var i in districtOptions ){
          for( var m in districtOptions[i].children ){
            if( districtData[districtOptions[i].children[m].value] ){
              for( var n in districtData[districtOptions[i].children[m].value] ){
                districtOptions[i].children[m].children.push({
                  value:n,
                  label:districtData[districtOptions[i].children[m].value][n]
                })
              }
            }
          }
        }
        this.districtOptions = districtOptions;
      },
      formatFormDistrict(storeDiscrict){
         var newDistrice = []
          for( var i in storeDiscrict ){
            newDistrice.push(storeDiscrict[i].toString())
          }
          return newDistrice
      },
      handleUploadSuccess(res,id) {
        if( res.status === 200 ){
           this.form[id] = res.data.url
        }	        
     	},
      storeCategoryLists(){
        storeCategoryLists().then( res => {
          if( res.status === 200 ){
            this.categorylists = res.data.items;
          }
        })
      },
      onSubmit() {
        this.form.key = 'store';
        this.$refs.form.validate((valid) => {
          if (valid) {
            settled(this.form).then(res => {
              if(res.status == 200){
                this.$router.push("company")
              }else{
                this.$message.error(res.msg)
              }
            }) 
          }
        })
      }
  },
  created(){
    this.storeCategoryLists()
    this.formatDistrict()
    if(this.settled.store){
      this.form = this.settled.store
      if(this.form.storeDiscrict && this.form.storeDiscrict.length > 0){
        this.form.storeDiscrict = this.formatFormDistrict(this.form.storeDiscrict);
      }
    }

    this.$store.dispatch('settled/setStep',1)

  }
}
</script>

<style scoped>
.width-400 {
    width: 400px;
}
.main-content {
    padding: 0 50px;
    text-align: left;
}
.main-content .el-alert {
    padding: 14px 16px;
    margin-bottom: 20px;
}
.main-content .el-steps {
    margin-bottom: 20px;
}
.bm-view {
    width: 700px;
    height: 350px;
    margin-top: 10px;
}
.image-uploader .image {
  width: 100%;
  height:100%;
}
</style>