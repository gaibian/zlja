import request from '@/utils/request'

//获取数据字典列表
export function agentIndex() {
    return request.get('admin/agent');
}

//添加客户
export function agentSave(data) {
    return request.post('admin/agent', data)
}

//删除客户
export function agentDelete(id) {
    return request.delete(`admin/agent/`, id)
}

//查询单个客户
export function agentRead(id) {
    return request.get(`admin/agent/${id}`)
}

//更新保存客户
export function agentUpdate(id, data) {
    return request.put('admin/agent/', id, data)
}