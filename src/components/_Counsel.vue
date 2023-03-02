<template>
    <div class="wrapper">
        <div class="wrapper_hd mb-1" v-if="showAddBtn">
            <el-button type="primary" size="small" @click="handleAddBtn">
                立即咨询
            </el-button>
        </div>

        <el-table :data="state.data" border max-height="600">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column v-for="(item, index) in getColumn" :key="index" :prop="item.prop" :label="item.label"
                v-bind="item" show-overflow-tooltip>
                <template v-if="item.slotName && item.slotName == 'action'" v-slot="scope">
                    <el-button :disabled="!(getUserInfo.type === 1&&!scope.row.reply && getUserInfo.canReply === 1)" type="text"
                        @click="handleReplyBtn(scope.row.id)">回复</el-button>

                </template>
            </el-table-column>

        </el-table>
        <div class="d-flex justify-center py-2">
            <el-pagination v-bind="pageConfig" @size-change="pageSizeChange" @current-change="currentPageChange">
            </el-pagination>
        </div>

        <el-dialog title="心理咨询" :visible.sync="show_add_dialog" center @close="handleCancelBtn" :close-on-click-modal="false">
            <el-form :model="formData" label-position="top" ref="formRef">
                <el-row>
                    <el-col v-for="(item, index) in formConfig" :key="index" :span="item.span"
                        style="padding: 0 10px;box-sizing: border-box;">
                        <el-form-item :label="item.label" :value="formData[item.key]" :prop="item.key">
                            <component :is="item.component" v-bind="item.itemProps" style="width: 100%;"
                                v-model="formData[item.key]">
                                <template v-if="item.component === 'el-select'">
                                    <el-option v-for="(option, optionIndex) in item.children" :key="optionIndex"
                                        :label="option.label" :value="option.value" :disabled="option.disabled"></el-option>
                                </template>
                            </component>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCancelBtn">取 消</el-button>
                <el-button type="primary" @click="handleSubmitBtn">提 交</el-button>
            </span>
        </el-dialog>
        <el-dialog title="回复" :visible.sync="show_reply_dialog" center @close="onReplyDialogClose" :close-on-click-modal="false">
            <el-form>
                <el-form-item>
                    <el-input v-model="reply" placeholder="请输入" type="textarea"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="onReplyDialogClose">取 消</el-button>
                <el-button type="primary" @click="handleSubmitReplyBtn">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {
    getCounselPage, addCounsel, reply
} from "@/api/index";
import { MessageBox } from 'element-ui';
export default {
    data() {
        return {
            columns: [],

            pageConfig: {
                pageSize: 10,
                current: 1,
                total: 0,
                pageSizes: [10, 20, 30, 50],
                layout: "total,  prev, pager, next, jumper",
                small: true,
                background: true
            },
            state: {
                data: []
            },
            show_add_dialog: false,
            formConfig: [
                {
                    span: 24,
                    component: "el-input",
                    key: "title",
                    label: "标题",
                    itemProps: {
                        placeholder: "请输入"
                    }
                },
                {
                    span: 24,
                    component: "el-input",
                    key: "content",
                    label: "内容",
                    itemProps: {
                        placeholder: "请输入",
                        type: 'textarea'
                    }
                },
            ],
            edited_id: -1,
            formData: {
                title: "",
                content: "",
            },
            default_formData: {
                title: "",
                content: "",
            },

            show_reply_dialog: false,
            reply: ""
        };
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
        showAddBtn() {
            return this.getUserInfo.type === 2;
        },
        getColumn() {
            let that = this;
            return [
                { label: "标题", prop: "title", align: 'center' },
                { label: "内容", prop: "content", align: 'center' },
                { label: "回复", prop: "reply", align: 'center' },
                { label: "姓名", prop: "name", align: 'center' },
                { label: "学号", prop: "account", align: 'center' },
                { label: "性别", prop: "gender", align: 'center', formatter: function(row, column, cellValue, index){
                    if(cellValue === 1){
                        return '男'
                    }
                    if(cellValue === 0){
                        return '女'
                    }
                } },
                // { label: "班级", prop: "classId", align: 'center' },
                {
                    label: "创建时间", prop: "createTime", align: 'center', formatter: function (row, column, cellValue, index) {
                        return that.timeFormat(Number(cellValue));
                    }
                },
                { label: "操作", prop: "slot", slotName: "action", align: 'center' },
            ]
        }
    },
    mounted() {
        this.initData();
    },
    methods: {
        async initData() {
            let res = await getCounselPage({
                pageNum: this.pageConfig.current,
                pageSize: this.pageConfig.pageSize
            });
            if (res.type === "success") {
                console.log(res);
                this.pageConfig.total = Number(res.data.total);
                this.state.data = res.data.records;
            }
        },
        handleAddBtn() {
            this.show_add_dialog = true;
        },
        handleSubmitBtn() {
            MessageBox.confirm('是否提交', '提示', {
                type: "warning"
            }).then(() => {
             this.add();
            })
        },
        async add() {
            let res = await addCounsel(this.formData);
            if (res.type === 'success') {
                console.log(res);
                this.handleCancelBtn();
                this.initData();
            }
        },

        handleCancelBtn() {
            this.edited_id = -1;
            this.$refs.formRef.resetFields();
            this.formData = Object.assign({}, this.default_formData);
            this.show_add_dialog = false;
        },
        onReplyDialogClose() {
            this.reply = "";
            this.edited_id = -1;
            this.show_reply_dialog = false;
        },
        handleReplyBtn(id) {
            console.log(id);
            this.edited_id = id;
            this.show_reply_dialog = true;
        },
        handleSubmitReplyBtn(){
            MessageBox.confirm("是否回复", "提示", {
                type: "warning"
            }).then(()=>{
                this.confirmReply();
            })
        },  
        async confirmReply(){
            let res = await reply({
                id: this.edited_id,
                reply: this.reply
            });
            if(res.type === 'success'){
                console.log(res);
                this.onReplyDialogClose();
                this.initData();
            }
        }, 
        pageSizeChange(pageSize) {
            this.pageConfig.current = 1;
            this.pageConfig.pageSize = pageSize;
            this.initData();
        },
        currentPageChange(pageIndex) {
            this.pageConfig.current = pageIndex;
            this.initData();
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
                return `${y}-${m}-${d} ${h}:${min}:${s}`;
            }
        }
    }
};
</script>
<style scoped></style>
  