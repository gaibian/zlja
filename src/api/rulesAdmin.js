import request from '@/utils/request'

//获取权限节点列表
export function rulesNodeList() {
    return request.get('admin/auth.access/getTreeAccess');
}


//菜单列表
export function rulesMenuIndex() {
    return request.get('admin/system/menu');
}

export function rulesMenuSave(data) {
    return request.post('admin/system/menu', data)
}



export function rulesMenuDelete(id) {
    return request.delete(`admin/system/menu/`, id)
}


export function rulesMenuRead(id) {
    return request.get(`admin/system/menu/${id}`)
}


export function rulesMenuUpdate(id, data) {
    return request.put('admin/system/menu/', id, data)
}