<template>
  <div class="login-container">
    <div class="login-bg" v-if="loginBgFlag">
      <div class="mask_box"></div>
      <transition name="fade" mode="out-in">
      <img class="img" :src="loginBg">
      </transition>
    </div>
    <div class="login-from-container" :class="loginActive ? 'active' : ''">
      <el-form class="login-form" v-show="loginLoading" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
        <h3 class="title">欢迎登录<span></span></h3>
        <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon class="svg_icon" icon-class="user" />
        </span>
          <el-autocomplete
            popper-class="my-autocomplete"
            v-model="loginForm.username"
            :fetch-suggestions="querySearch"
            autoComplete="off"
            placeholder="请输入用户名"
            @select="handleSelect">
            <template slot-scope="{ item }">
              <p>{{item.value}}</p>
            </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon class="svg_icon" icon-class="password"></svg-icon>
        </span>
          <el-input :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="off" placeholder="请输入密码"></el-input>
          <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
        </el-form-item>
        <div class="tips">
          <el-row type="flex" align="middle" justify="space-between">
            <el-col :span="12">
              <el-checkbox-group v-model="checkList" @change="handleCheckbox">
                <el-checkbox label="记住账号"></el-checkbox>
                <el-checkbox label="记住密码"></el-checkbox>
              </el-checkbox-group>
            </el-col>
            <el-col :span="12">
              <div class="re-password">
              </div>
            </el-col>
          </el-row>
        </div>
        <div @click="handleLogin" class="login-btn">立即登录</div>
      </el-form>
    
      <div class="login-loading-container content" v-show="!loginLoading">
        <div class="loader3">
          <span></span>
          <span></span>
        </div>
        <p class="loading_text">正在登录中...</p>
      </div>
  
    </div>
    
    
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import  Subscribe  from '@/utils/Subscribe'
import Layout from '@/views/layout/Layout'
import request from '@/utils/request'
import { constantRouterMap } from '@/router'
import loginBg from '@/assets/images/500269947.jpg'
export default {
  name: 'login',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      restaurants:[],
      loginForm: {
        username: '',
        password: ''
      },
      dialogFlag:true,
      loginLoading:true,
      loginActive:false,
      loginBgFlag:false,
      loginBg:loginBg,
      rememberNews:[],
      checkList:[],
      loginRules: {
        username: [{ required: true, trigger: 'blur', message:'请输入正确的用户名'/*validator: validateUsername*/ }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password',
      menusList:null
    }
  },
  created(){
    //location.reload()
    //this.timeTemplate = null;
    setTimeout(()=>{
      this.loginActive = true;
    },300)
    let account = Lockr.get('companyReAccount');
    let password = Lockr.get('companyRePassword');
    if(account){
      this.loginForm.username = account;
      this.checkList.push('记住账号');
      this.rememberNews.push('记住账号')
    }
    if(password){
      this.loginForm.password = password;
      this.checkList.push('记住密码');
      this.rememberNews.push('记住密码')
    }

  },
  mounted(){
    this.restaurants = [];
    if(this.loginBg){
      this.loginBgFlag = true;
    }
  },
  methods: {
    handleSelect(){},
    querySearch(queryString,cb){
      //let results = queryString ?
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
      console.log('sss')
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },

    handleCheckbox(val){
      //存储账号和密码
      this.rememberNews = val;
    },
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      //登录进行前端表单验证
      this.$refs.loginForm.validate(valid => {
        if (valid) { //通过前端验证
          this.loginLoading = false;
          setTimeout(()=>{
            this.loading = !this.loading;
            let data = {};
            data.username = this.loginForm.username;
            data.password = this.loginForm.password;
            //判断是否选择了记住账号和密码
            let accountFlag = false;
            let passwordFlag = false;
            _(this.rememberNews).forEach(item=>{
              if(item === '记住账号'){
                accountFlag = true;
              }
              if(item === '记住密码'){
                passwordFlag = true;
              }
            })
            if(accountFlag){
              Lockr.set('companyReAccount',this.loginForm.username);
            }else{
              Lockr.rm('companyReAccount');
            }
            if(passwordFlag){
              Lockr.set('companyRePassword',this.loginForm.password);
            }else{
              Lockr.rm('companyRePassword');
            }
            request.post('company/base/login',data).then(res => {
              
              if(res !== 'error'){
                  console.log(res)
                //Lockr.rm('loginStatus');
                Lockr.set('authKey', res.data.authKey);           // 权限认证
                Lockr.set('sessionId', res.data.sessionId);          // 用户sessionid
                window.axios.defaults.headers.authKey = Lockr.get('authKey');
                this.loading = !this.loading;
                this.$store.dispatch('setAuthKey',res.data.authKey).then(()=>{
                  let routerUrl = '/companyHome';
                  setTimeout(()=>{
                    let path = this.$route.path;
              
                    if(routerUrl !== path){
                      /*replace是不会向history添加新记录*/
                      router.replace(routerUrl);
                    }else{
                      _g.shallowRefresh(this.$route.name)
                    }
                  })
                })
                // _(res.data.menusList).forEach((value,key)=>{
                //   if(key == 0){
                //     value.selected = true;
                //   }else{
                //     value.selected = false;
                //   }
                // });
                //把数据存入浏览器的localStorage
                // Lockr.set('menus', res.data.menusList);        // 菜单数据
                // Lockr.set('authKey', res.data.authKey);           // 权限认证
                // Lockr.set('rememberKey', res.data.rememberKey);      // 记住密码的加密字符串
                // Lockr.set('authList', res.data.authList);            // 权限节点列表
                // Lockr.set('userInfo', res.data.userInfo);            // 用户信息
                // Lockr.set('sessionId', res.data.sessionId);          // 用户sessionid
                // window.axios.defaults.headers.authKey = Lockr.get('authKey');
      
                // const roles = res.data.menusList;
                // store.dispatch('GenerateRoutes',roles).then(() => {
                //   router.addRoutes(store.getters.addRouters)
                // })
                // this.$store.dispatch('setAuthKey',res.data.authKey).then(()=>{
                //   let routerUrl = '/home';
                //   setTimeout(()=>{
                //     let path = this.$route.path;
                //     if(routerUrl !== path){
                //       /*replace是不会向history添加新记录*/
                //       router.replace(routerUrl);
                //     }else{
                //       _g.shallowRefresh(this.$route.name)
                //     }
                //   })
                // })
                // this.$store.dispatch('setInfo',res.data.userInfo);
              }else{
                console.log('进来了')
                
                this.loginLoading = true;
                
        
              }
            });
          },1200)
        } else {
          _g.toastMsg('error','账号密码格式错误')
          return false
        }
      })
    }
  },
  computed:{
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
  },
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;
.svg_icon{
  position: absolute;
  top:50%;
  left:20px;
  -webkit-transform: translate(0,-50%);
  -moz-transform: translate(0,-50%);
  -ms-transform: translate(0,-50%);
  -o-transform: translate(0,-50%);
  transform: translate(0,-50%);
}
.re-password{
  display:block;
  width:100%;
  text-align: right;
}
/* reset element-ui css */
.login-container {
  position:relative;
  width:100%;
  height:100%;
.login-bg{
  position: relative;
  width:100%;
  height:100%;
  background:#ccc;
  img{
    display:block;
    width:1920px;
    height:1080px;
    position: absolute;
    top:50%;
    left:50%;
    z-index:1;
    -webkit-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    -o-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
  }
  .mask_box{
    position: absolute;
    top:0;
    left:0;
    z-index:2;
    width:100%;
    height:100%;
    /*background:rgba(44,98,166,0.2);*/
    background:rgba(0,0,0,0.35);
  }
}
  .login-from-container{
    position: absolute;
    top:0;
    right:0;
    width:500px;
    height:100%;
    background:#fff;
    z-index:3;
    opacity:0;
    -webkit-box-shadow: 0 -4px 16px rgba(0,0,0,0.2);
    -moz-box-shadow: 0 -4px 16px rgba(0,0,0,0.2);
    box-shadow: 0 -4px 16px rgba(0,0,0,0.2);
    -webkit-transform: translate(100%,0);
    -moz-transform: translate(100%,0);
    -ms-transform: translate(100%,0);
    -o-transform: translate(100%,0);
    transform: translate(100%,0);
    -webkit-transition: all 0.3s ease-out;
    -moz-transition: all 0.3s ease-out;
    -ms-transition: all 0.3s ease-out;
    -o-transition: all 0.3s ease-out;
    transition: all 0.3s ease-out;
  }
.login-from-container.active{
  opacity:1;
  -webkit-transform: none;
  -moz-transform: none;
  -ms-transform: none;
  -o-transform: none;
  transform: none;
}
  .el-input {
    display: inline-block;
    height: 44px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #606266;
      height: 44px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
        -webkit-text-fill-color: #606266 !important;
      }
    }
  }
  .el-form-item {
    border:1px solid rgba(0,0,0,0.1);
  }
}
.login-btn{
  width:100%;
  height:40px;
  border-radius:4px;
  line-height:40px;
  text-align: center;
  font-size:16px;
  color:#fff;
  background:#62a8ea;
  cursor: pointer;
  border:1px solid #62a8ea;
  margin-top:18px;
  transition:all 0.5s;
  &:hover{
    background:#77b8f6;
    border:#77b8f6 1px solid;
   }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#299ae2;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    width: 380px;
    position: absolute;
    left:50%;
    top:50%;
    -webkit-transform:translate(-50%,-50%);
    -moz-transform:translate(-50%,-50%);
    transform:translate(-50%,-50%);
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    height:44px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title {
    position: relative;
    font-size: 24px;
    font-weight: 400;
    color:#303133;
    margin: 0px auto 80px auto;
    text-align: center;
    span{
      position: absolute;
      bottom:-8px;
      left:50%;
      margin-left:-22px;
      width:44px;
      height:2px;
      background:#62a8ea;
      border-radius:2px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
