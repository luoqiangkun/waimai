<template>
	 <el-card class="box-card">
		  <el-tabs v-model="activeName">
			<el-tab-pane label="店铺设置" name="first">
				<div class="grid-content bg-purple">
					<el-form ref="form" :model="form" label-width="180px">
					<el-form-item label="店铺LOGO">
					<el-upload
						class="image-uploader store_logo"
						:action="uploadUrl"
						name="upfile"
						:on-success="(response, file,id)=>{handleUploadSuccess(response, file, 'store_logo')}"
						:show-file-list="false"

						>
						<img v-if="form.store_logo" :src="form.store_logo" class="image" />
						<i v-else class="el-icon-plus image-uploader-icon"></i>
						</el-upload>

						<div class="el-upload__tip">建议上传jpg/png文件，建议图片尺寸为100x100</div>

					</el-form-item>
					<el-form-item label="店铺BANNER">

						<el-upload
						class="image-uploader store_banner"
						:action="uploadUrl"
						name="upfile"
						:on-success="(response, file,id)=>{handleUploadSuccess(response, file, 'store_banner')}"
						:show-file-list="false"
						>
						<img v-if="form.store_banner" :src="form.store_banner" class="image" />
						<i v-else class="el-icon-plus image-uploader-icon"></i>

						</el-upload>
						<div class="el-upload__tip" >建议上传jpg/png文件，建议图片尺寸为640*200</div>

					</el-form-item>

					<el-form-item label="门店照片">
						<el-upload
							:action="uploadUrl"
							name="upfile"
							:on-success="(response, file,id)=>{handleUploadSuccess(response, file, 'store_photo')}"
							list-type="picture-card"
							:file-list="fileList"
							>
								<i slot="default" class="el-icon-plus"></i>
								<div slot="file" slot-scope="{file}">
								<img
									class="el-upload-list__item-thumbnail"
									:src="file.url" alt=""
								>
								<span class="el-upload-list__item-actions">
									<span
									class="el-upload-list__item-preview"
									@click="handlePictureCardPreview(file)"
									>
									<i class="el-icon-zoom-in"></i>
									</span>

								<span
								v-if="!disabled"
								class="el-upload-list__item-delete"
								@click="handleRemove(file,fileList)"
								>
								<i class="el-icon-delete"></i>
								</span>
							</span>
							</div>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>



					</el-form-item>


					<el-form-item label="店铺介绍">
						<el-input type="textarea" :rows="9" v-model="form.store_description"></el-input>
					</el-form-item>

					<el-form-item label="店铺地址">
						<el-cascader
							style="display:block"
							:options="districtOptions"
							clearable
							v-model="form.district_ids"
						>
						</el-cascader>
					</el-form-item>

					<el-form-item label="详细地址">
						<el-input  v-model="form.store_address"></el-input>
					</el-form-item>

					<el-form-item label="联系电话">
						<el-input  v-model="form.store_telephone"></el-input>
					</el-form-item>


					<el-form-item label="营业时间">
						<el-time-picker
							is-range
							v-model="rangTime"
							range-separator="至"
							start-placeholder="开始时间"
							end-placeholder="结束时间"
							placeholder="选择时间范围"
							value-format="HH:mm"
							format="HH:mm">
						</el-time-picker>
					</el-form-item>


					<el-form-item>
						<el-button type="primary" @click="onSubmit">确定</el-button>

					</el-form-item>
					</el-form>
				</div>
			</el-tab-pane>
			<el-tab-pane label="店铺二维码" name="second">
				<div class="grid-content">
					<div class="shop-qrcode">
						<el-image :src="qrcode" style="width: 300px; height: 300px">
						<div slot="placeholder" class="image-slot">
							加载中<span class="dot">...</span>
						</div>
						</el-image>
						<p class="demonstration" style="cursor:pointer" @click="handleDownload">下载店铺二维码</p>
					</div>


				</div>
			</el-tab-pane>
		  </el-tabs>
	    <div>


	    </div>
	  </el-card>


</template>
<script>
import { storeInfo,storeEdit  } from '@/api/shop'
import {SYSURL} from '@/http/url'
import { DownClass } from '@/utils/DownClass'
import districtData from '@/data/districts'

