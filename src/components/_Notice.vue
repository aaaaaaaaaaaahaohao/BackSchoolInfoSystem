<template>
    <div class="wrapper">
        <el-row>
            <el-col :span="24" v-for="(item, index) in state.data" :key="index">
                <el-card class="box-card" style="margin-bottom: 20px;">
                    <div slot="header" class="clearfix">
                        <span class="title">{{ item.title }}</span>
                        <span class="createTime"> {{ timeFormat(Number(item.createTime)) }} </span>
                    </div>
                    <div class="content">
                        {{ item.content }}
                    </div>
                </el-card>

            </el-col>
        </el-row>
    </div>
</template>

<script>
import {
    getNoticeList
} from "@/api/index";
export default {
    data() {
        return {
            state: {
                data: []
            }
        }
    },
    mounted() {
        this.initData();
    },
    methods: {
        initData() {
            this.getNoticeList();
        },
        async getNoticeList() {
            let res = await getNoticeList();
            if (res.type === 'success') {
                this.state.data = res.data.records;
            }
        },
        timeFormat(currentTime) {
            if (currentTime) {
                let date = new Date(currentTime);
                let y = date.getFullYear().toString().padStart(2, '0');
                let m = (date.getMonth() + 1).toString().padStart(2, '0');
                let d = date.getDate().toString().padStart(2, '0');
                let h = date.getHours().toString().padStart(2, '0');
                let min = date.getMinutes().toString().padStart(2, '0');
                let s = date.getSeconds().toString().padStart(2, '0');
                return `${y}-${m}-${d}`;
            }
        }
    }
}
</script>

<style scoped>
.wrapper {
    max-height: 600px;
}

.title {
    font-size: 18px;
    font-weight: bold;
    line-height: 2;
    color: #333;
}

.createTime {

    color: #666;
}

.content {
    color: #333;

}
</style>