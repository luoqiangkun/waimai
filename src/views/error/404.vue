
<template>
    <div class="error-content">
        <div class="error-image">
            <img :src="image404" >
        </div>
        <div class="error-message">找不到页面</div>
        <div class="error-btn">
            <router-link to="/"><el-button type="primary" size="small">前往首页</el-button></router-link>
        </div>
        
    </div>
</template>

<script>

export default {
  	data() {
        return {
            image404:require('@/assets/images/404.png')
        }   
    },
    methods: {
    	
    },
    created(){
    	
    }
}
</script>

<style scoped>
.error-content {
    height: 400px;
    width:400px;
    text-align: center;
    position: absolute;
    top:50%;
    left: 50%;;
    margin-top:-200px;
    margin-left:-200px;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
}

.error-image,
.error-message,
.error-btn {
    width: 100%;
}

.error-image img {
   width:350px;
}
.error-message {
   color: #999;
}
</style>
