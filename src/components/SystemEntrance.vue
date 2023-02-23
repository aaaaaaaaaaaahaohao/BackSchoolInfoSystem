<template>
  <el-container style="height:100%">
    <el-aside width="200px">
      <common-aside />
    </el-aside>
    <el-container>
      <el-header style="text-align: right;">
        <div class="userName">{{getUserName}}</div>
      </el-header>
      <common-bread />
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import CommonAside from '@/components/CommonAside.vue'
import CommonBread from '@/components/CommonBread.vue'

export default {
  data() {
    return {
    }
  },
  components: {
    CommonBread,
    CommonAside
  },
  computed: {
    getUserName(){
      let userInfo = localStorage.getItem('userInfo');
      if(userInfo){
        let res = JSON.parse(userInfo)
        return res.name;
      }
    }
  }
}
</script>

<style scoped>
.el-aside {
  background-color: #545c64;
  color: #333;
  text-align: center;
  line-height: 100vh;
}
.userName{
  color: #333;
  line-height: 2;
}
</style>
