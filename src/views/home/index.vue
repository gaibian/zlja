<template>
  <div id="itany" class="app_main_container">
    iosjdajdklsajd
  </div>
</template>
<script>
export default {
  name: 'Home',
  data() {
    // 可以在这进行数据的初始化
    return {

    }
  },
  computed: {

  },
  created() {

  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.home-page{
  width:100%;
  padding:0 30px;
  box-sizing:border-box;
}
.content-box{
  width:100%;
  margin-bottom:40px;
  .title{
    font-size:26px;
    color:#081D27;
    margin-bottom:30px;
    font-weight:500;
    span{
      font-size:12px;
    }
  }
  .lc-box{
    position: relative;
    width:100%;
    height:179px;
    border-radius:12px;
    border:#DCDFE6 1px solid;
    .line{
      width:94%;
      position:absolute;
      top:72px;
      left:50%;
      transform:translate(-50%,-50%);
      height:4px;
      border-radius:4px;
      background:#DCDFE6;
      z-index:9;
    }
    .pos{
      width:100%;
      position:absolute;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
      z-index:10;
      .cir-item{
        text-align:center;
        .cir{
          position: relative;
          width:60px;
          height:60px;
          margin:0 auto;
          border-radius:50%;
          background:#66aef8;
          .cir-icon{
            position: absolute;
            top:50%;
            left:50%;
            transform:translate(-50%,-50%);
            font-size:32px;
            color:rgba(255,255,255,0.3);
          }
        }
        .text{
          font-size:16px;
          color:#606266;
          margin-bottom:0;
        }
      }
    }
  }
  .content-item{
    position:relative;
  }
  .item{
    position:relative;
    width:100%;
    height:179px;
    border-radius:8px;
    overflow:hidden;
    .item-icon{
      position:absolute;
      top:50%;
      right:30px;
      font-size:80px;
      color:rgba(255,255,255,0.2);
      transform:translate(0,-50%);
    }
    .text-box{
      position: absolute;
      top:50%;
      left:30px;
      transform:translate(0,-50%);
      .num{
        font-size:38px;
        color:#fff;
        line-height:normal;
        margin:0;
      }
      .icon{
        font-size:38px;
        color:#fff;
      }
      .text{
        font-size:20px;
        line-height:normal;
        color:#fff;
        margin:12px 0 0 0;
      }
    }
  }
  .item1{
    background:#66aef8
  }
  .item2{
    background:#f2b14b
  }
  .item3{
    background:#f66c6c
  }
  .item4{
    background:#66aef8
  }
  .item5{
    background:#76c051
  }
  .item6{
    background:#aa96d5
  }
}
.home-right-box{
  width:450px;
  margin-left:60px;
  .right-content{
    .title{
      position:relative;
      width:100%;
      font-size:26px;
      color:#081D27;
      span{
        display:block;
        position:absolute;
        right:0;
        bottom:0;
        font-size:12px;
        color:#909399;
      }
    }
    .content-box{
      width:100%;
      .news-box{
        width:100%;
        margin-bottom:16px;
      }
      .title-text{
        position: relative;
        font-size:12px;
        color:#606266;
        padding-left:12px;
        box-sizing:border-box;
        i{
          position: absolute;
          top:50%;
          left:0;
          transform:translate(0,-50%);
          width:4px;
          height:4px;
          border-radius:50%;
          background:#409EFF;
        }
      }
      .time{
        font-size:12px;
        color:#606266;
        text-align:right;
      }
    }
  }
}
</style>
