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
        <el-button type="goon" @click = "showDialog">
            <i class="el-icon-plus"></i>
            新增一个新的用户
        </el-button>
    </el-row>
    <el-table :data="tableData" border>
      <el-table-column prop="name" label="学生姓名" :width="200">
      </el-table-column>
      <el-table-column prop="canReply" label="咨询消息回复权限" :width="200">
      </el-table-column>
      <el-table-column prop="canCheck" label="审批权限" :width="200">
      </el-table-column>
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
       <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      >
      <h2>{{dialogTip}}</h2>
      <el-row >
        <el-col :span="4">审批权限:</el-col>
        <el-col :span="20">
          <el-radio v-model="user.canCheck" label="是">是</el-radio>
          <el-radio v-model="user.canCheck" label="否">否</el-radio>
        </el-col>
        <el-col :span="4">咨询消息回复权限:</el-col>
        <el-col :span="20">
          <el-radio v-model="user.canReply" label="是">是</el-radio>
          <el-radio v-model="user.canReply" label="否">否</el-radio>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import CommonTable from '@/components/CommonTable'
import convertToString from '@/utils/convertToString'
import {userUpdate, getUserPage} from '@/api/index'
export default{
  /* eslint-disable */
  components: { CommonTable },
  data () {
    return {
      tableData:[
        {
          id:1, name: 'lihua', canReply: true, canCheck: false
        },
        {
          id:2, name: 'joe', canReply: false, canCheck: false
        },
        {
          id:3, name: 'erica', canReply: true, canCheck: true
        }
      ],
      user:{},
      tableColumn:[
        {name:'姓名', varName:'name', width:100},
        {name:'审批权限', varName:'approvalPrivilege', width:100},
        {name:'咨询消息回复权限', varName:'consultReplyPrivilege', width:100}
      ],
      headerFunctionName: ['姓名'],
      dialogVisible: false,
      dialogTip: '修改用户信息'
    }
  },
  created(){
    //获取用户信息
    this.getUser()
    let tableData = convertToString(this.tableData, ['canReply', 'canCheck'])
  },
  methods:{
    async getUser(){
      const initParam = {
        pageNum:1,
        pageSize:10
      }
      const res = await getUserPage(initParam)
      this.user = res.data
    },
    handleUpdate(data){
      this.user = data
      this.showDialog()
    },
    async editUser(){
      const res = await userUpdate(this.user)
      console.log('editUser', res)
    },
    showDialog(){
      this.dialogVisible = true
    }
  }
  
}
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
