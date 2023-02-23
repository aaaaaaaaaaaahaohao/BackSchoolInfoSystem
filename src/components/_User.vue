<template>
    <div class="wrapper">
        <el-table :data="state.data" border max-height="600">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column v-for="(item, index) in columns" :key="index" :prop="item.prop" :label="item.label"
                v-bind="item" show-overflow-tooltip>
                <template v-if="item.slotName && item.slotName == 'action'" v-slot="scope">
                    <el-button type="text" @click="handleSetBtn(scope.row)">设置用户权限</el-button>
                </template>
            </el-table-column>

        </el-table>
        <div class="d-flex justify-center py-2">
            <el-pagination v-bind="pageConfig" @size-change="pageSizeChange" @current-change="currentPageChange">
            </el-pagination>
        </div>

        <el-dialog title="录入" :visible.sync="show_add_dialog" center @close="handleCancelBtn" :close-on-click-modal="false">
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
    </div>
</template>
<script>
import {
    userUpdate, getUserPage
} from "@/api/index";
import { MessageBox } from 'element-ui';
export default {
    data() {
        return {
            columns: [
                { label: "账号 ", prop: "account", align: 'center' },
                { label: "姓名 ", prop: "name", align: 'center' },
                { label: "班级", prop: "classId", align: 'center' },
                {
                    label: "是否允许回复心理咨询", prop: "canReply", align: 'center', formatter: function (row, column, cellValue, index) {
                        if (cellValue === 1) {
                            return '允许'
                        }
                        if (cellValue === 0) {
                            return '不允许'
                        }
                    }
                },
                {
                    label: "是否允许审批返校信息", prop: "canCheck", align: 'center', formatter: function (row, column, cellValue, index) {
                        if (cellValue === 1) {
                            return '允许'
                        }
                        if (cellValue === 0) {
                            return '不允许'
                        }
                    }
                },
                { label: "操作", prop: "slot", slotName: "action", align: 'center' },
            ],

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
                    component: "el-select",
                    key: "canReply",
                    label: "允许回复心理咨询",
                    itemProps: {
                        placeholder: "请选择"
                    },
                    children: [
                        {
                            label: "允许",
                            value: 1
                        },
                        {
                            label: "不允许",
                            value: 0
                        }
                    ]
                },
                {
                    span: 24,
                    component: "el-select",
                    key: "canCheck",
                    label: "允许审批返校信息",
                    itemProps: {
                        placeholder: "请选择"
                    },
                    children: [
                        {
                            label: "允许",
                            value: 1
                        },
                        {
                            label: "不允许",
                            value: 0
                        }
                    ]
                },
            ],
            edited_id: -1,
            formData: {
                canReply: "",
                canCheck: ""
            },
            default_formData: {
                canReply: "",
                canCheck: ""
            }
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
            return this.getUserInfo.type === 0;
        }
    },
    mounted() {
        this.initData();
    },
    methods: {
        async initData() {
            let res = await getUserPage({
                pageNum: this.pageConfig.current,
                pageSize: this.pageConfig.pageSize
            });
            if (res.type === "success") {
                console.log(res);
                this.pageConfig.total = Number(res.data.total);
                this.state.data = res.data.records;
            }
        },
        handleSubmitBtn() {
            MessageBox.confirm('是否提交', '提示', {
                type: "warning"
            }).then(() => {
                this.update();
            })
        },
        async update() {
            let res = await userUpdate({
                id: this.edited_id,
                canReply: this.formData.canReply,
                canCheck: this.formData.canCheck
            });
            if (res.type === 'success') {
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
        handleSetBtn(row) {
            console.log(row)
            this.edited_id = row.id;
            Object.assign(this.formData, row);
            this.show_add_dialog = true;
        },
        pageSizeChange(pageSize) {
            this.pageConfig.current = 1;
            this.pageConfig.pageSize = pageSize;
            this.initData();
        },
        currentPageChange(pageIndex) {
            this.pageConfig.current = pageIndex;
            this.initData();
        }
    }
};
</script>
<style scoped></style>
  