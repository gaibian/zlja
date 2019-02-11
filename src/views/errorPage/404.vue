<template>
  <div class="page-404">
      <!--<div class="pic-404">-->
        <!--<img class="pic-404__parent" :src="img_404" alt="404">-->
        <!--<img class="pic-404__child left" :src="img_404_cloud" alt="404">-->
        <!--<img class="pic-404__child mid" :src="img_404_cloud" alt="404">-->
        <!--<img class="pic-404__child right" :src="img_404_cloud" alt="404">-->
      <!--</div>-->

        <!--<div class="bullshit__oops">OOPS!</div>-->
        <!--<div class="bullshit__info">版权所有-->
          <!--<a class='link-type' href='https://wallstreetcn.com' target='_blank'>华尔街见闻</a>-->
        <!--</div>-->
        <!--<div class="bullshit__headline">{{ message }}</div>-->
        <!--<div class="bullshit__info">请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告</div>-->
        <div class="bule-bg">
          <img width="100%" height="100%" :src="img_blue">
        </div>
        <div class="light-bule-bg">
          <img width="100%" height="100%" :src="img_light_blue">
        </div>
        <a class="js-box" href="/">
          <img width="100%" height="100%" :src="img_404">
        </a>
        <div class="text">看起来你好像迷路了,点击求生圈回家吧~</div>
  </div>
</template>

<script>
  import img_404 from '@/assets/404_images/404_img.png'
  import img_404_cloud from '@/assets/404_images/404_cloud.png'
  import img_blue from '@/assets/404_images/404-bule-img.png'
  import img_light_blue from '@/assets/404_images/404-light-blue-img.png'
  
  export default {
    name: 'page404',
    data() {
      return {
        img_404,
        img_404_cloud,
        img_blue,
        img_light_blue
      }
    },
    computed: {

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .page-404{
    position: relative;
    width:100%;
    height:100%;
  }
  .bule-bg{
    position: absolute;
    bottom:0;
    left:50%;
    width:1920px;
    height:641px;
    margin-left:-960px;
    font-size:0;
    z-index:99;
    /*-webkit-animation: buleImg 10s;*/
    /*-o-animation: buleImg 10s;*/
    /*animation: buleImg 10s;*/
  }
  .light-bule-bg{
    position: absolute;
    bottom:0;
    left:50%;
    margin-left:-960px;
    width:1920px;
    height:622px;
    font-size:0;
    z-index:98;
  }
  .text{
    position: absolute;
    bottom:100px;
    left:0;
    width:100%;
    text-align: center;
    font-size:20px;
    color:#fff;
    z-index:100;
    -webkit-animation: textMove 1s;
    -o-animation: textMove 1s;
    animation: textMove 1s;
  }
  .js-box{
    position: absolute;
    left:50%;
    margin-left:-377px;
    bottom:326px;
    display:block;
    width:754px;
    height:422px;
    font-size:0;
    z-index:101;
  }
  @keyframes textMove {
    0% {
      opacity:0;
      -webkit-transform: translate(0,100%);
      -moz-transform: translate(0,100%);
      -ms-transform: translate(0,100%);
      -o-transform: translate(0,100%);
      transform: translate(0,100%);
    }
    100% {
      opacity:1;
      -webkit-transform: none;
      -moz-transform: none;
      -ms-transform: none;
      -o-transform: none;
      transform: none;
    }
  }
  @keyframes buleImg {
    0% {
      -webkit-transform: translateX(0);
      -moz-transform: translateX(0);
      -ms-transform: translateX(0);
      -o-transform: translateX(0);
      transform: translateX(0);
    }
    100% {
      -webkit-transform: translateX(100px);
      -moz-transform: translateX(100px);
      -ms-transform: translateX(100px);
      -o-transform: translateX(100px);
      transform: translateX(100px);
    }
  }
</style>
