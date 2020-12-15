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
}
* {
  margin: 0;
  padding: 0;
}
.active{
  background:#BF7C3A;
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
  color: #FF5C00;
}
.el-card__header {
  padding:12px 20px;
}
.el-step.is-vertical .el-step__line {
  top: 5px !important;
}

</style>
