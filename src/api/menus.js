import request from '@/utils/request'

//获取数据字典列表
export function menuIndex() {
    return request.get('admin/system/menu');
}