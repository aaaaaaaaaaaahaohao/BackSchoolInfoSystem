/* eslint-disable */ 
export default function convertToString(dataList, attrNameList){
  if (Array.isArray(attrNameList)){
    dataList.map((data)=>{
      attrNameList.map(item =>{
        if (typeof data[item] == 'boolean')
        data[item] === true ? data[item] = '是': data[item] = '否'
      })
    })
  }
  if (typeof attrNameList === 'string'){
    dataList.map((data)=>{
      data[attrNameList] === true ? data[attrNameList] = '是': data[attrNameList] = '否'
    })
  }

  
  return dataList
}