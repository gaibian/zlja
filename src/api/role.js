import request from '@/utils/request'


export function roleIndex() {
    return request.get(`admin/auth/role`)
}
//添加客户
export function roleSave(data) {
    return request.post('admin/auth/role', data)
}

//添加客户
export function roleRead(id) {
    return request.get(`admin/auth/role/${id}`)
}

export function roleUpdate(id, data) {
    return request.put(`admin/auth/role/`, id, data)
}

export function roleDelete(id) {
    return request.delete('admin/auth/role/', id)
}