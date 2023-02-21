<template>
  <el-container style="height:100%">
    <el-aside width="200px">
        <common-aside/>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <span>王小虎</span>
      </el-header>
      <common-bread/>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import CommonAside from '@/components/CommonAside.vue'
import CommonBread from '@/components/CommonBread.vue'

export default {
  data () {
    return {
    }
  },
  components: {
    CommonBread,
    CommonAside
  },
  created () {
    console.log('systemEntrance')
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
</style>
