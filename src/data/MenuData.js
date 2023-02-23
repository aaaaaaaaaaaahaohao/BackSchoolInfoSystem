/* eslint-disable */
export default [{
    path: '/systemEntrance/notice',
    name: 'notice',
    label: '通知公告',
   

    auth: [0, 1, 2]
  },
  {
    path: '/systemEntrance/backSchoolInfo',
    name: 'backSchoolInfo',
    label: '返校信息',
   

    auth: [0, 1, 2]
  },
  {
    path: '/systemEntrance/consultMessage',
    name: 'consultMessage',
    label: '心理咨询',
   

    auth: [0, 1, 2]
  }, {
    path: '/systemEntrance/publicInfo',
    name: 'publicInfo',
    label: '公告管理',
    url: 'MallManage/MallManage',
    auth: [0]
  },
  {
    path: '/systemEntrance/user',
    name: 'user',
    label: '用户管理',
   

    auth: [0]
  },


]
