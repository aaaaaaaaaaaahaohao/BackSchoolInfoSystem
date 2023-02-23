<template>
  <div>
    <el-row style="margin-top:50px">
      <el-col :offset=11>
        <el-image
        style="width:140px; height: 120px"
        :src="require('@/assets/errorPage.png')"
        ></el-image>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset=8>
        <h1>您好像走丢了 快找到自己的方向吧</h1>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset=11>
        <router-link to="/systemEntrance">点击一下 立即返航</router-link>
      </el-col>
    </el-row>
  </div>
</template>
<script>
/* eslint-disable */
export default{
  data(){
    return {
    }
  },
}
</script>
<style scoped>

</style>