<template>
  <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
    <el-menu-item v-for="item in noChildren" :key="item.name" :index="item.name+''" @click="clickItem(item)">
        <i :class= "`el-icon-${item.icon}`"></i>
        <span slot="title">{{item.label}}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" :key="item.name" :index="item.name+''">
        <template slot="title">
            <i class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{item.label}}</span>
        </template>
        <el-menu-item-group @click="clickItem(subItem)" v-for="subItem in item.children" :key="subItem.name+''" :index="subItem.name">
            <el-menu-item :index="subItem.name">{{subItem.label}}</el-menu-item>
            <el-menu-item :index="subItem.name">{{subItem.label}}</el-menu-item>
        </el-menu-item-group>
    </el-submenu>
  </el-menu>

</template>
<script>
/* eslint-disable */
import MenuData from '../data/MenuData'
export default {
    data() {
        return {
            isCollapse: false,
            MenuData
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        clickItem(item){
            // 防止自己跳自己的报错
            if(this.$route.path!==item.path&&!(this.$route.path==='/home'&&(item.path==='/'))){
                this.$router.push(item.path)
            }
        }
    },
    computed: {
        noChildren() {
            // 如果没有children则返回true,会被过滤器留下
            return this.MenuData.filter(item => !item.children)
        },
        hasChildren() {
            return this.MenuData.filter(item => item.children)
        }
    },
    created(){
        console.log('commonAside')
    }
}
</script>
<style scoped>

</style>