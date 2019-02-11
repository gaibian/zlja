import { debounce } from '@/utils'
/*传入的是对象,所以需要自己去写install传入Vue*/
export default {
    install(Vue) {
        Vue.mixin({
            created() {
                Date.prototype.format = function(format) {
                    var o = {
                        "M+": this.getMonth() + 1, //month
                        "d+": this.getDate(), //day
                        "h+": this.getHours(), //hour
                        "m+": this.getMinutes(), //minute
                        "s+": this.getSeconds(), //second
                        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
                        "S": this.getMilliseconds() //millisecond
                    }
                    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
                        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                    for (var k in o)
                        if (new RegExp("(" + k + ")").test(format))
                            format = format.replace(RegExp.$1,
                                RegExp.$1.length == 1 ? o[k] :
                                ("00" + o[k]).substr(("" + o[k]).length));
                    return format;
                }
            },
            methods: {
                refresh() {
                    if (!this.init) {
                        console.warn("你这个页面貌似没有init方法");
                        return false;
                    }
                    this.init();
                },
                //添加数据 返回页面进行数据的刷新
                addRefresh(name) {
                    let flag = false;
                    _(this.visitedViews).forEach(item => { //判断是否存在列表页
                        if (item.name == name) {
                            flag = true;
                        }
                    })
                    if (flag) { //存在列表页 跳转列表页
                        let view = this.$route;
                        this.$router.push({ name: name })
                        this.closePage(view)
                        bus.$emit(name, name);
                    } else { //不存在列表页 打开列表页
                        //this.goback();
                        let view = this.$route;
                        console.log(name)
                        this.$router.push({ name: name })
                        this.closePage(view)
                            //this.$router.push('/')
                    }
                },
                closePage(view) {
                    this.$store.dispatch('delVisitedViews', view).then((views) => {
                        if (this.isOperateActive(view)) {
                            const latestView = views.slice(-1)[0]
                            if (latestView) {
                                this.$router.push(latestView.path)
                            } else {
                                this.$router.push('/')
                            }
                        }
                    })
                },
                isOperateActive(route) {
                    return route.path === this.$route.path || route.name === this.$route.name
                },
                routerJump(name, parameter) {
                    if (parameter) {
                        this.$router.push({ name: name, query: parameter })
                    } else {
                        this.$router.push({ name: name })
                    }
                    bus.$emit(name, name);
                },
                goback() {
                    router.go(-1)
                }
            },
            computed: {
                visitedViews() {
                    return this.$store.state.tagsView.visitedViews
                }
            }
        })
    }
}