import request from '@/utils/request'


export function userIndex() {
    return request.get(`admin/auth/user`)
}
//添加客户
export function userSave(data) {
    return request.post('admin/auth/user', data)
}

//添加客户
export function userRead(id) {
    return request.get(`admin/auth/user/${id}`)
}

export function userUpdate(id, data) {
    return request.put(`admin/auth/user/`, id, data)
}

export function userDelete(id) {
    return request.delete('admin/auth/user/', id)
}