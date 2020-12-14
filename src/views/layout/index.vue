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

import Header from './components/Header'
import Footer from './components/Footer'
import Aside from './components/Aside'
import Main from './components/Main'

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