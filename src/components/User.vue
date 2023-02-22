<template>
  <div>
    <common-table :table-data="tableData" :table-column="tableColumn" :header-function-name="headerFunctionName" :show-dialog="showDialog"/>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import CommonTable from '@/components/CommonTable'
import convertToString from '@/utils/convertToString'
export default{
  /* eslint-disable */
  components: { CommonTable },
  data () {
    return {
      tableData:[
        {
          id:1, name: 'lihua', approvalPrivilege: true, consultReplyPrivilege: false
        },
        {
          id:2, name: 'joe', approvalPrivilege: true, consultReplyPrivilege: false
        },
        {
          id:3, name: 'erica', approvalPrivilege: true, consultReplyPrivilege: false
        }
      ],
      tableColumn:[
        {name:'姓名', varName:'name', width:100},
        {name:'审批权限', varName:'approvalPrivilege', width:100},
        {name:'咨询消息回复权限', varName:'consultReplyPrivilege', width:100}
      ],
      headerFunctionName: ['姓名'],
      dialogVisible: false
    }
  },
  created(){
    let tableData = convertToString(this.tableData, ['approvalPrivilege', 'consultReplyPrivilege'])
  },
  methods:{
    tableDataUpdate(){

    },
    showDialog(){
      this.dialogVisible = true
    }
  }
  
}
</script>
<style scoped>

</style>
