<template>
  <div>
    <!-- <el-container width="100%">
      <el-row :gutter="20">
        <div>
            <el-col :span="2" class="text-align">学生ID</el-col>
            <el-col :span="6">
            <el-input class="input-width-height" type="text"></el-input>
            </el-col>
        </div>
        <div>
            <el-col :span="2" class="text-align">学生姓名</el-col>
            <el-col :span="6">
            <el-input class="input-width-height" type="text"></el-input>
            </el-col>
        </div>
        <el-col :span="2">
          <el-button type="success">
            <i class="el-icon-search"></i>
            搜索
          </el-button>
        </el-col>
        <el-col :span="2">
          <el-button>
            <i class="el-icon-reset"></i>
            重置
          </el-button>
        </el-col>
      </el-row>
    </el-container> -->
    <el-row style="margin-top:20px;">
      <el-button type="goon" @click="showDialog">
        <i class="el-icon-plus"></i>
        增加一条新的返校信息
      </el-button>
    </el-row>
    <el-table :data="tableData" border>
      <el-table-column prop="stuName" label="学生姓名" :width="200">
      </el-table-column>
      <el-table-column prop="stuId" label="学生Id" :width="200">
      </el-table-column>
      <el-table-column prop="departPlace" label="出发地" :width="200">
      </el-table-column>
      <el-table-column prop="departTime" label="出发时间" :width="200">
      </el-table-column>
      <el-table-column prop="destination" label="目的地" :width="200">
      </el-table-column>
      <el-table-column prop="isFever" label="是否发烧" :width="200">
      </el-table-column>
      <el-table-column prop="temperature" label="体温" :width="200">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleDelete(scope.row)" type="text" size="small"
            >删除</el-button
          >
          <el-button @click="handleUpdate(scope.row)" type="text" size="small"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :offset="9" style="margin-top: 20px;">
        <el-pagination background layout="prev, pager, next" :total="50">
        </el-pagination>
      </el-col>
    </el-row>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
      <h2>{{ dialogTip }}</h2>
      <el-row>
        <el-col :span="4">学生姓名:</el-col>
        <el-col :span="20">
          <input
            type="text"
            v-model="BSInfo.stuName"
            placeholder="学生姓名"
            autocomplete="off"
          />
        </el-col>
        <el-col :span="4">出发地:</el-col>
        <el-col :span="20">
          <input
            type="text"
            v-model="BSInfo.departPlace"
            placeholder="出发地"
            autocomplete="off"
          />
        </el-col>
        <el-col :span="4">出发时间:</el-col>
        <el-col :span="20">
          <input
            type="text"
            v-model="BSInfo.departTime"
            placeholder="出发时间"
            autocomplete="off"
          />
        </el-col>
        <el-col :span="4">目的地:</el-col>
        <el-col :span="20">
          <input
            type="text"
            v-model="BSInfo.destination"
            placeholder="目的地"
            autocomplete="off"
          />
        </el-col>
        <el-col :span="4">出行方式:</el-col>
        <el-col :span="20">
          <input
            type="text"
            v-model="BSInfo.transportMode"
            placeholder="出行方式"
            autocomplete="off"
          />
        </el-col>
        <el-col :span="4">是否发烧:</el-col>
        <el-col :span="20">
          <el-radio v-model="BSInfo.isFever" :label="true">是</el-radio>
          <el-radio v-model="BSInfo.isFever" :label="false">否</el-radio>
        </el-col>
        <el-col :span="4">体温:</el-col>
        <el-col :span="20">
          <input
            type="text"
            v-model="BSInfo.temperature"
            placeholder="体温"
            autocomplete="off"
          />
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addBSInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>

  <!-- <common-table :table-data="tableData" :table-column="tableColumn" :headerFunctionName="headerFunctionName" /> -->
  <!-- <el-table-column v-for="column in tableColumn" :key="column.id" :index="column.id" :prop="column.varName" :label="column.name" width="conlumn.width"> </el-table-column> -->
