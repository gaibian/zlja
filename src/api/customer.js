import request from '@/utils/request'

//获取数据字典列表
export function getList() {
    return request.get('customer/index');
}

//添加客户
export function customerSave(data) {
    return request.post('admin/customer', data)
}

//删除客户
export function customerDelete(id) {
    return request.delete(`admin/customer/`, id)
}

//查询单个客户
export function customerGetDetail(id) {
    return request.get(`admin/customer/${id}`)
}

//更新保存客户
export function customerUpdate(id, data) {
    return request.put('admin/customer/', id, data)
}