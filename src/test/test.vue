<template>
  <!-- <div :class="className" class="table-box" :id="id" :style="{height:height,width:width}">
      详情页的导航 根据h标签来自动生成目录

      添加页只需要标题的标签是h
  </div> -->
  <div>
      <!--底部内容-->
      <!-- <div class="page-footer-box">
          <div class="pos">
              <div class="a-link">
                <span class="a">关于我们</span>
                <span class="line">|</span>
                <span class="a">联系我们</span>
                <span class="line">|</span>
                <span class="a">网站地图</span>
                <span class="line">|</span>
                <span class="a">酒店品牌</span>
                <span class="line">|</span>
                <span class="a">酒店查询</span>
                <span class="line">|</span>
                <span class="a">帮助中心</span>
                <span class="line">|</span>
                <span class="a">友情链接</span>
                <span class="line">|</span>
                <span class="a">诚聘英才</span>
                <span class="line">|</span>
                <span class="a">旅游度假资质</span>
                <span class="line">|</span>
                <span class="a">意见反馈</span>
                <span class="line">|</span>
                <span class="a">广告业务</span>
            </div>
            <div class="bottom-text">
                Copyright © 2018 www.aiwanlx.com. 环球爱玩（北京）网络科技有限公司版权所有  京ICP备17074036号  旅行社业务经营许可证编号: L-BJ02890
            </div>
          </div>
      </div> -->
      <!-- <div>
          <div class="nav-ul">
            <div class="label">行程天数:</div>
            <ul class="list-ul">
                <li class='list-li active'>全部</li>
                <li class='list-li'>1-2天</li>
                <li class='list-li'>3-5天</li>
                <li class='list-li'>6-8天</li>
                <li class='list-li'>9-14天</li>
                <li class='list-li'>15天以上</li>
            </ul>
        </div>
        <div class="nav-ul">
            <div class="label">出发时间:</div>
            <ul class="list-ul">
                <li class='list-li active'>全部</li>
                <li class='list-li'>1-3月</li>
                <li class='list-li'>4-6月</li>
                <li class='list-li'>7-9月</li>
                <li class='list-li'>10-12月</li>
            </ul>
        </div>
        <div class="nav-ul">
            <div class="label">和谁出行:</div>
            <ul class="list-ul">
                <li class='list-li active'>全部</li>
                <li class='list-li'>亲子</li>
                <li class='list-li'>和父母</li>
                <li class='list-li'>和朋友</li>
                <li class='list-li'>一个人</li>
                <li class='list-li'>夫妻</li>
                <li class='list-li'>情侣</li>
            </ul>
        </div>
        <div class="nav-ul">
            <div class="label">游记玩法:</div>
            <ul class="list-ul">
                <li class='list-li active'>全部</li>
                <li class='list-li'>美食</li>
                <li class='list-li'>购物</li>
                <li class='list-li'>摄影</li>
                <li class='list-li'>自骂</li>
                <li class='list-li'>人文</li>
                <li class='list-li'>自由行</li>
                <li class='list-li'>跟团游</li>
                <li class='list-li'>游轮</li>
                <li class='list-li'>徒步</li>
                <li class='list-li'>穷游</li>
            </ul>
        </div>
      </div> -->
      <!--左边悬浮-->
      <!-- <div class="fixed-left-box">
          <div class="line"></div>
          <div class="title-box active">
              <p class="title"><i></i>前言</p>
          </div>
          <div class="title-box">
              <p class="title"><i></i>行前准备</p>
              <p class="f-title">行程目录</p>
              <p class="f-title">行前准备</p>
              <p class="f-title">作者简介</p>
          </div>
          <div class="title-box">
              <p class="title"><i></i>西溪湿地</p>
              <p class="f-title">西溪湿地公园</p>
          </div>
          <div class="title-box">
              <p class="title"><i></i>国家5A级风景区</p>
              <p class="f-title">苏堤春晓</p>
          </div>
      </div> -->
  </div>
