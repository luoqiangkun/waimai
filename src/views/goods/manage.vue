<template>
	<el-form :model="form" :rules="rules" ref="form" label-width="100px" class="manage" v-loading="loading">
		<el-card class="box-card" style="padding:0 30px">
		  <div slot="header" class="clearfix">
		    <span>基本信息</span>
				<div class="goback" @click="goback"><i class="el-icon-back back"></i>返回上一级</div>
		  </div>
		  <div>
		  	<el-form-item label="商品名称" prop="goods_name">
				<el-input v-model="form.goods_name"></el-input>
			</el-form-item>

			<el-form-item label="商品分类" prop="category_id">
				<el-select v-model="form.category_id" placeholder="请选择商品分类">
				  	<el-option
				      v-for="item in category"
				      :key="item.category_id"
				      :label="item.category_name"
				      :value="item.category_id">
				    </el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="商品图片" prop="goods_image">
				<el-upload
				  class="image-uploader goods_image"
				  :action="uploadUrl"
				  name="upfile"
				  :on-success="handleUploadSuccess"
				  :show-file-list="false"
				>
				  <img v-if="form.goods_image" :src="form.goods_image" class="image" />
				  <i v-else class="el-icon-plus image-uploader-icon"></i>
				</el-upload>
			</el-form-item>

			<el-form-item label="商品描述" prop="goods_desc">
				<el-input type="textarea" v-model="form.goods_desc" :rows="5"></el-input>
			</el-form-item>

			<el-form-item label="商品单位" prop="unit_id">
				<el-select v-model="form.unit_id" placeholder="请选择商品单位">
				    <el-option
				      v-for="item in unit"
				      :key="item.unit_id"
				      :label="item.unit_name"
				      :value="item.unit_id">
				    </el-option>
				</el-select>
			</el-form-item>

		  </div>
		</el-card>

		<el-card class="box-card" style="padding:0 30px;margin-top:20px">
		  <div slot="header" class="clearfix">
		    <span>价格与库存</span>
		  </div>
		  <div >
		     <el-table
			    :data="form.items"
			    border
			    style="width: 100%">

			    <el-table-column
			      label="规格"
			      align="center"
			      v-if="showSpec"
				  key="1"
			    >
			      	<el-input v-show="true" slot-scope="scope" v-model="scope.row.spec_name" placeholder="商品规格"/>
			    </el-table-column>

			    <el-table-column
			      label="价格"
			      align="center"
				  key="2"
			    >

			    <el-input v-show="true" slot-scope="scope" v-model="scope.row.item_price" placeholder="价格"/>
			    </el-table-column>
			     <el-table-column
			      label="库存"
			      align="center"
				  key="3"
			    >
			      	<el-input v-show="true" slot-scope="scope" v-model="scope.row.item_stock" placeholder="库存"/>
			    </el-table-column>

			   
			    <el-table-column
			      label="商品编码"
			      align="center"
				  key="5"
			    >
			      <el-input v-show="true" slot-scope="scope" v-model="scope.row.item_number" placeholder="商品编码"/>
			    </el-table-column>
			    <el-table-column
			      label="条形码"
			      align="center"
				  key="6"
			    >
			      	<el-input v-show="true" slot-scope="scope" v-model="scope.row.item_barcode" placeholder="条形码"/>
			    </el-table-column>

				<el-table-column
			      label="起订量"
			      align="center"
				  key="7"
			    >
			      	<el-input v-show="true" slot-scope="scope" v-model="scope.row.item_minimum" placeholder="起订量"/>
			    </el-table-column>

				<el-table-column
			      label="打包盒"
			      align="center"
				  key="8"
			    >
			      	<el-input v-show="true" slot-scope="scope" v-model="scope.row.item_lunch_box_fee" placeholder="打包盒"/>
			    </el-table-column>

			    <el-table-column
			      label="操作"
			      align="center"
			      width="80"
			      v-if="showSpec"
				  key="9"
			    >
			      <i class="el-icon-plus el-icon-delete" slot-scope="scope" @click="handleDelSpec(scope.$index)"></i>

			   
			    </el-table-column>

			  </el-table>

			  	<div class="action clearfix">
		         	<i class="el-icon-circle-plus-outline"  @click="addSpec"></i>
		         	<span>添加多规格</span>
		        </div>

		  </div>
		</el-card>

		<el-card class="box-card" style="padding:0 30px;margin-top:20px">
		  <div slot="header" class="clearfix">
		    <span>商品属性</span>
		  </div>
		  <div >
		   	<el-table
			    :data="goods_attribute"
			    border
			    style="width: 100%"
			    v-if="showAttr"
			    >
			    <el-table-column
			      label="名称"
			      align="center"
			      width="180">
			      	<el-input v-show="true" slot-scope="scope" v-model="scope.row.name" placeholder="名称"/>
			    </el-table-column>
			    <el-table-column
			      label="内容"
			      align="center"
			    >
			      	<tags-input placeholder="添加属性值" :typeahead="true" :existing-tags="scope.row.items"   slot-scope="scope" v-model="scope.row.items"></tags-input>
			    </el-table-column>

			    <el-table-column
			      label="操作"
			      align="center"
			      width="80">
			      <i class="el-icon-plus el-icon-delete" slot-scope="scope" @click="handleDelAttr(scope.$index)"></i>
			    </el-table-column>
			    
		  	</el-table>

		   <div class="tips">选择商品属性</div>
		   <div class="action clearfix">
		     	<i class="el-icon-circle-plus-outline" @click="addAttribute"></i>
		     	<span>添加属性</span>
		    </div>

		  </div>
		</el-card>

		<div class="form-bottom">
			<el-form-item>
				<el-button type="primary" @click="submitForm('form')">保存</el-button>
				<el-button @click="goback">取消</el-button>
			</el-form-item>

		</div>
		
		

	</el-form>
