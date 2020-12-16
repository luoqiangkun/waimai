<template>
  <el-container style="height:100%">
      <Aside></Aside>
        <el-container class="is-vertical">
          <Header style="height:50px"></Header>
          <Main>
          </Main>
          <Footer></Footer>
        </el-container>
    </el-container>
</template>
<script>

import Header from './Header'
import Footer from './Footer'
import Aside from './Aside'
import Main from './Main'

export default {
  name:'layout',
  components:{
    'Header':Header,
    // 'Footer':Footer,
    'Aside' :Aside,
    'Main' : Main
  },
  data() {
    return {
    };
  },
  methods: {
    
  }
};
</script>
<style scoped>
  .page-body {
    height: 100%;
  }
  .el-main {
    background: rgb(249, 249, 249);
    padding: 10px;
  }
  
</style>