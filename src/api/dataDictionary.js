import request from '@/utils/request'

//获取数据字典列表
export function datadictIndex(data) {
    return request.get('admin/system/datadict', data);
}

//添加客户
export function datadictSave(data) {
    return request.post('admin/system/datadict', data)
}

//删除客户
export function datadictDelete(id) {
    return request.delete(`admin/system/datadict`, id)
}

//查询单个客户
export function datadictRead(id) {
    return request.get(`admin/system/datadict/${id}`)
}

//更新保存客户
export function datadictUpdate(id, data) {
    return request.put('admin/system/datadict/', id, data)
}

//获取所有的字典数据
export function getAllDict() {
    return request.get('admin/base.system/getAllDict')
}