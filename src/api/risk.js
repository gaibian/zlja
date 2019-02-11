import request from '@/utils/request'

export function riskIndex(data) {
    return request.get(`admin/insurance/risk`, data)
}


//添加客户
export function riskSave(data) {
    return request.post('admin/insurance/risk', data)
}

//添加客户
export function riskRead(id) {
    return request.get(`admin/insurance/risk/${id}`)
}

export function riskUpdate(id, data) {
    return request.put(`admin/insurance/risk/`, id, data)
}

export function riskDelete(id) {
    return request.delete('admin/insurance/risk/', id)
}