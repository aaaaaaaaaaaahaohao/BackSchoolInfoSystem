<template>
    <div class="wrapper">
        <div class="wrapper_hd mb-1" v-if="showAddBtn">
            <el-button type="primary" size="small" @click="handleAddBtn">
                <i class="el-icon-plus"></i>
                添加公告
            </el-button>
        </div>
        <el-table :data="state.data" border max-height="600">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column v-for="(item, index) in columns" :key="index" :prop="item.prop" :label="item.label"
                v-bind="item" show-overflow-tooltip>
                <template v-if="item.slotName && item.slotName == 'action'" v-slot="scope">
                    <el-button type="text" @click="handleEditBtn(scope.row)">编辑</el-button>
                    <el-button type="text" @click="handleDelBtn(scope.row.id)">删除</el-button>
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
    getNoticePage, addNotice, updateNotice, deleteNotice
} from "@/api/index";
import { MessageBox } from 'element-ui';
export default {
    data() {
        return {
            columns: [
                { label: "标题", prop: "title", align: 'center' },
                { label: "内容", prop: "content", align: 'center' },
                {
                    label: "状态", prop: "status", align: 'center', formatter: function (row, column, cellValue, index) {
                        if (cellValue === 0) {
                            return '草稿'
                        }
                        if (cellValue === 1) {
                            return '已发布'
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
                {
                    span: 24,
                    component: "el-select",
                    key: "status",
                    label: "状态",
                    itemProps: {
                        placeholder: "请选择"
                    },
                    children: [
                        {
                            label: "发布",
                            value: 1
                        },
                        {
                            label: "草稿",
                            value: 0
                        },
                    ]
                },
            ],
            edited_id: -1,
            formData: {
                title: "",
                content: "",
                status: ""
            },
            default_formData: {
                title: "",
                content: "",
                status: ""
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
            let res = await getNoticePage({
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
                if (this.edited_id > 0) {
                    this.update();
                } else {
                    this.add();
                }
            })
        },
        async add() {
            let res = await addNotice(this.formData);
            if (res.type === 'success') {
                console.log(res);
                this.handleCancelBtn();
                this.initData();
            }
        },
        async update() {
            let res = await updateNotice({
                id: this.edited_id,
                title: this.formData.title,
                content: this.formData.content,
                status: this.formData.status
            });
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
        handleEditBtn(row) {
            this.edited_id = row.id;
            Object.assign(this.formData, row);
            this.show_add_dialog = true;
        },
        handleDelBtn(id) {
            MessageBox.confirm("是否删除？", "提示", {
                type: "warning"
            }).then(() => {
                this.del(id);
            })
        },
        async del(id) {
            let res = await deleteNotice({ id });
            if (res.type === 'success') {
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
        }
    }
};
</script>
<style scoped></style>
  