</template>
<script>
import CommonTable from "@/components/CommonTable";
import convertToString from "@/utils/convertToString";
import {
  getBackSchoolInfo,
  addBackSchoolInfo,
  deleteBackSchoolInfo
} from "@/api/index";
import { nanoid } from "nanoid";
export default {
  /* eslint-disable */
  components: { CommonTable },
  data() {
    return {
      dialogTip: "新增返校信息",
      stuName: "",
      departPlace: "",
      departTime: "",
      destination: "",
      isFever: "",
      temperature: "",
      transportMode: "",
      BSInfo: {},
      tableData: [
        {
          id: 1,
          stuName: "haohao",
          stuId: 1,
          departPlace: "东莞",
          departTime: "2022/12/2",
          destination: "新西兰",
          isFever: false,
          temperature: 36.5
        },
        {
          id: 2,
          stuName: "haohao",
          stuId: 2,
          departPlace: "东莞",
          departTime: "2022/12/2",
          destination: "大理",
          isFever: true,
          temperature: 36.5
        },
        {
          id: 3,
          stuName: "haohao",
          stuId: 3,
          departPlace: "东莞",
          departTime: "2022/12/2",
          destination: "贵州",
          isFever: false,
          temperature: 36.5
        },
        {
          id: 4,
          stuName: "haohao",
          stuId: 4,
          departPlace: "东莞",
          departTime: "2022/12/2",
          destination: "深圳",
          isFever: false,
          temperature: 36.5
        }
      ],
      tableColumn: [
        { name: "学生ID", varName: "stuId", width: 200 },
        { name: "学生姓名", varName: "stuName", width: 100 },
        { name: "出发地", varName: "departPlace", width: 200 },
        { name: "出发时间", varName: "departTime", width: 200 },
        { name: "目的地", varName: "destination", width: 200 },
        { name: "是否发烧", varName: "isFever", width: 100 },
        { name: "体温", varName: "temperature", width: 100 }
      ],
      headerFunctionName: ["学生ID", "学生姓名"],
      dialogVisible: false
    };
  },
  mounted() {
    // 初始获取返校信息（pageNum:1、pageSize:10)
    let initData = { pageNum: 1, pageSize: 10 };
    let tableData = getBackSchoolInfo(initData);
    tableData = convertToString(tableData, "isFever");
    this.tableData = tableData;
  },
  methods: {
    showDialog() {
      this.dialogVisible = true;
    },
    async addBSInfo() {
      this.dialogVisible = false;
      //封装data数据
      let data = Object.assign({ id: nanoid() }, this.BSInfo);
      const res = await addBackSchoolInfo(data);
      console.log("addBackSchoolInfo", res);
    },
    handleUpdate(data) {
      //修改BSInfo，并在dialog中展示
      this.BSInfo = data;
      this.showDialog();
    },
    async handleDelete(data) {
      const res = await deleteBackSchoolInfo(data.id);
      console.log("deleteBackSchoolInfo", res);
    }
  }
};
</script>
<style scoped>
.el-row {
  width: 100%;
}
.text-align {
  height: 30px;
  line-height: 30px;
  text-align: center;
}
/deep/ .el-input__inner {
  width: 250px;
  height: 30px;
}
.el-button {
  height: 30px;
  padding-top: 8px;
}
.el-table {
  margin-top: 50px;
}
:deep .el-table__fixed-right {
  height: auto !important;
  bottom: 0px !important;
  right: 10px !important;
}
.el-button--goon.is-active,
.el-button--goon:active {
  background: #20b2aa;
  border-color: #20b2aa;
  color: #fff;
}
.el-button--goon:focus,
.el-button--goon:hover {
  background: #48d1cc;
  border-color: #48d1cc;
  color: #fff;
}
.el-button--goon {
  color: #fff;
  background-color: #20b2aa;
  border-color: #20b2aa;
}
</style>
