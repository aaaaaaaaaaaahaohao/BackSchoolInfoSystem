<template>
    <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" background-color="#545c64" text-color="#fff"
        active-text-color="#ffd04b" :default-active="$route.path">
        <el-menu-item v-for="item in noChildren" :key="item.name" :index="item.path" @click="clickItem(item)">
            <span slot="title">{{ item.label }}</span>
        </el-menu-item>
        <el-menu-item index="logout" @click="handleLogout">退出登录</el-menu-item>
        <el-submenu v-for="item in hasChildren" :key="item.name" :index="item.path">
            <template slot="title">
                <span slot="title">{{ item.label }}</span>
            </template>
            <el-menu-item-group @click="clickItem(subItem)" v-for="subItem in item.children" :key="subItem.name"
                :index="subItem.name">
                <el-menu-item :index="subItem.name">{{ subItem.label }}</el-menu-item>
                <el-menu-item :index="subItem.name">{{ subItem.label }}</el-menu-item>
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
        clickItem(item) {
            this.$router.push(item.path);
        },
        handleLogout() {
            localStorage.clear();
            this.$router.push({
                path: '/'
            })
        }
    },
    created() {
        console.log(this.$route.path)
    },
    computed: {
        getUserInfo() {
            let userInfo = localStorage.getItem('userInfo');
            console.log(userInfo)
            if (userInfo) {
                let res = JSON.parse(userInfo)
                return res;
            }
        },
        noChildren() {
            let userType = this.getUserInfo.type;
            console.log(userType);
            // 如果没有children则返回true,会被过滤器留下
            return this.MenuData.filter(item => !item.children && item.auth.includes(userType))
        },
        hasChildren() {
            return this.MenuData.filter(item => item.children && item.auth.includes(userType))
        }
    },
}
</script>
<style scoped></style>