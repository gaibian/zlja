<template>
  <div class="tags-view-container">
    <scroll-pane class='tags-view-wrapper' ref='scrollPane'>
      <router-link ref='tag' class="tags-view-item" :class="isActive(tag)?'active':''" @click.native="handleClick(tag)" v-for="(tag) in Array.from(visitedViews)"
                   :to="tag.path" :key="tag.path" v-if="tag.name == 'refresh' ? false : true" @contextmenu.prevent.native="openMenu(tag,$event)">
        {{tag.subTitle !== '' ? tag.subTitle : tag.title}}
        <span class='el-icon-close' @click.prevent.stop='closeSelectedTag(tag)'></span>
      </router-link>
    </scroll-pane>
    <ul class='contextmenu' v-show="visible" :style="{left:left+'px',top:top+'px'}">
      <li @click="Refresh"><svg-icon class="tabs-icon" style="font-size:12px;" :icon-class="'Refresh'"></svg-icon>刷新</li>
      <li @click="closeSelectedTag(selectedTag)"><svg-icon class="tabs-icon" style="font-size:15px;" :icon-class="'operate-delete'"></svg-icon>关闭标签页</li>
      <li @click="closeOthersTags"><svg-icon class="tabs-icon" style="font-size:14px;" :icon-class="'close1'"></svg-icon>关闭其他标签页</li>
      <li @click="closeAllTags"><svg-icon class="tabs-icon" style="font-size:15px;" :icon-class="'close2'"></svg-icon>关闭所有标签页</li>
    </ul>
  </div>
</template>

<script>
  import ScrollPane from '@/components/ScrollPane'
  import { mapGetters } from 'vuex'
  export default {
    components: { ScrollPane },
    data() {
      return {
        visible: false,
        top: 0,
        left: 0,
        selectedTag: {},
        theme:{
          background:'#409EFF'
        }
      }
    },
    computed: {
      ...mapGetters([
        'themeColor',
        'activeDate'
      ]),
      cachedViews() {
        return this.$store.state.tagsView.cachedViews
      },
      visitedViews() {
        return this.$store.state.tagsView.visitedViews
      }
    },
    watch: {
      $route(to,from) {
        if(to.name === from.name){
          //如果路径上的参数不一样的话需要更新
          return false;
        }
        if(to.name === 'refresh'){
          return false;
        }

        this.addViewTags()

        this.moveToCurrentTag()
      },
      visitedViews() {
        _(this.visitedViews).forEach(item => {
          if(item.path === this.$route.path || item.name === this.$route.name){
            this.selectedTag = item;
          }
        })
      },
      visible(value) {
        if (value) {
          document.body.addEventListener('click', this.closeMenu)
        } else {
          document.body.removeEventListener('click', this.closeMenu)
        }
      }
    },

    mounted() {
      bus.$on('refresh',()=>{
        _(this.visitedViews).forEach(item => {
          if(item.path === this.$route.path || item.name === this.$route.name){
            this.selectedTag = item;
            console.log(item)
          }
        })
      })
      this.addViewTags()
    },
    methods: {
      handleClick(item) {
        this.selectedTag = item
      },
      Refresh() {
        let i = 0;
        _(this.cachedViews).forEach((item,index) => {
          if(item == this.selectedTag.name){  //清除对应的缓存
            i = index;
            this.cachedViews.splice(i,1)
          }
        })

        this.$router.push({
          path:'/refresh',
          query:{
            name:this.selectedTag.name,
            path:this.selectedTag.path
          }
        })

      },
      generateRoute() {
        if (this.$route.name) {
          return this.$route
        }
        return false
      },
      isActive(route) {
        return route.path === this.$route.path || route.name === this.$route.name
      },
      addViewTags() {
        const route = this.generateRoute()
        if (!route) {
          return false
        }
        this.$store.dispatch('addVisitedViews', route)
      },
      moveToCurrentTag() {
        const tags = this.$refs.tag;
        this.$nextTick(() => {
          for (const tag of tags) {
            if(this.$route.path.indexOf(tag.to) !== -1){
              this.$refs.scrollPane.moveToTarget(tag.$el);
              break
            }
          }
        })
      },
      closeSelectedTag(view) {
        console.log(view)
        this.$store.dispatch('delVisitedViews', view).then((views) => {

          if (this.isActive(view)) {
            const latestView = views.slice(-1)[0]

            if (latestView) {
              this.$router.push(latestView.path)
            } else {
              this.$router.push('/')
            }
          }
        })
      },
      closeOthersTags() {
        this.$router.push(this.selectedTag.path)
        this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
          this.moveToCurrentTag()
        })
      },
      closeAllTags() {
        this.$store.dispatch('delAllViews')
        this.$router.push('/')
      },
      openMenu(tag, e) {
        this.visible = true
        this.selectedTag = tag
        console.log(tag)
        this.left = e.clientX
        this.top = e.clientY
      },
      closeMenu() {
        this.visible = false
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .tags-view-container {
  .tags-view-wrapper {
    background: #fff;
    height: 34px;
    border-bottom: 1px solid #e6e6e6;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .10);
    box-sizing: border-box;
  .tags-view-item {
    display: inline-block;
    position: relative;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    border-radius:3px;
  &:first-of-type {
     margin-left: 15px;
   }
  &.active {
     //background-color: #42b983;
     background-color:#409EFF;
     color: #fff;
     //border-color: #42b983;
     border-color:#409EFF;
  &::before {
     content: '';
     background: #fff;
     display: inline-block;
     width: 8px;
     height: 8px;
     border-radius: 50%;
     position: relative;
     margin-right: 2px;
   }
  }
  }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 100;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
  &:hover {
     background: #eee;
   }
  }
  }
  }
  .tags-view-wrapper {
  .tags-view-item {
  .el-icon-close {
    width: 16px;
    height: 16px;
    vertical-align: 2px;
    border-radius: 50%;
    text-align: center;
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
    transform-origin: 100% 50%;
  &:before {
     transform: scale(.6);
     display: inline-block;
     vertical-align: -3px;
   }
  &:hover {
     background-color: #b4bccc;
     color: #fff;
   }
  }
  }
  }
  .tabs-icon{
    margin-right:6px;
    color:#606266;
  }
</style>
