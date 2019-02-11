/*全局验证*/
export default {
  /*验证手机号*/
  phone(rule,value,callback) {
    if(value === null || value === undefined || value === ''){
      callback(new Error('不能为空'))
    }else{
      let regPhone = /^[1][3,4,5,7,8][0-9]{9}$/;
      if(!regPhone.test(value)){
          callback(new Error('手机格式不正确'));
      }else{
        callback();
      }
    }
  },
  /*验证座机号*/
  mobile(rule,value,callback){
    if(value === null || value === undefined || value === ''){
      callback(new Error('不能为空'))
    }else{
      let regMobile = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
      if(!regMobile.test(value)){
        callback(new Error('电话格式不正确'))
      }else{
        callback();
      }
    }
  },
  /*判断数字*/
  number(rule,value,callback) {
    if(value === ''){
      callback(new Error('不能为空'))
    }else{
      let reg = /^[0-9]*$/;
      if(!reg.test(value)){
        callback(new Error('请输入0-9的数字格式'))
      }else{
        callback();
      }
    }
  },
  /*判断数字与字母*/
  letterNumber(rule,value,callback) {
    if(value === ''){
      callback(new Error('不能为空'))
    }else{
      let reg = /^[0-9a-zA-Z]*$/g;
      if(!reg.test(value)){
        callback(new Error('请输入字母或是数字格式'))
      }else{
        callback();
      }
    }
  },
  /*真实姓名*/
  realName(rule,value,callback) {
    if(value === ''){
      callback(new Error('不能为空'))
    }else{
      let reg = /^[\u4e00-\u9fa5]{2,4}$/;
      if(!reg.test(value)){
        callback(new Error('请输入中文姓名'))
      }else{
        callback();
      }
    }
  },
  /*身份证*/
  id(rule,value,callback) {
    if(value === ''){
      callback(new Error('不能为空'))
    }else{
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if(!reg.test(value)){
        callback(new Error('请输入正确的身份证格式'))
      }else{
        callback();
      }
    }
  },
  /*车牌号*/
  plateNumber(rule,value,callback){
    if(value === ''){
      callback(new Error('不能为空'))
    }else{
      let reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
      if(!reg.test(value)){
        callback(new Error('请输入正确的车牌号'))
      }else{
        callback();
      }
    }
  },
  /*网址*/
  webSite(rule,value,callback){
    if(value === ''){
      callback(new Error('不能为空'))
    }else{
      let reg = /^((https|http|ftp|rtsp|mms){0,1}(:\/\/){0,1})www\.(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/i;
      if(!reg.test(value)){
        callback(new Error('请输入正确的网址'))
      }else{
        callback();
      }
    }
  }
}
