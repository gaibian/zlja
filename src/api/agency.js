import request from '@/utils/request'

//获取数据字典列表
export function agencyIndex() {
    return request.get('admin/agency');
}

//添加客户
export function agencySave(data) {
    return request.post('admin/agency', data)
}

//删除客户
export function agencyDelete(id) {
    return request.delete(`admin/agency/`, id)
}

//查询单个客户
export function agencyRead(id) {
    return request.get(`admin/agency/${id}`)
}

//更新保存客户
export function agencyUpdate(id, data) {
    return request.put('admin/agency/', id, data)
}