export default {
    data() {
      return {
		dialogImageUrl: '',
		dialogVisible: false,
		disabled: false,
      	store:{},
        form: {
          store_logo: '',
          store_banner: '',
          store_description: '',
		  store_open_time:'',
		  store_close_time:'',
		  store_telephone:'',
		  district_ids:["310000", "310100", "310112"],
		  store_address:'',
		  store_area:'',
		  store_photo:[]
		},
		fileList:[],
        qrcode:'',
		uploadUrl:SYSURL.upload,
		activeName: 'first',
		rangTime: [],
		districtOptions:[]
      };
    },
    methods: {
    	getShopData(){

    		storeInfo().then( res => {
    			this.store = res.data;

    			this.form.store_logo = res.data.store_logo,
    			this.form.store_banner = res.data.store_banner,
				this.form.store_description = res.data.store_description,
				this.form.store_open_time = res.data.store_open_time,
				this.form.store_close_time = res.data.store_close_time,
				//this.form.district_ids = res.data.district_ids,
				this.form.store_address = res.data.store_address,
				this.form.store_telephone = res.data.store_telephone,
				this.form.store_photo = res.data.store_photo ? res.data.store_photo : []

				var district_ids = [];
				if( res.data.district_ids ){
					for( var i in res.data.district_ids ){
						district_ids.push(res.data.district_ids[i].toString())
					}
					this.form.district_ids = district_ids;
				}

				console.log( this.form )

				var fileList = [];
				if( res.data.store_photo ){
					for( var i in res.data.store_photo ){
						fileList.push({
							name:'',
							url:res.data.store_photo[i]
						})
					}
					this.fileList = fileList;
				}

				if( res.data.store_open_time && res.data.store_close_time ){
					this.rangTime = [this.formatDate(res.data.store_open_time),this.formatDate(res.data.store_close_time)];
				} else {
					this.rangTime = [new Date(2016, 9, 10, 9, 0),new Date(2016, 9, 10, 18, 0)];
				}

    			this.qrcode = res.data.qrcode;
    		})
		},
      	handleUploadSuccess(res, file,id) {
			if( res.status === 200 ){
				if( id == 'store_photo' ){
					this.form.store_photo.push(res.data.url) ;
				} else {
					this.form[id] = res.data.url;
				}

			}
     	},
     	handleDownload( item ){
	        const downClass = new DownClass()
	        let imageObject = {
	          lock: false,
	          fullName: this.store.store_name,
	          blob: null,
	          url:this.store.qrcode
	        }
	        downClass.downFile(imageObject)
	    },
      	onSubmit() {
        	storeEdit( this.form ).then( res => {
        		if( res.status === 200 ){
            		this.$message({
                  message: res.msg,
                  type: 'success'
                });
            	} else {
            		this.$message.error(res.msg);
            	}
        	})
		},
		formatDate( time ){
			var arr = time.split(":");
			return new Date(2016, 9, 10,Number(arr[0]),Number(arr[1]));
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
		handleRemove(file, fileList) {
			for( var i in fileList ){
				if( file.uid == fileList[i].uid ){
					this.fileList.splice(i,1);
					this.form.store_photo.splice(i,1);
				}
			}
		},
		handlePictureCardPreview(file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},
	 	initMap() {
			//设置地图中心点
			var myLatlng = new qq.maps.LatLng(39.916527,116.397128);
			//定义工厂模式函数
			var myOptions = {
				zoom: 8,               //设置地图缩放级别
				center: myLatlng,      //设置中心点样式
				mapTypeId: qq.maps.MapTypeId.ROADMAP  //设置地图样式详情参见MapType
			}
			//获取dom元素添加地图信息
			var map = new qq.maps.Map(document.getElementById("map"), myOptions);
		},
		  //异步加载地图库函数文件
		loadScript() {
			 return new Promise(function (resolve, reject) {
                window.init = function () {
					resolve(qq)//注意这里
				}
				var script = document.createElement("script");
				script.type = "text/javascript";
				script.src = "https://map.qq.com/api/js?v=2.exp&key=LWIBZ-JJKKJ-TDUFX-K2FDV-UOLNQ-L5BNU&callback=init";
				script.onerror = reject;
				document.head.appendChild(script);
			})

		}
	},
	watch: {
		rangTime: {
		　　　handler(newValue, oldValue) {
		　　　　　if(typeof newValue[0] == 'string'){
					this.form.store_open_time = newValue[0];
				}
				if(typeof newValue[1] == 'string'){
					this.form.store_close_time = newValue[1];
				}
		　　 },
	　　　　deep: true
	　　}
	},
	mounted () {
      	// this.loadScript().then(qq => {
        //     this.initMap()
        // });
  	},
    created(){
		this.getShopData();
		this.formatDistrict();
    }
  };
</script>
<style scoped>
    .store_logo {
    	width:150px;
    	height:150px;
    	line-height:150px;
    	text-align: center;
    	justify-content: center;
    	box-shadow: 0 2px 12px 0 rgba(236, 236, 236, 0.62);
    }
    .store_banner {
    	width:300px;
    	height:150px;
    	line-height:150px;
    	text-align: center;
    	justify-content: center;
    	box-shadow: 0 2px 12px 0 rgba(236, 236, 236, 0.62);
    }
    .store_logo .image {
    	width:150px;
    	height:150px;
    }
    .store_banner .image {
    	width:300px;
    	height:150px;
    }
    .store_banner  .el-upload,
    .store_logo .el-upload {
    	width:100%;
		height:100%;
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	}


	.shop-qrcode {
    	margin-top: 50px;
    	text-align: center;
		margin-bottom: 50px;
    }
	.store_banner[data-v-05048cda]{
		overflow: hidden;
	}
	.el-image{
		    width: 250px !important;
	    height: 250px !important;
	    padding: 20px;
	    background: #eee;
	    border-radius: 10px;
			margin-bottom:20px;
	}
</style>
