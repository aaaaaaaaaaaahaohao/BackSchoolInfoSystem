<template>
  <div>
    <el-container width="100%">
      <el-row :gutter="20">
        <div v-for="functionName in headerFunctionName" :index="functionName" :key="functionName">
            <el-col :span="2" class="text-align">{{functionName}}</el-col>
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
    </el-container>
    <el-row style="margin-top:20px;">
        <el-button type="goon">
            <i class="el-icon-plus"></i>
            增加
        </el-button>
        <el-button type="primary">
            <i class="el-icon-edit"></i>
            修改
        </el-button>
        <el-button type="danger">
            <i class="el-icon-delete"></i>
            删除
        </el-button>
    </el-row>
    <el-table :data="tableData" border>
      <!-- <el-table-column fixed prop="pubAuthor" label="消息发布者" :width="200">
      </el-table-column> -->
      <el-table-column v-for="column in tableColumn" :key="column.id" :index="column.id" :prop="column.varName" :label="column.name" width="conlumn.width"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleDelete(scope.row)" type="text" size="small"
            >删除</el-button
          >
          <el-button @click="handleUpdate(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
        <el-col :offset=9 style="margin-top: 20px;">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="50">
            </el-pagination>
        </el-col>
    </el-row>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  methods: {
    handleDelete(row) {
      console.log(row);
    },
    handleUpdate(row){
      this.showDialog()
    }
  },
  props: ["headerFunctionName", "tableData", "tableColumn", "showDialog"],
  data() {
    return {
    };
  },
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
    margin-top: 50px
}
:deep .el-table__fixed-right{
     height: auto !important;
     bottom: 0px !important;
     right: 10px !important;
}
.el-button--goon.is-active,
.el-button--goon:active {
  background: #20B2AA;
  border-color: #20B2AA;
  color: #fff;
}

.el-button--goon:focus,
.el-button--goon:hover {
  background: #48D1CC;
  border-color: #48D1CC;
  color: #fff;
}

.el-button--goon {
  color: #FFF;
  background-color: #20B2AA;
  border-color: #20B2AA;
}
</style>
