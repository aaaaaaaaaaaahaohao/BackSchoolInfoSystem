<template>
  <common-table :table-data="tableData" :table-column="tableColumn" :headerFunctionName="headerFunctionName" />
</template>
<script>
import CommonTable from '@/components/CommonTable'
import convertToString from '@/utils/convertToString'
export default{
  /* eslint-disable */
  components:{CommonTable},
  data (){
    return {
      tableData:[
        {stuName:'haohao', stuId:1, departPlace: '东莞', departTime: '2022/12/2', destination: '新西兰', isFever: false, temperature: 36.5},
        {stuName:'haohao', stuId:2, departPlace: '东莞', departTime: '2022/12/2', destination: '大理', isFever: true, temperature: 36.5},
        {stuName:'haohao', stuId:3, departPlace: '东莞', departTime: '2022/12/2', destination: '贵州', isFever: false, temperature: 36.5},
        {stuName:'haohao', stuId:4, departPlace: '东莞', departTime: '2022/12/2', destination: '深圳', isFever: false, temperature: 36.5}
      ],
      tableColumn: [
        {name:'学生ID', varName:'stuId', width:200},
        {name:'学生姓名', varName: 'stuName', width:100},
        {name:'出发地', varName:'departPlace', width:200},
        {name:'出发时间', varName:'departTime', width:200},
        {name:'目的地', varName:'destination', width:200},
        {name:'是否发烧', varName:'isFever', width:100},
        {name:'体温', varName:'temperature', width:100}
      ],
      headerFunctionName:['学生ID', '学生姓名']
    }
  },
  created(){
    let tableData = convertToString(this.tableData, 'isFever')
    this.tableData = tableData
  }
}
</script>
<style scoped>

</style>
