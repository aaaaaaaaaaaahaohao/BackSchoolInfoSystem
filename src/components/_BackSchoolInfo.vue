<template>
  <div class="wrapper">
    <div class="wrapper_hd mb-1" v-if="showAddBtn">
      <el-button type="primary" size="small" @click="handleAddBtn">
        录入返校信息
      </el-button>
    </div>
    <el-table :data="state.data" border max-height="600">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column v-for="(item, index) in getColumn" :key="index" :prop="item.prop" :label="item.label"
        v-bind="item">
        <template v-if="item.slotName && item.slotName == 'action'" v-slot="scope">
          <el-button v-if="getUserInfo.type === 1 && scope.row.status !== 1 && getUserInfo.canCheck === 1" type="text"
            @click="handleCheckBtn(scope.row.id, 1)">审核通过</el-button>
          <el-button v-if="getUserInfo.type === 1 && scope.row.status !== 2 && getUserInfo.canCheck === 1" type="text"
            @click="handleCheckBtn(scope.row.id, 2)">驳回</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="d-flex justify-center py-2">
      <el-pagination v-bind="pageConfig" @size-change="pageSizeChange" @current-change="currentPageChange">
      </el-pagination>
    </div>

    <el-dialog title="录入" :visible.sync="show_add_dialog" center :close-on-click-modal="false" @close="handleCancelBtn">
      <el-form :model="formData" label-position="top" ref="formRef">
        <el-row>
          <el-col v-for="(item, index) in formConfig" :key="index" :span="item.span"
            style="padding: 0 10px;box-sizing: border-box;">
            <el-form-item :label="item.label" :value="formData[item.key]" :prop="item.key">
              <component :is="item.component" v-bind="item.itemProps" style="width: 100%;" v-model="formData[item.key]">
                <template v-if="item.component === 'el-select'">
                  <el-option v-for="(option, optionIndex) in item.children" :key="optionIndex" :label="option.label"
                    :value="option.value" :disabled="option.disabled"></el-option>
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
  getBackSchoolInfo,
  addBackSchoolInfo,
  deleteBackSchoolInfo,
  checkBackSchoolInfo
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
          span: 12,
          component: "el-input",
          key: "departPlace",
          label: "出发地",
          itemProps: {
            placeholder: "请输入"
          }
        },
        {
          span: 12,
          component: "el-date-picker",
          key: "departTime",
          label: "出发时间",
          itemProps: {
            placeholder: "请选择",
            'value-format': 'yyyy-MM-dd'
          }
        },
        {
          span: 12,
          component: "el-input",
          key: "destination",
          label: "目的地",
          itemProps: {
            placeholder: "请输入"
          }
        },
        {
          span: 12,
          component: "el-select",
          key: "transportMode",
          label: "出行方式",
          itemProps: {
            placeholder: "请选择"
          },
          children: [
            {
              label: "飞机",
              value: 0
            },
            {
              label: "高铁/火车",
              value: 1
            },
            {
              label: "汽车",
              value: 2
            },
          ]
        },
        {
          span: 12,
          component: "el-select",
          key: "isFever",
          label: "是否发烧",
          itemProps: {
            placeholder: "请选择"
          },
          children: [
            {
              label: "是",
              value: 1
            },
            {
              label: "否",
              value: 0
            },
          ]
        },
        {
          span: 12,
          component: "el-input",
          key: "temperature",
          label: "体温",
          itemProps: {
            placeholder: "请输入"
          }
        }
      ],
      formData: {
        departPlace: "",
        departTime: "",
        destination: "",
        transportMode: "",
        isFever: "",
        temperature: ""
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
      return this.getUserInfo.type === 2;
    },
    getColumn() {
      let that = this;
      return [
        { label: "学生姓名", prop: "name", align: 'center' },
        { label: "出发地", prop: "departPlace", align: 'center' },
        { label: "出发时间", prop: "departTime", align: 'center' },
        { label: "目的地", prop: "destination", align: 'center' },
        {
          label: "出行方式", prop: "transportMode", align: 'center', formatter: function (row, column, cellValue, index) {
            if (cellValue == 0) {
              return '飞机'
            }
            if (cellValue == 1) {
              return '高铁/火车'
            }
            if (cellValue == 2) {
              return '汽车'
            }
          }
        },
        {
          label: "是否发烧", prop: "isFever", align: 'center', formatter: function (row, column, cellValue, index) {
            if (cellValue === 0) {
              return '是'
            }
            if (cellValue === 1) {
              return '否'
            }
          }
        },
        { label: "体温", prop: "temperature", align: 'center' },
        {
          label: "创建时间", prop: "createTime", align: 'center', formatter: function (row, column, cellValue, index) {
            return that.timeFormat(Number(cellValue));
          }
        },
        {
          label: "状态", prop: "status", align: 'center', formatter: function (row, column, cellValue, index) {
            if (cellValue === 0) {
              return '待审批'
            }
            if (cellValue === 1) {
              return '已通过'
            }
            if (cellValue === 2) {
              return '已驳回'
            }
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
      let res = await getBackSchoolInfo({
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
      let res = await addBackSchoolInfo(this.formData);
      if (res.type === 'success') {
        console.log(res);
        this.handleCancelBtn();
        this.initData();
      }
    },
    handleCancelBtn() {
      this.$refs.formRef.resetFields();
      this.show_add_dialog = false;
    },

    handleCheckBtn(id, status) {
      MessageBox.confirm(`${status === 1 ? '是否通过？' : '是否驳回？'}`, '提示', {
        type: "warning"
      }).then(() => {
        this.check(id, status);
      })
    },
    async check(id, status) {
      let res = await checkBackSchoolInfo({
        id,
        status: status
      });
      if (res.type === 'success') {
        this.initData()
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
