import {request} from '@/utils/request'
/* eslint-disable */ 
export function login(data) {
	return request({
		url: '/api/login',
		method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
		data
	})
}