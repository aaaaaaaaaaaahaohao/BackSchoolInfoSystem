import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import SystemEntrance from '@/components/SystemEntrance'
import PublicInfo from '@/components/PublicInfo'
import User from '@/components/User'
import BackschoolInfo from '@/components/BackschoolInfo'
import ConsultMessage from '@/components/ConsultMessage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: SystemEntrance
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {title: '登陆'}
    },
    {
      path: '/systemEntrance',
      name: 'systemEntrance',
      component: SystemEntrance,
      meta: {title: '首页'},
      children: [
        { path: '/systemEntrance/publicInfo', name: 'pubulicInfo', component: PublicInfo, meta: {title: '公告管理'} },
        { path: '/systemEntrance/user', name: 'user', component: User, meta: {title: '用户管理'} },
        { path: '/systemEntrance/backSchoolInfo', name: 'backSchoolInfo', component: BackschoolInfo, meta: {title: '返校信息管理'} },
        { path: '/systemEntrance/consultMessage', name: 'consultMessage', component: ConsultMessage, meta: {title: '咨询消息管理'} }
      ]
    }
  ]
})
