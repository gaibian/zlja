<template>
    <div class="dashboard-container" :style="`background:#fff;height:${height}px`" ref="mainContainer">
        <file-preview @previewClose="handlePreviewClose" v-if="previewStatus" :url="imgUrl"></file-preview>
        <div class="block-box" style="height:100%">
            <!-- <el-row :gutter="10">

            </el-row> -->
            <el-row class="block-header-box1" type="flex" align="middle" justify="space-between" style="padding-right:0;margin-bottom:12px">
                <div class="h-title" style="padding-left:20px;">
                    <i class="i-bg"></i>
                    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-content">
                        <el-breadcrumb-item style="cursor: pointer" v-for="item in treeOptions" @click.native="handleBread(item)" :key="item.name">{{item.name}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <el-row class="operate-container" type="flex" align="middle" justify="end">
                    <!-- <el-button size="mini" type="danger" style="margin-right:12px;"><svg-icon style="margin-right:6px;font-size:14px;" :icon-class="'delete'"></svg-icon>删除</el-button> -->
                    <el-upload
                    class="upload-demo"
                    style="display:inline-block;margin-right:12px;"
                    :action="`${urlAds}agent/csUpload`"
                    :data="uploadData"
                    :show-file-list="false"
                    :on-preview="handlePreview"
                    :headers="headerObject"
                    :on-remove="handleRemove"
                    :on-success="handleSuccess"
                    :on-progress="handleProgress"
                    :before-upload="handleBefore"
                    multiple>
                    <el-button size="mini" type="primary"><svg-icon style="margin-right:6px;font-size:14px;" :icon-class="'upload'"></svg-icon>上传</el-button>
                    </el-upload>
                    <!-- <el-button type="primary" size="mini" @click="handleUpload"><svg-icon style="margin-right:6px;font-size:14px;" :icon-class="'download'"></svg-icon>上传</el-button> -->
                    <el-button type="primary" size="mini" @click="handleDownload"><svg-icon style="margin-right:6px;font-size:14px;" :icon-class="'download'"></svg-icon>下载</el-button>
                </el-row>
                
            </el-row>
          <div class="block-content-box" style="padding-bottom:20px;height:100%;padding:0">
            <el-row :gutter="30" type="flex" justify="space-between" style="margin:0;height:100%;">
              <el-col :span="24" style="padding:0">
                <!--基本操作-->
                <!-- <el-row ref="baseOperBox" :gutter="30" type="flex" style="margin:0;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;" align="middle" justify="space-between">
                  <div style="text-align: right;position:relative">
                    <el-button class="download-btn" type="primary" size="mini" @click="handleDownload"><svg-icon style="margin-right:6px;font-size:14px;" :icon-class="'download'"></svg-icon>下载</el-button>
                    <el-upload
                    class="upload-demo"
                    style="display:inline-block"
                    :action="`${urlAds}agent/csUpload`"
                    :data="uploadData"
                    :on-preview="handlePreview"
                    :headers="headerObject"
                    :on-remove="handleRemove"
                    :on-success="handleSuccess"
                    :before-upload="handleBefore"
                    multiple>
                    <el-button size="mini" type="primary"><svg-icon style="margin-right:6px;font-size:14px;" :icon-class="'upload'"></svg-icon>上传</el-button>
                    </el-upload>
                  </div>
                </el-row> -->
                <!-- <el-row ref="allChoiceBox" class="all-choice-box" style="margin:0;padding-left:0;padding-right:0" align="middle" type="flex" justify="space-between">
                  <div>
                    <el-checkbox @change="handleAllChoice" v-model="checked">全选</el-checkbox>
                  </div>
                  <div>
           
                  </div>
                </el-row> -->
                <!--文件显示-->
                <el-row :gutter="30" class="file-content-container" type="flex" :style="`margin:0;`">
                    <!--左侧目录-->
                    <!-- <div class="file-left-content">
                        <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        @open="handleFileOpen"
                        @close="handleFileClose"
                        background-color="#fff"
                        style="width:100%"
                        text-color="#606266"
                        active-text-color="#409EFF">
                        <el-submenu index="1">
                            <template slot="title">
                            <span>导航一</span>
                            </template>
                            <el-menu-item-group>
                            <template slot="title">分组一</template>
                            <el-menu-item index="1-1">选项1</el-menu-item>
                            <el-menu-item index="1-2">选项2</el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group title="分组2">
                            <el-menu-item index="1-3">选项3</el-menu-item>
                            </el-menu-item-group>
                            <el-submenu index="1-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="1-4-1">选项1</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <el-menu-item index="2">
                            <span slot="title">导航二</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <span slot="title">导航四</span>
                        </el-menu-item>
                        </el-menu>
                    </div> -->
                    <el-row :gutter="30" class="file-right-content" type="flex" justify="space-between" :style="`height:500px;margin:0`">
                        <div ref="innerbox" :style="`width:100%;height:100%`">
                            <div class="innerbox" id="innerbox" ref="contextMenuAreaBox" :style="`height:100%;position:relative;width:100%;`" @click="selectContainerClick">
                                <div v-if="fileFlag" class="no-file-text">当前没有文件</div>
                                <div class="context-menu-box" v-if="rightKeyMenuFlag" ref="contextMenuBox" style="z-index:99999">
                                    <ul>
                                    <li v-for="(item,index) in contextMenuOptions" :key="item.label" @click="handleLi(item)" @mouseleave="menuLeave" @mouseenter="menuEnter(index,item)" :class="isMenu == index ? 'active' : ''">
                                        <svg-icon style="margin-right:8px;font-size:16px;" :icon-class="item.label | contextMenuIcon"></svg-icon>
                                        {{item.label}}
                                        <i v-if="item.children" class="el-icon-caret-right right-icon"></i>
                                        <div v-if="isMenus == index" class="secondMenuBox" style="position: absolute;left:100%;top:0">
                                            <ul>
                                                <li :class="isMenuss == index ? 'active' : ''" v-for="(items,index) in item.children" :key="items.label" @mouseenter="menusEnter(index,items)" @mouseleave="menusLeave" @click="menusClick(index,items)">
                                                    <span>{{items.label}}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    </ul>
                                </div>
                            <!--文件列表-->
                            <el-row class="file-content-box" style="width:100%;margin:0" v-if="fileSvgFlag" v-loading="fileLoading" element-loading-text="文件读取中...">
                                <div id="selectContainer" :style="`height:100%;padding-bottom:2px;`" ref="selectContainer" @click="selectContainerClick">
                                    
                                    <div v-for="(item,index) in folderOptions" :key="item.name" :data-path="item.path" :class="handleFileShow(index,item)" class="file-list fileDiv" @mouseenter="fileMouse(index,item)" @mouseleave="fileLeave(index,item)">
                                        <div class="choice-box">
                                            <el-checkbox size="small" v-if="handleFileShow(index,item) === 'active' ? true : false" v-model="item.fileCheck"></el-checkbox>
                                        </div>
                                        <div class="file-img" @click="handleFolder(item,index)" v-on:dblclick="handleDblclick(item)">
                                            <img :src="item.type | typeFilter">
                                        </div>
                                        <p class="file-name" @click="handleFolder(item,index)" v-on:dblclick="handleDblclick(item)">{{item.name}}</p>
                                    </div>
                                    <div v-for="(item,index) in fileOptions" :key="item.name" :data-path="item.path" :class="handleFileShow(index,item)" class="file-list fileDiv" @mouseenter="fileMouse(index,item)" @mouseleave="fileLeave(index,item)">
                                        <div class="choice-box">
                                            <el-checkbox size="small" v-if="handleFileShow(index,item) === 'active' ? true : false" v-model="item.fileCheck"></el-checkbox>
                                        </div>
                                        <div class="file-img" @click="handleFolder(item,index)" v-on:dblclick="handleDblclick(item)">
                                            <img :width="item.ext | imgWidth" :height="item.ext | imgHeight" :src="extFilter(item)">
                                        </div>
                                        <p class="file-name" @click="handleFolder(item,index)" v-on:dblclick="handleDblclick(item)">{{item.name}}</p>
                                    </div>
                                </div>
                            </el-row>
                        </div>
                        </div>
                        
                    </el-row>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
        <!--上传弹窗-->
        <!-- <el-dialog ref="dialog" v-el-drag-dialog width="400px" title="上传/重命名" :visible.sync="dialogVisible" :before-close="handleClose">
            <el-form>
                <el-form-item label="文件名">
                    <el-input v-model="uploadData.name" placeholder="请输入文件名"></el-input>
                </el-form-item>
            </el-form>
        </el-dialog> -->
    </div>
</template>
<script>
import Vue from "vue";
import { getAuthKey } from '@/utils/auth'
//import fileBoxSelection from "@/directive/file-box-selection"
import folderImg from '@/assets/images/folder.png'
import fileImg from '@/assets/images/file.png'
import pImg from '@/assets/images/p.png'
import exlImg from '@/assets/images/x.png'
import wodImg from '@/assets/images/w.png'
import request from '@/utils/request.js';
import filePreview from './preview.vue'
export default {
    name: 'fileAdmin',
    components: {filePreview},
    //directives: { fileBoxSelection },
    props:['height','fileData'],
    filters: {
        typeFilter(value) {
            if(value == 'folder'){  //文件夹
                return folderImg
            }else if(value == 'file'){  //文件

            }
        },
        imgWidth(value) {
            if(value == 'png' || value == 'jpg'){
                return '80px'
            }else {
                return 'auto'
            }
        },
        imgHeight(value) {
            if(value == 'png' || value == 'jpg'){
                return '80px'
            }else {
                return 'auto'
            }
        },
        contextMenuIcon(value) {
            if(value == '刷新'){
                return 'Refresh'
            }
            if(value == '下载'){
                return 'download'
            }
        }
    
    },
    data() {
        return {
            dialogVisible:false,
            checked:false,
            folderImg:folderImg,
            fileImg:fileImg,
            pImg:pImg,
            heightVal:null,
            fileSvgFlag:true,
            selectedEls:[],
            ishow:null,
            previewFlag:false,
            isMenu:null,
            isMenus:null,
            isMenuss:null,
            fileLoading:true,
            rightKeyMenuFlag:false,
            fileSearch:'',
            path:'',
            type:'',
            fileFlag:false,
            previewStatus:false,
            imgUrl:'',
            loading:null,
            uploadData:{
                number:'',
                name:''
            },
            treeOptions:[{
                name:'文件管理',
                path:'/',
                fileOptions:[],
                folderOptions:[],
            }],
            contextMenuOptions:[{
                label:'下载',
            },{
                label:'刷新'
            }],
            // contextMenuOptions:[{
            //     label:'查看',
            //     children:[{
            //     label:'列表'
            //     },{
            //     label:'缩略图'
            //     }]
            // },{
            //     label:'排序方式',
            //     children:[{
            //     label:'名称'
            //     },{
            //     label:'大小'
            //     },{
            //     label:'修改日期'
            //     }]
            // },{
            //     label:'刷新',
            // },{
            //     label:'新建文件夹',
            // }],
            url:'',
            fileCheck:false,
            //所有的文件夹、文件信息
            fileOptions:[],
            folderOptions:[],
            clickFlag:null,
            number:'',
        };
    },
    created() {

        this.headerObject = {
            'X-AuthKey': getAuthKey(),
            'authKey' : Lockr.get("authKey"),
            'sessionId': Lockr.get("sessionId")
        }
        this.init();
        bus.$on('fileAdmin',(e)=>{
            //只是获取到dom
            _(this.folderOptions).forEach(item=>{
                item.fileCheck = false;
            })
            _(this.fileOptions).forEach(item=>{
                item.fileCheck = false;
            })
            _(e).forEach(item=>{

                _(this.folderOptions).forEach(item1=>{
                    if(item.dataset.path == item1.path){
                        item1.fileCheck = true;
                    }
                })

                _(this.fileOptions).forEach(item2=>{
                    if(item.dataset.path == item2.path){
                        item2.fileCheck = true;
                    }
                })

            })
            
        })
    },
    computed: {
        scrollTop() {
            return this.$store.getters.scrollTop;
        },
        scrollLeft() {
            return this.$store.getters.scrollLeft;
        }
    },
    methods: {
        handleProgress() {
            this.loading = this.$loading({
                lock: true,
                text: '文件正在努力上传中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
        },
        handleUpload() {
            this.$refs.dialog.open();
            this.dialogVisible = true;
        },
        handleClose() {
            this.$refs.dialog.close();
            this.dialogVisible = false;
        },
        handleFileOpen() {
            console.log('菜单打开了')
        },
        handleFileClose() {
            console.log('菜单关闭了')
        },
        handleBefore(file) {
    
            this.uploadData.name = file.name;
        },
        init() {
            
            this.fileLoading = true;
            this.fileOptions = [];
            this.folderOptions = [];
 
            this.number = this.fileData.number;
     
            this.uploadData.number = this.fileData.number;
            let data = {
                path:`/${this.number}/`,
                api:'explorer/pathList'
            }
            this.url = `agent/csTest`;
            request.post(this.url,data).then(res=>{
                if(res !== 'error'){
                    this.fileLoading = false;
                    this.fileOptions = res.data.fileList.map(item=>{
                        item.fileCheck = false;
                        item.ishow = '';
                        return item;
                    })
                    this.folderOptions = res.data.folderList.map(item=>{
                        item.fileCheck = false;
                        item.ishow = '';
                        return item;
                    });
                    this.treeOptions[0].fileOptions = res.data.fileList.map(item=>{
                        item.fileCheck = false;
                        item.ishow = '';
                        return item;
                    })
                    this.treeOptions[0].folderOptions = res.data.folderList.map(item=>{
                        item.fileCheck = false;
                        item.ishow = '';
                        return item;
                    })

                    if(this.fileOptions.length == 0 && this.folderOptions.length == 0){
                        //当前没有文件
                        this.fileFlag = true;
                    }else{
                        this.fileFlag = false;
                    }
                    
                }
            })
        },
        handleSuccess(value) {
           this.loading.close();
            this.init();
        },
        handleRemove(file, fileList) {
        
        },
        handlePreview(file) {
          
        },
    
        handleLi(item) {
            if(item.label == '下载'){
                this.handleDownload();
            }
            if(item.label == '刷新'){
                this.init();
            }
        },
        //全选
        handleAllChoice(val) {
            if(val){
                _(this.fileOptions).forEach(item => {
                    item.fileCheck = true;
                })
                _(this.folderOptions).forEach(item => {
                    item.fileCheck = true;
                })
            }else{
                _(this.fileOptions).forEach(item => {
                    item.fileCheck = false;
                })
                _(this.folderOptions).forEach(item => {
                    item.fileCheck = false;
                })
            }
        },
        //下载文件
        handleDownload() {
            let data = {
                    data:[]
            }

            _(this.fileOptions).forEach(value => {
                if(value.fileCheck){  //可以下载
                    data.data.push({
                        type:value.type,
                        path:value.path
                    })
                }
            });
            _(this.folderOptions).forEach(value => {
                if(value.fileCheck){
                    data.data.push({
                        type:value.type,
                        path:value.path
                    })
                }
            });
            if(data.data.length == 0){
                _g.toastMsg('error','请先选择文件再进行下载');
            }else{
                request.post('agent/csDownload',data).then(res=>{
                    let a = document.createElement('a');
                    a.href = res.data;
                    a.click();
                })
            }
        },
        extFilter(value) {
            let imgSrc = `${this.urlAds}uploads/csfile${value.path}`;
            switch(value.ext){
                case 'png':
                    return imgSrc
                    break;
                case 'jpg':
                    return imgSrc
                    break;
                case 'xlsx':
                    return exlImg
                    break;
                case 'xls':
                    return exlImg
                    break;
                case 'docx':
                    return wodImg
                    break;
                case 'doc':
                    return wodImg
                    break;
                default:
                    return fileImg        
            }
        },
        handleBread(item) {
            /*需要删除treeOptions后面的值*/
            this.getData(item,'bread');

        },
        getData(item,type) {
            /* 需要做文件的目录缓存 */
            this.fileOptions = [];
            this.folderOptions = [];
            let flag = false;
            let cache = false;
            let data = {
                path:item.path,
                api:'explorer/pathList'
            }
            this.url = `agent/csTest`;
            this.fileLoading = true;
            let int = 0;
            //如果数据存在 就读取缓存
        
            try {
                _(this.treeOptions).forEach((value,index)=>{
                    if(value.name === item.name){
                        this.folderOptions = value.folderOptions;
                        this.fileOptions = value.fileOptions;
                        _(this.folderOptions).forEach(item=>{
                            item.ishow = '';
                            item.fileCheck = false;
                        })
                        _(this.fileOptions).forEach(item=>{
                            item.ishow = '';
                            item.fileCheck = false;
                        })
                        cache = true;
                        this.fileLoading = false;
                        if(type == "bread"){
                            int = index
                            this.treeOptions.splice(int + 1,this.treeOptions.length - int)
                         
                        }
                        throw new Error("EndIterative")
                    }
                })
                console.log(this.treeOptions)
            } catch(e) {
                if(e.message != "EndIterative") throw e;
            } 
            
            if(!cache){
                //数据不存在
                
                request.post(this.url,data).then(res=>{
                    if(res !== 'error'){
                        this.fileLoading = false;
                       
                    this.treeOptions.push({
                        name:item.name,
                        path:item.path,
                        folderList:res.data.folderList.map(item=>{
                            item.fileCheck = false;
                            item.ishow = '';
                            return item;
                        }),
                        fileOptions: res.data.fileList.map(item=>{
                                item.fileCheck = false;
                                item.ishow = '';
                                return item;
                            })
                    })
            
                    this.fileOptions = res.data.fileList.map(item=>{
                        item.fileCheck = false;
                        item.ishow = '';
                        return item;
                    })
                    this.folderOptions = res.data.folderList.map(item=>{
                        item.fileCheck = false;
                        item.ishow = '';
                        return item;
                    });
      
                    }
                });   
            }
        },
        /*双击进入文件夹*/  //需要判断是文件夹还是图片文件进行预览
        handleFolder(item,index){
            
            /* 判断是否连续点击多次 */
            if(this.clickFlag) {//取消上次延时未执行的方法
                this.clickFlag = clearTimeout(this.clickFlag);
            };
            
            this.clickFlag = setTimeout(function() {
                // click 事件的处理
                item.fileCheck = !item.fileCheck;
                if(item.fileCheck){
                    index === item.ishow;
                }else{
                    item.ishow = '';
                }
    
            }, 300);//延时300毫秒执行
            
        },
        handleDblclick(item){  //双击事件
            if(this.clickFlag) {//取消上次延时未执行的方法
                this.clickFlag = clearTimeout(this.clickFlag);
            }
            if(item.ext == 'png' || item.ext == 'jpg'){  //进行图片预览
                this.previewStatus = true;

                this.imgUrl = item.path;
            }else if(item.ext == 'xlsx' || item.ext == 'xls'){  //这是exl
                console.warn('预览exl文件')
            }else if(item.ext == 'docx' || item.ext == 'doc'){  //这是word
                console.warn('预览word文件')
            }else if(item.type == 'folder'){
                this.getData(item,'file');
            }
            
        },
        /*预览关闭*/
        handlePreviewClose() {
            this.previewStatus = false;
        },
        handleFileShow(index,item) {
            if(index === item.ishow || item.fileCheck){
                return 'active';
            }else{
                return ''
            }

        },
        search(){
        
        },
        /*页面自适应*/
   
        /*切换菜单排列的方式*/
        handleArrangement(){
            this.fileSvgFlag = !this.fileSvgFlag;
            this.$nextTick(()=>{
                if(this.$refs.selectContainer){
                this.$refs.selectContainer.style.left = 0;
                this.$refs.selectContainer.style.top = 0;
                }
            })
        },
        menuEnter(index,item){
            this.isMenu = index;
            if(item.children){
                this.isMenus = index;
            }
        },
        menuLeave(){
            this.isMenu = null;
            this.isMenus = null;
        },
        menusEnter(index,items){
            this.isMenuss = index;
        },
        menusLeave(){
            this.isMenuss = null;
        },
        menusClick(index,items){
        
            if(items.label == '列表'){
                this.fileSvgFlag = false;
            }
            if(items.label == '缩略图'){
                this.fileSvgFlag = true;
            }
        },
        selectContainerClick(){
            this.isMenu = null;
            this.rightKeyMenuFlag = false;
        },
        /*点击目录menu-item*/
        menuItem(items){
        
        },
        handleOpen(){},
        handleClose(){},
        /*鼠标移入每个文件夹、文件*/
        fileMouse(index,item){
            item.ishow = index;
        },
        fileLeave(index,item){
            item.ishow = '';
        },
        getPoint(obj){
            let t = obj.offsetTop;
            let l = obj.offsetLeft;
            while(obj = obj.offsetParent){
                t += obj.offsetTop;
                l += obj.offsetLeft;
            }
            return {
                top:t,
                left:l
            }
        },
        clearEventBubble(e){
            if (e.stopPropagation) e.stopPropagation();
            else e.cancelBubble = true;
        
            if (e.preventDefault) e.preventDefault();
            else e.returnValue = false;
        }
    },
    mounted() {
        // let pageResize = () => {
        //     this.$nextTick(()=>{
        //         let baseOperBoxHeight = this.$refs.baseOperBox.$el.offsetHeight;
        //         let allChoiceBoxHeight = this.$refs.allChoiceBox.$el.offsetHeight;
        //         this.heightVal = this.height - ( baseOperBoxHeight + allChoiceBoxHeight + 40 );

        //     })
        // }
        // pageResize();
        // window.addEventListener('resize',pageResize,false);
        /*右键菜单*/
        let el = this.$refs.contextMenuAreaBox;
        let selectContainerDom = this.$refs.selectContainer;
        
        if(el){
        el.oncontextmenu = (e)=>{
            this.clearEventBubble(e);
            let oEvent = e || event;
            this.isMenu = null;
            this.isMenus = null;
            this.isMenuss = null;
            this.rightKeyMenuFlag = true;
            this.$nextTick(()=>{
                if(this.$refs.contextMenuBox){
                    console.log(this.scrollTop)
                    if(oEvent.clientY - this.getPoint(el).top + this.scrollTop + this.$refs.contextMenuBox.offsetHeight >= el.offsetHeight){
                        this.$refs.contextMenuBox.style.left = `${oEvent.clientX - this.getPoint(el).left + this.scrollLeft}px`;
                        this.$refs.contextMenuBox.style.top = `${oEvent.clientY - this.getPoint(el).top + this.scrollTop - this.$refs.contextMenuBox.offsetHeight}px`
                    }else{
                        this.$refs.contextMenuBox.style.left = `${oEvent.clientX - this.getPoint(el).left + this.scrollLeft}px`;
                        this.$refs.contextMenuBox.style.top = `${oEvent.clientY - this.getPoint(el).top + this.scrollTop}px`;
                    }
                    this.$refs.contextMenuBox.oncontextmenu = (e)=>{
                        this.clearEventBubble(e);
                    }
                    
                }
            })
            return false;
        };
        }
        
        if(selectContainer){
        
        selectContainerDom.oncontextmenu = (e)=>{
            
            this.clearEventBubble(e);
            return false;
        }
        }
        
    }
}
</script>
<style lang="scss" scoped>
  #innerbox{
    position: relative;
    width:100%;
    overflow-x: hidden;
    overflow-y: scroll;
    padding-right:12px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .download-btn{
      position: absolute;
      top:0;
      right:12px;
  }
  /*滚动条样式*/
  #innerbox::-webkit-scrollbar {/*滚动条整体样式*/
    width: 6px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }
  #innerbox::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius:6px;
    /*background:#cccaca;*/
    background-color:hsla(220,4%,58%,.3);
    -webkit-transition: background-color 0.3s;
    -moz-transition: background-color 0.3s;
    -ms-transition: background-color 0.3s;
    -o-transition: background-color 0.3s;
    transition: background-color 0.3s;
  }
//   #selectContainer::-webkit-scrollbar-thumb:hover{
//     /*background:#bbbaba;*/
//   }
  #innerbox::-webkit-scrollbar-track {/*滚动条里面轨道*/
    /*background: #f1f4f5;*/
    background:#fff;
  }
  .i-bg{
      display: block;
    position: absolute;
    top: 50%;
    left: 0;
    margin-top: -7px;
    width: 5px;
    height: 14px;
    background: #409EFF;
  }
  .breadcrumb-content{
      width:100%;
    //   position: absolute;
    //   top:50%;
    //   left:20px;
    //   transform: translate(0,-50%);
  }
  .operate-container{
      position: relative;
      width:250px;
      line-height:normal;
  }
  .file-content-container{
      width:100%;
      padding:20px;
      box-sizing: border-box;
      border:#E4E7ED 1px solid;
      border-radius:4px;
  }
  .file-left-content{
    //   position: absolute;
    //   top:20px;
    //   left:0;
      width:250px;
      border:#E4E7ED 1px solid;
      border-radius:4px;
  }
  .file-right-content{
      width:100%;
    //   position: absolute;
    //   top:20px;
    //   left:220px;
      padding:12px 0;
      
      border-radius:4px;
      box-sizing: border-box;
  }

</style>

