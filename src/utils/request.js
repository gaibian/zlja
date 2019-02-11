import axios from 'axios'
import qs from 'qs'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken, getAuthKey, removeUserInfo } from '@/utils/auth'
let cancel, promiseArr = {}
import Lockr from "lockr";
const CancelToken = axios.CancelToken;



//创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API,
    //baseURL: `http://server.baoliannb.com/`,
    timeout: 60000000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
    config => {
        if (Lockr.get('authKey')) { //根据判断token  //一刷新token值会为空
            config.headers['sessionId'] = Lockr.get("sessionId");
            config.headers['authKey'] = Lockr.get('authKey')
        }
        return config
    }, error => {
        Promise.reject(error)
    });

// respone拦截器
service.interceptors.response.use(
    response => {
        const res = response.data; //先获取到数据
        if (res.code !== 200) {
            if (res.error != '没有最新的消息') {
                Message({
                    message: res.msg,
                    type: 'error',
                    duration: 5 * 1000
                })
            }
            if (res.code === 101 || res.code === 50012 || res.code === 50014) {
                //弹窗了之后 刷新页面 状态码等于1 导致没有弹窗
                removeUserInfo();
                setTimeout(() => {
                    router.push({ path: '/login' })
                });
                store.dispatch('FedLogOut').then(() => {
                    console.log('进来了')
                    location.reload() // 为了重新实例化vue-router对象 避免bug
                })
            }
            return Promise.reject('error')
        } else {
            Lockr.rm('loginStatus');
            return response.data
        }
    },
    error => {
        // 400
        console.log('error' + error) // for debug
            // Message({
            //   message: '网络请求超时,请检查网络',
            //   type: 'error',
            //   duration: 5 * 1000
            // })
        _g.toastMsg('error', '网络请求超时,请检查网络');
        return Promise.reject('error')
    }
)

export default {
    //get 请求
    get(url, param) {
        return new Promise((resolve, reject) => {
            service.get(url, param).then(res => {
                resolve(res);
            }, (response) => {
                resolve(response);
                // bus.$message({
                //   message: '请求超时，请检查网络',
                //   type: 'warning'
                // })
            })
        })
    },
    //post请求
    post(url, param) {
        return new Promise((resolve, reject) => {
            service({
                method: 'post',
                url,
                data: param,
                cancelToken: new CancelToken(c => {
                    cancel = c
                })
            }).then(res => {
                resolve(res);
            }, (response) => {
                resolve(response);
                // bus.$message({
                //   message: '请求超时，请检查网络',
                //   type: 'warning'
                // })
            })
        })
    },
    delete(url, id) {
        return new Promise((resolve, reject) => {
            service.delete(url + id).then(res => {
                resolve(res)
            }, res => {
                reject(res);
            })
        })
    },
    put(url, id, data) {
        return new Promise((resolve, reject) => {
            service.put(url + id, data).then(res => {
                resolve(res)
            }, res => {
                reject(res);
            })
        })
    }
}