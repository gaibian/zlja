<template>
  <div>
    <div class="user-set-box">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <div :class="isCollapse ? 'admin-header-img' : 'admin-header-img header-active'">
            <div class="img-box">
              <img class="user-avatar" :src="adminImg">
            </div>
          </div>
          <transition>
          <div v-show="isCollapse" class="admin-name">您好, {{name}}<i class="el-icon-arrow-down"></i></div>
          </transition>
        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <el-dropdown-item>
            <div @click="ModifyPass">
              <svg-icon style="font-size:13px;margin-right:3px;" :icon-class="'password'"></svg-icon>
              <span style="display:inline-block;">修改密码</span>
            </div>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <div @click="logout">
              <svg-icon style="font-size:13px;margin-right:3px;" :icon-class="'operate-end'"></svg-icon>
              <span style="display:inline-block;">退出登录</span>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="line"></div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { loginOut } from '@/api/login'
  import adminHeaderImg from '@/assets/images/admin_logo.jpg'
  export default {
    data() {
      return {
        adminImg:adminHeaderImg,
        centerDialogVisible:false,
      }
    },
    methods:{
      ModifyPass(){
        //修改密码
        this.centerDialogVisible = true;
        bus.$emit('modifyPass',this.centerDialogVisible)
      },
      logout() {
        //退出登入 删除浏览器上的数据
        this.$confirm('确认退出吗?','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消'
        }).then(()=>{
          let data = {
            authkey: Lockr.get('authKey'),
            sessionId: Lockr.get('sessionId')
          };
          loginOut(data).then(res=>{
            Lockr.rm('authKey');
            Lockr.rm('authList');
            Lockr.rm('menusList');
            Lockr.rm('sessionId');
            Lockr.rm('user_name');
            _g.toastMsg('success', '退出成功');
            setTimeout(()=>{
              this.$router.push({path:'/login'})
            },2000);
            location.reload()
          })
        }).catch(()=>{
          console.warn('取消了退出登录');
        })
//      this.$store.dispatch('LogOut').then(() => {
//        //location.reload() // 为了重新实例化vue-router对象 避免bug 强制刷新页面
//      })
      }
    },
    computed: {
      ...mapGetters([
        'name',
        'sidebar'
      ]),
      isCollapse() {
        return this.sidebar.opened
      }
    }
  }
</script>
<style lang="scss" scope>
  .user-set-box{
    position: relative;
    width:100%;
    height:160px;
    font-size:14px;
    //border-bottom:rgba(255,255,255,0.1) 1px solid;
    box-sizing:border-box;
  }
  // .line{
  //   width:100%;
  //   height:1px;
  //   background:rgba(0,0,0,0.1);
  // }
  .avatar-container {
    width:130px;
    position: absolute;
    top:20px;
    left:50%;
    -webkit-transform: translate(-50%,0);
    -moz-transform: translate(-50%,0);
    -ms-transform: translate(-50%,0);
    -o-transform: translate(-50%,0);
    transform: translate(-50%,0);
  }
  .avatar-wrapper {
    cursor: pointer;
    position: relative;
    text-align: center;
    .admin-header-img{
      position: relative;
      width:56px;
      height:56px;
      border-radius:50%;
      overflow:hidden;
      margin:10px auto 0 auto;
      background:rgba(140,179,224,0.4);
      transition:all 0.5s;
      .img-box{
        position: absolute;
        top:50%;
        left:50%;
        -webkit-transform: translate(-50%,-50%);
        -moz-transform: translate(-50%,-50%);
        -ms-transform: translate(-50%,-50%);
        -o-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        width:40px;
        height:40px;
        border-radius:50%;
        overflow:hidden;
        transition:all 0.5s;
      }
      &.header-active{
         width:40px;
         height:40px;
         background:rgb(8, 28, 39);
        .img-box{
          width:24px;
          height:24px;
        }
       }
    }
    .admin-name{
      color:rgb(191,203,217);
      margin-top:12px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
    }
    .user-avatar {
      width:100%;
      height:100%;
      border-radius: 10px;
    }
    .el-icon-arrow-down {
      font-size: 14px;
      color:rgb(191,203,217);
      margin-left:6px;
    }
  }
</style>
