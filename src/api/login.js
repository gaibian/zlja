import request from '@/utils/request'

export function loginOut(data) {
    return request.post('admin/base/logout', data);
}

export function login(data) {
    return request.post('admin/base.auth/login', data);
}



// export function login(username, password) {
//   return request({
//     url: '/user/login',
//     method: 'post',
//     data: {
//       username,
//       password
//     }
//   })
// }
//
// export function getInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }
//
// export function logout() {
//   return request({
//     url: '/user/logout',
//     method: 'post'
//   })
// }