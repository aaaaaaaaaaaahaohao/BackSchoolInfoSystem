<template>
  <div>
    <!-- <el-container width="100%">
      <el-row :gutter="20">
        <div>
            <el-col :span="1" class="text-align">标题</el-col>
            <el-col :span="6">
            <el-input class="input-width-height" type="text"></el-input>
            </el-col>
        </div>
        <div>
            <el-col :span="1" class="text-align">类型</el-col>
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
        <el-button type="goon" @click="showAddDialog">
            <i class="el-icon-plus"></i>
            发布一条新的公告
        </el-button>
    </el-row>
    <el-table :data="tableData" border>
      <el-table-column fixed prop="title" label="消息发布者" width="200">
      </el-table-column>
      <el-table-column prop="content" label="消息内容" width="520"> </el-table-column>
      <el-table-column prop="pubTime" label="发布时间" width="200">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="deletePublicInfo(scope.row)" type="text" size="small"
            >删除</el-button
          >
          <el-button type="text" size="small" @click="showUpdateDialog(scope.row)">编辑</el-button>
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

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      >
      <h2>{{dialogTip}}</h2>
      <el-row >
        <el-col :span="4">公告主题:</el-col>
        <el-col :span="20">
          <input type="text" v-model="publicInfo.title" autocomplete="off">
        </el-col>
        <el-col :span="4">公告内容:</el-col>
        <el-col :span="20">
          <input type="text" v-model="publicInfo.content" autocomplete="off">
        </el-col>
        <el-col :span="4">公告状态:</el-col>
        <el-col :span="20">
          <input type="text" v-model="publicInfo.status" autocomplete="off">
        </el-col>

      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogEventHandle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
/* eslint-disable */
import {getNoticePage, addNotice, updateNotice, deleteNotice} from '@/api/index'
export default {
  methods: {
    handleClick(row) {
      console.log(row);
    },
  },
  data() {
    return {
      tableData: [
        {
          id: 1,
          title: "我们将于2023年XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          content: "王小虎",
          pubTime: "2023/3/20",
          status: 1
        },
        {
          id: 2,
          content: "我们将于2023年XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          title: "王小虎",
          pubTime: "2023/3/20",
          status: 1
        },
        {
          id: 3,
          content: "我们将于2023年XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          title: "王小虎",
          pubTime: "2023/3/20",
          status: 1
        },
        {
          id:4,
          content: "我们将于2023年XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          title: "王小虎",
          pubTime: "2023/3/20",
          status: 1
        },
      ],
      dialogTip: '',
      publicInfo: {},
      dialogVisible: false
    };
  },
  methods:{
    async getPublicInfo(){
      const initParams = {
        pageNum:1,
        pageSize:10
      } 
      const res = await getNoticePage(initParams)    
    },
    showAddDialog(){
      this.publicInfo = {}
      this.dialogTip = '请编辑您新增的公告'
      this.dialogVisible = true
    },
    showUpdateDialog(publicInfo){
      this.publicInfo = publicInfo
      console.log('this.publicInfo', this.publicInfo)
      this.dialogTip = '请编辑您更新的公告'
      this.dialogVisible = true
    },
    async addPublicInfo(){
      const res = await addNotice(this.publicInfo)
      console.log('res', res)
    },
    dialogEventHandle(){
      if (this.dialogTip === '请编辑您新增的公告' ) this.addPublicInfo()
      if (this.dialogTip === '请编辑您更新的公告') this.updatePublicInfo()
    },
    async updatePublicInfo(){
      const res = await updateNotice(this.publicInfo)
      console.log('res', res)
    },
    async deletePublicInfo(){
      const res = await deleteNotice(this.publicInfo.id)
    }
  },
  created(){
    //获取公告数据
    this.getPublicInfo()
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
