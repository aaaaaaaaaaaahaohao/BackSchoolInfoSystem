<template>
  <el-container style="height:100%">
    <el-aside width="200px">
        <common-aside/>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <span>{{$store.getters.user.name || '未登录'}}</span>
      </el-header>
      <common-bread/>
      <el-main>
        <el-row class="blackFrame" style="height:100%">
          <h3 class="tip">欢迎来到返校信息登记系统</h3>
        </el-row>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import CommonAside from '@/components/CommonAside.vue'
import CommonBread from '@/components/CommonBread.vue'

export default {
/* eslint-disable */
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
.el-main{
  margin-top : 20px;
  background: url('../assets/school.jpeg') no-repeat center center;
  background-size: 100% 100%;
}
.blackFrame{
  background-color: rgba(0,0,0,.5);
  display: flex;
  justify-content: center;
  align-items: center
}
.tip{
  color: white;
  font-size: 60px;
}
</style>

