<template>
  <el-row class="app-main" style="'height:' + autoMainHeight;margin:0" ref="appMain" v-loading="gLoading" element-loading-text="数据加载中">
      <div class="innerbox" ref="innerbox">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="cachedViews">
            <router-view name="default" v-if="dataLoading"></router-view>
            <!--key 用来刷新视图-->
          </keep-alive>
        </transition>
      </div>
      <!-- <news-template></news-template> -->
  </el-row>
</template>
<script>
import newsTemplate from '@/components/newsTemplate/index'
import {mapState,mapGetters} from 'vuex'
import axios from 'axios'
import { getAllDict } from '@/api/dataDictionary'
export default {
  name: 'AppMain',
  props:[
    'autoMainHeight'
  ],
  components:{
    newsTemplate
  },
  data(){
    return {
      appHeight:null,
      dataLoading: false,
    }
  },
  created() {
    // axios.defaults.headers.authKey = Lockr.get("authKey");
    // axios.defaults.headers.sessionId = Lockr.get("sessionId");
      getAllDict().then(res => {
        if(res !== 'error'){
          this.$store.dispatch('setDictionary',res.data).then(() => {
            //保存先缓存数据字典的数据
            this.dataLoading = true;
          })
        }
      })
    
    
    //对数据字典进行存储

    let data = {
      params:{
        status:0
      }
    };
    // insideMessageListRender(data).then(res => {
    //   if(res !== 'error'){
    //     this.$store.dispatch('setNews',res.data.dataCount);
    //     if(res.data.list && res.data.list.length != 0){
    //       this.$store.dispatch('setNewsId',res.data.list[0])
    //     }else{
    //       this.$store.dispatch('setNewsId','')
    //     }
    //   }
    // })
  },
  watch:{
    cachedViews() {
      console.log(this.cachedViews)
    }
  },
  mounted(){
    //设置全局的appmain的数据
    if(this.$refs.innerbox){
      this.appHeight = this.$refs.innerbox.offsetHeight;
      this.$store.dispatch('setHeight',this.appHeight)
      let width = this.$refs.appMain.$el.offsetWidth;
      console.log(width)
      this.$store.dispatch('setWidth',width)
      window.addEventListener('resize',()=>{
        this.appHeight = this.$refs.innerbox.offsetHeight;
        this.$store.dispatch('setHeight',this.appHeight)
        let width = this.$refs.appMain.$el.offsetWidth;
        this.$store.dispatch('setWidth',width)
      })
      
      this.$refs.innerbox.addEventListener('scroll',(event) => {
        let e = event || window.event;
        this.$store.dispatch('setScrollTop',this.$refs.innerbox.scrollTop)
        this.$store.dispatch('setScrollLeft',this.$refs.innerbox.scrollLeft)
        //滚动事件需要传递
        bus.$emit('appMainScroll',e)
      })
    }


  },
  methods:{

  },
  
  computed: {
    ...mapGetters([
      'activeDate'
    ]),
    key() {
      return this.$route.fullPath
    },
    appMain() {
      return this.$store.getters.scrollTop
    },
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    gLoading() {
      return this.$store.state.app.gLoading
    },
  },
}
</script>
<style lang="scss" scoped>
  .app-main{
    width:100%;
    height:100%;
    overflow:hidden;
    display:flex;
    /*overflow-y:auto;*/
    flex-direction: column;
    //background:#f1f4f5;
    background:#fff;
    /*padding-right:4px;*/
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

  }
  .innerbox{
    position: relative;
    width:100%;
    overflow-x: hidden;
    overflow-y: scroll;
    height:100%;
  }
  /*滚动条样式*/
  .innerbox::-webkit-scrollbar {/*滚动条整体样式*/
    width: 6px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }
  .innerbox::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius:6px;
    /*background:#cccaca;*/
    background-color:hsla(220,4%,58%,.3);
    -webkit-transition: background-color 0.3s;
    -moz-transition: background-color 0.3s;
    -ms-transition: background-color 0.3s;
    -o-transition: background-color 0.3s;
    transition: background-color 0.3s;
  }
  .innerbox::-webkit-scrollbar-thumb:hover{
    /*background:#bbbaba;*/
  }
  .innerbox::-webkit-scrollbar-track {/*滚动条里面轨道*/
    /*background: #f1f4f5;*/
    background:#fff;
  }
</style>
