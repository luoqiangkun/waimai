<template>
    <div class="help-container">
        <div class="search-container">
            <div class="search-form">
                <el-input v-model="keyword" placeholder="请输入内容" class="width-600">
                    <template slot="append"><el-button type="primary" @click="getHelpList">搜索</el-button></template>
                </el-input>
            </div>
            <div class="search-lists"></div>          
        </div>
       
        <el-divider></el-divider>

        <ul class="help-lists" v-if="lists.length > 0">
            <li :key="index" v-for="(item,index) in lists">
                <router-link :to="'/help/detail/' + item.help_id" replace>{{item.help_title}}</router-link>
            </li>
        </ul>
        <div class="result no-result" v-else>
            <i class="el-icon-warning"></i>
            <p>没有返回结果</p>
        </div>
    </div>
</template>
<script>
import { helpList } from "@/api"
export default {
    data(){
        return {
           lists:[],
           keyword:''
        }
    },
    computed: {
        categoryId() {
            return this.$store.state.common.helpCategory.categoryId
        }
    },
    watch: {
        categoryId: function(newVal, oldVal) {
           this.getHelpList()
        }
    },
    methods:{
       getHelpList(){
           let params = {category_id:this.categoryId,keyword:this.keyword}
           helpList(params).then(res=>{
               if(res.status === 200){
                   this.lists = res.data.items;
               }
           })
       }
    },
    created(){
        if(!this.categoryId){
            this.getHelpList()
        }
    }
}
</script>
<style scoped>
.width-600 {
    width: 600px;
}

.help-lists {
    font-size: 15px;
    line-height: 40px;
    font-weight: 400;
}
.no-result {
    position: absolute;
    left:50%;
    top: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    opacity: .6;
}
.no-result i {
    font-size: 60px;
    color: #FF5C00;
}
.no-result p {
    color:#666;
}
</style>