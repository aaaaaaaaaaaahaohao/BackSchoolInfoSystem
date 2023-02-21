<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in path" :key="item.name" :index="item.name" :to="{ path: item.path }"
      >{{item.meta.title}}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>
<script >
/* eslint-disable */
export default {
  data() {
    return {
      path:[],
    };
  },
  watch: {
    $route(route) {
    //   if (route.path.startWith("/redirect")) {
    //     return;
    //   }
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      console.log("route", this.$route.matched);
      let path = this.$route.matched.filter((item) => item.meta && item.meta.title != false);
      this.path = path;
    },
  },
};
</script>
<style scoped>
.el-breadcrumb{
    margin-left: 20px;
}
</style>
