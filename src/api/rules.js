import request from '@/utils/request'

//获取权限列表
export function getList() {
    return request.get('admin/auth/access');
}

//配置权限规则
export function setRules(data) {
    return request.post('admin/auth/access', data)
}

export function accessUpdate(id, data) {
    return request.put(`admin/auth/access/`, id, data)
}

//查看权限详情
export function rulesDetails(id) {
    return request.get(`admin/auth/access/${id}`)
}

//获取数据类型
export function getDataTypeList() {
    return request.get('admin/auth/type')
}

export function deleteDataType(id) {
    return request.delete('admin/auth/type/', id)
}

//设置数据类型
export function setDataType(data) {
    return request.post('admin/auth.type/setTypeRule', data)
}

export function setAutoData(data) {
    return request.post('admin/auth/type', data)
}

//查看数据类型详情
export function dataTypeDetails(id) {
    return request.get(`admin/auth/type/${id}`)
}

//设置数据规则
export function setDataRule(data) {
    return request.post('admin/auth.type/setTypeRule', data)
}