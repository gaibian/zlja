import request from '@/utils/request'


export function policyIndex() {
    return request.get(`admin/insurance/policy`)
}

export function policySave(data) {
    return request.post('admin/insurance/policy', data)
}


export function policyRead(id) {
    return request.get(`admin/insurance/policy/${id}`)
}

export function policyUpdate(id, data) {
    return request.put(`admin/insurance/policy/`, id, data)
}

export function policyDelete(id) {
    return request.delete('admin/insurance/policy/', id)
}

//保单险种信息
export function policyRiskIndex() {
    return request.get(`admin/insurance/policyRisk`)
}

export function policyRiskSave(data) {
    return request.post('admin/insurance/policyRisk', data)
}


export function policyRiskRead(id) {
    return request.get(`admin/insurance/policyRisk/${id}`)
}

export function policyRiskUpdate(id, data) {
    return request.put(`admin/insurance/policyRisk/`, id, data)
}

export function policyRiskDelete(id) {
    return request.delete('admin/insurance/policyRisk/', id)
}

//保费交费信息
export function policyPayIndex() {
    return request.get(`admin/insurance/policyPay`)
}

export function policyPaySave(data) {
    return request.post('admin/insurance/policyPay', data)
}


export function policyPayRead(id) {
    return request.get(`admin/insurance/policyPay/${id}`)
}

export function policyPayUpdate(id, data) {
    return request.put(`admin/insurance/policyPay/`, id, data)
}

export function policyPayDelete(id) {
    return request.delete('admin/insurance/policyPay/', id)
}

//保费记录信息
export function policyRecordIndex() {
    return request.get(`admin/insurance/policyRecord`)
}

export function policyRecordSave(data) {
    return request.post('admin/insurance/policyRecord', data)
}


export function policyRecordRead(id) {
    return request.get(`admin/insurance/policyRecord/${id}`)
}

export function policyRecordUpdate(id, data) {
    return request.put(`admin/insurance/policyRecord/`, id, data)
}

export function policyRecordDelete(id) {
    return request.delete('admin/insurance/policyRecord/', id)
}

//待审核 审核提交
export function policyCheckSave(data) {
    return request.post('admin/insurance.policy/check', data)
}

//财务审核批量结算
export function policyBalanceCheck(data) {
    return request.post('admin/insurance.policy/balanceCheck', data)
}