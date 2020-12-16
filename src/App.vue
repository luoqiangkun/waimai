<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html , body {
  height:100vh;
  overflow: hidden;
  color: #606266;
  font-size: 14px;
  line-height: 24px;
}
#app {
  height: 100%;
  position: relative;
}
* {
  margin: 0;
  padding: 0;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
a {
  color: #333;
  text-decoration: none;
}

.goback{
  display: inline-block;
	float:right;
  vertical-align: middle;
  color: #FF5C00;
}
.back{
  font-size: 21px;
  vertical-align: middle;
  color: ##FF5C00;
}
.el-steps--simple {
  padding-top: 20px;
  padding-bottom: 20px;
}
.el-step.is-simple .el-step__head {
    display: flex;
}
.el-upload--picture-card {
  width: 120px;
  height: 120px;
  line-height: 120px;
}
.el-upload--picture-card img {
  width: 100%;
  height:100%;
}
.image-IDCard .el-upload--picture-card {
  width: 180px;
}
.el-collapse-item__content {
  padding-bottom: 0;
}
.el-card__header {
      padding: 12px 20px;
}
</style>
