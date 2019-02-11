let baseUrl = '';

let DEBUG = false;
let cancleHTTP = []; //取消请求头设置
console.log('__________________')
console.log(process.env.NODE_ENV)
console.log('__________________')
if (process.env.NODE_ENV == 'development') {
    baseUrl = "https://10.248.65.100/GetTravelMethod";
    DEBUG = true;
} else if (process.env.NODE_ENV == 'production') {
    baseUrl = "https://10.248.65.200/GetTravelMethod";
    DEBUG = false;
} else if (process.env.NODE_ENV == 'testing') {
    baseUrl = "https://10.248.65.150/GetTravelMethod";
    DEBUG = false;
}

export {
    baseUrl,
    DEBUG,
    cancleHTTP,
}