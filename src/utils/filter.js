import Vue from 'vue'
export default (function() {
    Vue.filter('sex', function(value) {
        if (value == '01') {
            return '男'
        } else if (value == '02') {
            return '女'
        }
    })
    Vue.filter('RELATIONSHIP', function(value) {
        if (value == '00') {
            return '本人'
        } else if (value == '01') {
            return '配偶'
        } else if (value == '02') {
            return '父母'
        } else if (value == '03') {
            return '子女'
        } else if (value == '04') {
            return '兄弟姐妹'
        } else if (value == '05') {
            return '其他'
        }
    })
    Vue.filter('status', function(value) {
        if (value == 1) {
            return '启用'
        } else if (value == 0) {
            return '禁用'
        } else {
            return '未知状态'
        }
    })
    Vue.filter('finish', function(value) {
        if (value == 1) {
            return '待审核'
        } else if (value == 0) {
            return '暂存'
        } else if (value == -1) {
            return '退回修改'
        } else {
            return '审核通过'
        }
    })
    Vue.filter('sheetRule', function(value) {
        console.log('进去了');
        if (value == '审核') {
            return 'examineShow'
        } else {
            return true;
        }
    })
    Vue.filter('statusFilter', function(value) {
        if (value == 1) {
            return ''
        } else if (value == 0) {
            return 'success'
        } else {
            return 'danger'
        }
    })
    Vue.filter('rules', function(value) {
        return value
    })
    Vue.filter('sf', function(value) {
        if (Number(value) === 0) {
            return '否'
        } else {
            return '是'
        }
    })
    Vue.filter('null', function(value) {
        if (!value && typeof value != "undefined" && value != 0) {
            return '无'
        } else {
            return value;
        }
    })
    Vue.filter('fileLink', function(value) {
        const link = window.imgUrl + value
        return link
    })
    Vue.filter('toolType', function(value) {
        let type = ''
        if (value == 1) {
            type = '系统工具'
        } else if (value == 2) {
            type = '说明知道'
        }
        return type
    })
    Vue.filter('numToString', function(value) {
        const string = value.toString()
        return string
    })
    Vue.filter('projectState', function(value) {
        let string = ''
        switch (value) {
            case '1':
                string = '售前项目'
                break
            case '2':
                string = '服务中项目'
                break
            case '3':
                string = '已结束项目'
                break
        }
        return string
    })
    Vue.filter('time', function(value) {
        let day = moment.unix(value)
        let date = moment(day).format('YYYY/MM/DD H:mm')
        return date
    })
    Vue.filter('policyType', function(value) {
        if (value === 1) {
            return '财险'
        } else if (value === 2) {
            return '寿险'
        } else {
            return '未知'
        }
    })
    Vue.filter('timestampToTime', function(timestamp) {
        if (timestamp === null) {
            return '空'
        } else {
            var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            let D = date.getDate() + ' ';
            let h = date.getHours() + ':';
            let m = date.getMinutes() + ':';
            let s = date.getSeconds();
            return Y + M + D + h + m + s;
        }
    })
    Vue.filter('timestampToDateTime', function(timestamp) {
        if (timestamp === null) {
            return '空'
        } else {
            var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            let D = date.getDate() + ' ';
            return Y + M + D;
        }
    })
    Vue.filter('date', function(value) {
        let day = moment.unix(value)
        let date = moment(day).format('YYYY/MM/DD')
        return date
    })
    Vue.filter('abstract', function(value) {
        let abstract = ''
        if (value.length > 70) {
            abstract = value.substr(0, 70) + '...'
        } else {
            abstract = value
        }
        return abstract
    })
    Vue.filter('posStatus', function(value) {
        let status = ''
        switch (value) {
            case 1:
                status = '在职'
                break
            case 2:
                status = '待入职'
                break
            case 3:
                status = '离职'
                break
        }
        return status
    })
    Vue.filter('template', function(value) {
        let template = ''
        if (value == '') {
            template = '上传'
        } else {
            template = '上传更新'
        }
        return template
    })
})()