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
</style>