</template>
<script>
import echarts from 'echarts'
import resize from './mixins/resize'
export default {
  name:"charts",
  mixins: [resize],
  props:{
    className:{
      type: String,
      default: 'chart'
    },
    id:{
      type: String,
      default: 'chart'
    },
    height: {
      type:String,
      default:'200px'
    },
    width: {
      type:String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null,
    }
  },
  mounted() {
    //this.initChart()
    this.init()
  },
  created() {
    
  },
  beforeDestroy() {
    if (!this.chart) {
      return false;
    }
    this.chart.dispose()
    this.chart = null
    console.log(this.chart)
  },
  methods: {
    init() {
      this.chart = echarts.init(document.getElementById(this.id));

      //app.title = '折柱混合';

      let option = {
          title:{
            text:'7月财险机构业绩分析报表',
            padding:[0,0,50,0],
            top:0,
            color:'#606266'
          },
          textStyle:{
            color:'#909399',
          },
          grid:{
            top:120,
            x:38,
            x2:48,
            containLabel:false,
          },
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross',
                  crossStyle: {
                      color: '#999'
                  }
              }
          },
          toolbox: {
              show:false,
              feature: {
                  dataView: {show: true, readOnly: false},
                  magicType: {show: true, type: ['line', 'bar']},
                  restore: {show: true},
                  saveAsImage: {show: true}
              }
          },
          legend: {
              data:['新增出单人力','新增人力','上月新增人力','出单人力'],
              left:-4,
              top:36
          },
          xAxis: 
              {
                  type: 'category',
                  data: ['宁海','象山','余姚','慈溪','镇海','市区'],
                  axisPointer: {
                      type: 'shadow'
                  },
                  axisLine: {
                    lineStyle:{
                      color:'#DCDFE6'
                    }
                  },
    
                  
              },
          yAxis: [{
                  type: 'value',
                  name: '单位(人)',
                  min: 0,
                  max: 600,
                  interval: 120,
                  axisLine: {
                    show:false,
                  },
                  offset:0,
                  nameGap:20,
                  axisTick:{       //y轴刻度线
                    show:false
                  },
     
                  axisLabel: {
                      formatter: '{value}'
                  }
              },
              {
                  type: 'value',
                  name: '有效人力率(%)',
                  min: 0,
                  max: 100,
                  interval: 20,
                  nameGap:20,
                  offset:0,
                  splitLine: {
                      show: true,
                      lineStyle:{
                          color: '#E4E7ED',
                          width: 1,
                          type: 'solid'
                      }
                  },
                  axisTick:{       //y轴刻度线
                    show:false
                  },
                  axisLine: {
                    show:false,
                  },
                  axisLabel: {
                      formatter: '{value} %'
                  }
              }],
          
          series: [
              {
                  name:'新增出单人力',
                  type:'bar',
                  data:[100, 30, 60, 500, 150, 180],
                  barWidth:24,
                
                  itemStyle: {
                      //柱形图圆角，鼠标移上去效果
                      emphasis: {
                          color:'#1347b1',
                      },
                        
                      normal: {
                          //柱形图圆角，初始化效果
                          color:'#1347b1',
                      }
                  },
              },
              {
                  name:'新增人力',
                  type:'bar',
                  data:[300, 150, 160, 180, 250, 200],
                  barWidth:24,
                  itemStyle: {
                      //柱形图圆角，鼠标移上去效果
                      emphasis: {
                          color:'#1b7de3',
                      },
                        
                      normal: {
                          //柱形图圆角，初始化效果
                          color:'#1b7de3',
                      }
                  },
              },
              {
                  name:'上月新增人力',
                  type:'bar',
                  yAxisIndex: 0,
                  data:[250, 300, 120, 160, 380, 40],
                  barWidth:24,
                  itemStyle: {
                      //柱形图圆角，鼠标移上去效果
                      emphasis: {
                          color:'#57a9fe',
                      },
                        
                      normal: {
                          //柱形图圆角，初始化效果
                          color:'#57a9fe',
                      }
                  },
              },
              {
                  name:'出单人力',
                  type:'bar',
                  yAxisIndex: 0,
                  data:[180, 120, 100, 230, 260, 360],
                  //barCategoryGap:0,
                  barWidth:24,
                  barGap:0,
                  itemStyle: {
                      //柱形图圆角，鼠标移上去效果
                      emphasis: {
                          color:'#6adbda',
                      },
                        
                      normal: {
                          //柱形图圆角，初始化效果
                          color:'#6adbda',
                      }
                  },
              },
              {
                  name:'有效人力率',
                  type:'line',
                  yAxisIndex: 1,
                  data:[20, 30, 50, 85, 70, 32],
                  lineStyle:{
                    type:'solid',
                    width:1,
                    color:'#F56C6C'
                  },
                  symbol:'roundRect',
                  symbolSize:12,
                  smooth:true
 
              }
          ]
      };
      this.chart.setOption(option)

    }

  }
}
</script>
<style lang="scss" scoped>
/*导航标签*/
.nav-ul{
    width:100%;
    overflow:hidden;
    margin:12px 0;
    .label{
        float:left;
        width:70px;
        font-size:14px;
        color:#666;
        padding:4px 0;
        box-sizing: border-box;
    }
    .list-ul{
        float:left;
        width:800px;
        margin:0;
        padding-left:12px;
        .list-li{
            float:left;
            font-size:14px;
            color:#666;
            border-radius:4px;
            background:#fff;
            padding:4px 6px;
            cursor:pointer;
            margin-right:12px;
            &:last-child{
                margin-right:0;
            }
            &.active{
                background:#64A8ED;
                color:#fff;
            }
            &:hover{
                color:#64A8ED;
            }
        }
    }
}

