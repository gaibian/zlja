<template>
  <el-menu class="navbar" mode="horizontal">
    <el-row type="flex" align="middle" justify="space-between" style="height:50px;">
      <el-col style="height:100%">
        <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
        <breadcrumb></breadcrumb>
      </el-col>
      <el-col style="height:100%">
        <el-row type="flex" justify="end" align="middle" style="height:50px;">
          <div class="right-menu-item tishi" @click="handleDealt(newsId.id)" v-if="newsFlag">
            <i class="el-icon-warning icon"></i>
            <div class="box">
              <span class="animate" style="margin-left:6px;">待办事项:<span style="color:#409EFF;">{{newsFlag ? newsId.inside_message_title : ''}}</span></span>
            </div>
          </div>
          <el-tooltip :content="'主题颜色'" placement="bottom">
            <theme-picker class="right-menu-item"></theme-picker>
          </el-tooltip>
          <el-tooltip effect="dark" :content="'全屏'" placement="bottom">
            <screenfull class="screenfull right-menu-item"></screenfull>
          </el-tooltip>
          <router-link :to="{name:'insideMessageList'}" v-if="messageFlag">
            <el-tooltip effect="dark" :content="'消息'" placement="bottom">
              <news-admin class="right-menu-item" :newsCount="newsNum"></news-admin>
            </el-tooltip>
          </router-link>
        </el-row>
      </el-col>
    </el-row>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import newsAdmin from '@/components/newsAdmin'
import Screenfull from '@/components/Screenfull'
import ThemePicker from '@/components/ThemePicker'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    newsAdmin,
    Screenfull,
    ThemePicker
  },
  data(){
    return {
      messageFlag:false,
      newsFlag:false,
    }
  },
  watch: {
    newsId() {
      if(this.newsId == ''){
        this.newsFlag = false
      }else{
        this.newsFlag = true
      }
    }
  },
  created(){
    console.log(this.newsId)
    console.log(this.newsFlag)
    //判断页面顶部左侧栏目的权限控制
    _(this.permission_routers).forEach(val=>{
      _(val.children).forEach(item=>{
        if(item.name === 'insideMessageList'){
          this.messageFlag = true;
        }
      })
    })
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'permission_routers',
      'newsNum',
      'newsId'
    ])
  },
  methods: {
    handleDealt(id) {
      //待办事项
      this.$router.push({
        name:'inSideMessageDetails',
        params:{
          id:id
        },
        query:{
          pageClick:_g.editRefresh('inSideMessageDetails'),
        }
      })

    },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.box {
  position: relative;
    width: 100px;
    overflow: hidden;
    padding-left:20px;
    box-sizing: border-box;
}
.icon{
      position: absolute;
      top:50%;
      left:-20px;
      transform:translate(0,-50%)
    }

.animate {
    font-size: 14px;
    color:#909399;
    margin-left:20px;
    overflow:hidden;
    display: inline-block;
    white-space: nowrap;
    animation: 10s wordsLoop linear infinite normal;
}

@keyframes wordsLoop {
    0% {
        transform: translateX(80px);
        -webkit-transform: translateX(80px);
    }
    100% {
        transform: translateX(-100%);
        -webkit-transform: translateX(-100%);
    }
}

@-webkit-keyframes wordsLoop {
    0% {
        transform: translateX(80px);
        -webkit-transform: translateX(80px);
    }
    100% {
        transform: translateX(-100%);
        -webkit-transform: translateX(-100%);
    }
}
.tishi{
  width:100px;
  position: relative;
  font-size:14px;
  color:#409EFF;
  cursor: pointer;
}
.navbar {
  height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    height:20px;
    color: red;
  }
  .item {
    position: absolute;
    right:60px;
    margin-top: 10px;
    margin-right: 40px;
    line-height:normal;
    .xx_icon{
      font-size:22px;
    }
  }
}
.right-menu-item{
  margin-right:26px;
}
</style>

