import {request} from '@/utils/request'
/* eslint-disable */ 
// 登陆页面
export function login(data) {
	return request({
		url: '/api/login',
		data
	})
}

//返校信息管理页面
export function getBackSchoolInfo(data){
	return request({
		url: '/api/info/getInfoPage',
		data
	})
}
export function addBackSchoolInfo(data){
	return request({
		url: '/api/info/stu/add',
		data
	})
}
export function deleteBackSchoolInfo(data){
	return request({
		url: '/api/info/stu/del',
		data
	})
}

// 用户管理页面
export function getUserPage(){
	return request({
		url: 'api/user/getUserPage',
		data
	})
}

export function userUpdate(data){
	return request({
		url: '/api/user/update',
		data
	})
}

// 公告管理页面
export function getNoticePage(data){
	return request({
		url: 'api/notice/getNoticePage',
		data
	})
}

export function addNotice(data){
	return request({
		url: 'api/notice/add',
		data
	})
}

export function updateNotice(data){
	return request({
		url: 'api/notice/update',
		data
	})
}

export function deleteNotice(data){
	return request({
		url: 'api/notice/del',
		data
	})
}