<template>
    <el-collapse class="category-aside" v-model="categoryData.activeName" accordion>
        <el-collapse-item :name="item.category_id" :key="index" v-for="(item,index) in categoryData.treeData">
            <h3 slot="title" class="category-title">
                {{item.category_name}}
            </h3>
            <ul class="category-row" v-if="item.sub">
                <li class="category-item" :key="key" v-for="(sub,key) in item.sub">
                    <a href="javascript:;" :class="{active:sub.category_id == categoryData.categoryId}" @click="cateroryClickHandle(sub.category_id)">{{sub.category_name}}</a>
                </li>
            </ul>
        </el-collapse-item>
    </el-collapse>
</template>
<script>
export default {
    data(){
        return {
           
        }
    },
    methods:{
        seCategoryId(id){
            this.$store.dispatch('common/setHelpCategoryId',id)
        },
        cateroryClickHandle(id){
            this.seCategoryId(id)
            this.$router.push("/help/lists/" + id)
        }
    },
    computed: {
        categoryData() {
            return this.$store.state.common.helpCategory
        }
    },
    created(){
        if(!this.categoryData.loaded){
            this.$store.dispatch('common/helpCategoryData')
        }
    }
}
</script>
<style scoped>
.category-aside {
    width: 250px;
    text-align: left;
    margin-right: 10px;
    border: solid 1px #e6e6e6;
    background: #fff;
}
.category-aside .category-title {
    padding: 0 20px;
}
.category-aside .category-row {
    background-color: #fafafa;
    padding: 10px 0 10px 35px;
}
.category-aside .category-row .category-item {
    font-size: 14px;
    line-height: 35px;
}
.category-aside .category-row .category-item a {
    display: block;
}
.category-aside .category-row .category-item a.active {
    color: #FF5C00;
}

</style>