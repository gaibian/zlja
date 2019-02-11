import request from '@/utils/request'


export function companyIndex() {
    return request.get(`admin/insurance/company`)
}
//添加客户
export function companySave(data) {
    return request.post('admin/insurance/company', data)
}

//添加客户
export function companyRead(id) {
    return request.get(`admin/insurance/company/${id}`)
}

export function companyUpdate(id, data) {
    return request.put(`admin/insurance/company/`, id, data)
}

export function companyDelete(id) {
    return request.delete('admin/insurance/company/', id)
}