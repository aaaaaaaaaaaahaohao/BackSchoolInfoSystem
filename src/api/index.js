import {
  request
} from '@/utils/request'
/* eslint-disable */
// 登陆页面
export function login(data) {
  return request({
    url: '/api/login',
    data
  })
}

//返校信息管理页面
export function getBackSchoolInfo(data) {
  return request({
    url: '/api/info/getInfoPage',
    data
  })
}
export function addBackSchoolInfo(data) {
  return request({
    url: '/api/info/stu/add',
    data
  })
}
export function deleteBackSchoolInfo(data) {
  return request({
    url: '/api/info/stu/del',
    data
  })
}
export function checkBackSchoolInfo(data){
  return request({
    url: "/api/info/check",
    data
  })
}

// 用户管理页面
export function getUserPage(data) {
  return request({
    url: 'api/user/getUserPage',
    data
  })
}

export function userUpdate(data) {
  return request({
    url: '/api/user/update',
    data
  })
}

// 公告管理页面
export function getNoticeList(data){
  return request({
    url: "/api/notice/open/getNoticeList",
    data
  })
}
export function getNoticePage(data) {
  return request({
    url: 'api/notice/getNoticePage',
    data
  })
}

export function addNotice(data) {
  return request({
    url: 'api/notice/add',
    data
  })
}

export function updateNotice(data) {
  return request({
    url: 'api/notice/update',
    data
  })
}

export function deleteNotice(data) {
  return request({
    url: 'api/notice/del',
    data
  })
}

// 心理咨询
export function getCounselPage(data) {
  return request({
    url: '/api/counsel/getCounselPage',
    data
  })
}

export function addCounsel(data) {
  return request({
    url: '/api/counsel/stu/add',
    data
  })
}
export function reply(data) {
  return request({
    url: '/api/counsel/reply',
    data
  })
}
