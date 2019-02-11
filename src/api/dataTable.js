import request from '@/utils/request'

//获取数据表信息渲染
export function getViewTables() {
    return request.get('admin/report/getViewTables');
}

//获取数据库所有表信息
export function getTables() {
    return request.get('admin/report/getTables');
}

//获取数据库表字段信息
export function getTableFields(name) {
    return request.get(`admin/report/getTableFields?table_name=${name}`);
}

export function saveBtn(data) {
    return request.post(`test/doImport`, data);
}

export function importEcl(data) {
    return request.post(`report/importUpload`, data);
}

export function saveCase(data) {
    return request.post(`report/setImport`, data)
}

export function getViewFields(name) {
    return request.get(`admin/report/getViewFields?table_name=${name}`);
}

//获取数据库表信息
export function getTableInfo(id) {
    return request.get(`admin/report/getTableInfo/${id}`);
}

//配置视图表格信息
export function setViewTable(data) {
    return request.post('admin/report/setViewTable', data);
}

//设置视图表格字段信息
export function setViewFields(data) {
    return request.post('admin/report/setViewFields', data);
}