import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { Message } from 'element-ui'
// import { getToken } from '@/utils/auth' // 验权
NProgress.configure({ showSpinner: false }) // NProgress Configuration
const whiteList = ['/login'] // 不重定向白名单  如果当前是登录页就不需要重定向login
router.beforeEach((to, from, next) => {
    NProgress.start();
    /*问题  刷新的时候执行了2次 这个问题有待解决 暂时不影响使用*/
    // let authkey = Lockr.get(`authKey`);
    let sessionId = Lockr.get('sessionId');
    let authKey = Lockr.get('authKey');

    if (sessionId || authKey) {
        if (to.path === '/login') {
            next();
            NProgress.done();
        } else {
            /*路由导入动态导入 导致上面执行了两次*/
            if (store.getters.addRouters.length === 0) {
                const roles = Lockr.get('menusList');
                store.dispatch('GenerateRoutes', roles).then(() => {
                    router.addRoutes(store.getters.addRouters)
                    next({...to, replace: true });
                })
            } else {
                next();
            }
        }
    } else {

        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login');
            NProgress.done();
        }
    }
});

router.onError((error) => {
    console.log(error);
    location.reload();
    // const pattern = /Loading chunk (\d)+ failed/g;
    // const isChunkLoadFailed = error.message.match(pattern);
    // const targetPath = router.history.pending.fullPath;
    // if (isChunkLoadFailed) {
    //     router.replace(targetPath);
    // }
});

router.afterEach(() => {
    NProgress.done() // 结束Progress
})