//底部栏目
.page-footer-box{
    position:relative;
    width:100%;
    height:120px;
    background:#fff;
    .pos{
        width:100%;
        position:absolute;
        top:50%;
        left:0;
        -webkit-transform: translate(0,-50%);
        -moz-transform: translate(0,-50%);
        transform: translate(0,-50%);
    }
    .a-link{
        width:100%;
        text-align:center;
        font-size:14px;
        color:#999;
        .a{
            cursor: pointer;
        }
        .line{
            margin:0 5px;
        }
    }
    .bottom-text{
        width:100%;
        margin-top:10px;
        font-size:14px;
        color:#999;
        text-align:center;
    }
}

/*左侧悬浮*/
.fixed-left-box{
    position:fixed;
    top:400px;
    left:260px;
    width:200px;
    .line{
        position:absolute;
        top:0px;
        left:3px;
        width:1px;
        height:100%;
        background:#BFBFBF;
    }
    .title-box{
        width:100%;
        .title{
            position:relative;
            width:100%;
            padding-left:20px;
            box-sizing:border-box;
            font-size:14px;
            color:#666;
            font-weight:bold;
            cursor: pointer;
            i{
                position:absolute;
                left:0;
                top:50%;
                margin-top:-3px;
                width:7px;
                height:7px;
                border-radius:50%;
                background:#BFBFBF;
            }
        }
        .f-title{   
            width:100%;
            padding-left:20px;
            box-sizing:border-box;
            font-size:12px;
            color:#999;
            cursor: pointer;
        }
        &.active{
           .title{
               i{
                   width:11px;
                   height:4px;
                   background:#257FDC;
                   margin-top:-2px;
                   left:-2px;
                   border-radius:4px;
               }
           }             
        }
    }
}


.table-box{
  background:#fff;
  //border:#d9d9d9 1px solid;
  border-radius:4px;
  padding:20px;
  box-shadow: 1px 1px 12px rgba(166,166,166,0.1),-1px -1px 12px rgba(166,166,166,0.1);
  box-sizing: border-box;
}
</style>


