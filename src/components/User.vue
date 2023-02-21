<template>
  <common-table :table-data="tableData" :table-column="tableColumn" :header-function-name="headerFunctionName"/>
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
      headerFunctionName: ['姓名']
    }
  },
  created(){
    let tableData = convertToString(this.tableData, ['approvalPrivilege', 'consultReplyPrivilege'])
  }
}
</script>
<style scoped>

</style>
