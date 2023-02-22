import {request} from '@/utils/request'
/* eslint-disable */ 
export function login(data) {
	return request({
		url: '/api/login',
		method: 'post',
		data
	})
}

export function  updateTeaApproval(data){
	return request({
		url: '/api/user/update',
		method: 'post',
		data
	})
}