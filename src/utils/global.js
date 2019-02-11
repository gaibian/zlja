/*整个项目的js全局定义*/
/*暂时没有绑定到vue.prototype上 而是绑定在window对象上*/
import verify from '@/utils/verify'
const commonFn = {
    /*全局变量*/
    $mainColor: '#409EFF',
    $successColor: '#67C23A',
    $warningColor: '#E6A23C',
    $dangerColor: '#F56C6C',
    $infoColor: '#909399',
    $oneWordsColor: '#303133',
    $twoWordsColor: '#606266',
    $threeWordsColor: '#909399',
    $fourWordsColor: '#C0C4CC',
    $oneBorderColor: '#DCDFE6',
    $twoBorderColor: '#E4E7ED',
    $threeBorderColor: '#EBEEF5',
    $fourBorderColor: '#F2F6FC',
    /*全局验证*/
    verify: verify,
    statusOptions: [{
        label: '退回修改',
        id: -1
    }, {
        label: '暂存',
        id: 0
    }, {
        label: '待审核',
        id: 1
    }, {
        label: '审核通过',
        id: 2
    }],
    handleSelect(obj, field) {
        let arr = [];
        for (let i in obj[field]) {
            let o = {
                label: obj[field][i],
                value: i
            }
            arr.push(o);
        }
        return arr
    },
    /*全局处理格式的方法*/
    j2s(obj) { //打印字符串
        return JSON.stringify(obj)
    },
    shallowRefresh(name) { //刷新当前的页面
        router.replace({ path: '/refresh', query: { name: name } })
    },
    closeGlobalLoading() {
        setTimeout(() => {
            store.dispatch('showLoading', false)
        }, 0)
    },
    openGlobalLoading() {
        setTimeout(() => {
            store.dispatch('showLoading', true)
        }, 0)
    },
    cloneJson(obj) {
        return JSON.parse(JSON.stringify(obj))
    },
    toastMsg(type, msg) {
        switch (type) {
            case 'normal':
                bus.$message(msg)
                break
            case 'success':
                bus.$message({
                    message: msg,
                    type: 'success'
                })
                break
            case 'warning':
                bus.$message({
                    message: msg,
                    type: 'warning'
                })
                break
            case 'error':
                bus.$message.error(msg)
                break
        }
    },
    clearVuex(cate) {
        store.dispatch(cate, [])
    },
    timestampToTime(timestamp) {
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
    },
    //获取当天日期
    getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    },
    getHasRule(val) {
        const moduleRule = 'admin'
        let userInfo = Lockr.get('userInfo')
            //id:1 代表是admin管理员
        if (userInfo.id == 1) {
            return true
        } else {
            let authList = Lockr.get('authList')

            return _.includes(authList, val)
        }
    },
    //编辑页面的重新载入
    editRefresh(name) {
        if (store.getters.visitedViews.some(v => v.name === name)) {
            return true;
        } else {
            return false;
        }
    }
}

export default commonFn