</template>
<script>
import Vue from 'vue'
import VoerroTagsInput from '@voerro/vue-tagsinput'
import '@voerro/vue-tagsinput/dist/style.css'
import {SYSURL} from '@/http/url'

Vue.component('tags-input', VoerroTagsInput);

import { goodsAdd,goodsInfo,unitLists,cateLists  } from '@/api/goods'

export default {
  	components: { VoerroTagsInput },
    data() {
      return {
      	showSpec:false,
        showAttr:false,
        loading:false,
        goods_attribute:[],
        unit:[],
        category:[],
        uploadUrl:SYSURL.upload,
        form: {
        	goods_id:0,
          	goods_name: '',
          	category_id: '',
          	goods_image: '',
          	goods_desc: '',
          	unit_id:'',
        	items:[{
          		spec_id:0,
          		spec_name:'',
	            item_price: '',
	            item_stock: '',
	            item_lunch_box_fee: '',
	            item_number: '',
	            item_barcode:'',
	            item_minimum:1
        	}],
        	goods_attribute:[],
        },
        rules: {
          goods_name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
          ],
          category_id: [
            { required: true, message: '请选择商品分类', trigger: 'change' }
          ],
          goods_image: [
            { required: true, message: '请上传商品图片', trigger: 'change' }
          ],
          goods_desc: [
            { required: true, message: '请填写商品描述', trigger: 'blur' }
          ],
          unit_id: [
            { required: true, message: '请选择商品单位', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
    	getGoodsData(){
    		this.loading = true;
    		goodsInfo({goods_id:this.form.goods_id}).then( res => {
    			this.form = res.data
    			this.goods_attribute = this.fixAttribute( res.data.goods_attribute );
    			if(this.goods_attribute.length > 0 ) {
    				this.showAttr = true
    			}

    			if( res.data.goods_spec.length >0 ){
    				this.showSpec = true
    			}
    			this.loading = false
    		})
    	},
    	getCateData( data ){
	        cateLists().then( res => {
	          this.category = res.data.items;
	        })
	      },
    	getUnitData( data ){
	        unitLists( ).then( res => {
	          this.unit = res.data.items;
	        })
	      },
    	handleUploadSuccess(res, file) {
    		if( res.status === 200 ){
    			this.form.goods_image = res.data.url;
    		}	        
	    },
    	addSpec(){
    		if( this.showSpec ){
    			this.form.items.push({
    				spec_id:0,
	          		spec_name:'',
		            item_price: '',
		            item_stock: '',
		            item_lunch_box_fee: '',
		            item_number: '',
		            item_barcode:'',
		            item_minimum:1
    			})
    		}
    		this.showSpec = true
    	},
    	addAttribute(){
    		this.goods_attribute.push({
				name : '',
    			items: []
			})
        	this.showAttr = true
    	},
    	handleDelSpec( i ){
    		this.form.items.splice(i,1);
    		if( this.form.items.length === 0 ){
    			this.showSpec = false;
    			this.form.items.push({
    				spec_id:0,
	          		spec_name:'',
		            item_price: '',
		            item_stock: '',
		            item_lunch_box_fee: '',
		            item_number: '',
		            item_barcode:'',
		            item_minimum:1
    			})
    		}
    	},
    	handleDelAttr( i ){
    		this.goods_attribute.splice(i,1);
    		if( this.goods_attribute.length === 0 ){
    			this.showAttr = false;
    		}
    	},
    	fixAttribute( data ){
    		let fixData = [];
    		for( let i in data ){
				let fixDataItem = {};
    			fixDataItem.name = data[i].name;
    			fixDataItem.items = [];
    			for( let k in data[i].items ){
    				fixDataItem.items.push( {key:data[i].items[k],value:data[i].items[k]})
    			}
    			fixData.push( fixDataItem );
    		}

    		return fixData;
    	},
      	submitForm(formName) {
      		let goods_attribute = [];
      		for( let i in this.goods_attribute ){
      			goods_attribute[i] = {};
      			goods_attribute[i].name = this.goods_attribute[i].name;
      			goods_attribute[i].items = [];
      			for ( let k in this.goods_attribute[i].items ) {
      				goods_attribute[i].items.push( this.goods_attribute[i].items[k].value );
      			}
      		}
      		this.form.goods_attribute = goods_attribute;
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	            goodsAdd( this.form ).then( res => {
	            	if( res.status === 200 ){
	            		this.$message({
		                	message: '操作成功',
		                	type: 'success'
		              	});

	            		this.$router.go(-1);
	            	} else {
	            		this.$message.error(res.msg);
	            	}
	            })
	          } else {
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
    	this.getUnitData();
    	this.getCateData();
    	if( this.$route.params.id ){
    		this.form.goods_id = this.$route.params.id;
    		this.getGoodsData();
    	}
    }
 }
</script>

<style scoped>
.manage {
	width:900px;
	margin:0 auto
}
.goods_image .image-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
.image-uploader .el-upload:hover {
	border-color: #409EFF;
}
.goods_image .image-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	line-height: 178px;
	text-align: center;
	border:1px solid #DCDFE6;
}
.goods_image .image {
	width: 178px;
	height: 178px;
	display: block;
}

.tips {
	margin-top:10px;
}
.action {
	margin-top:10px;
}
.form-bottom {
	margin-top:20px;
}

</style>