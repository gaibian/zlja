<template>
  <div style="display:inline-block">
    <el-upload
    :multiple="false"
    ref="upload"
    class="upload-demo"
    :auto-upload="true"
    :show-file-list="false"
    :action="apiUrl"
    :data="Edata"
    :before-upload="handleUpload"
    :headers="headerObject"
    :on-success="handleSuccess"
    :on-error="handleError"
    :on-progress="handleProgress"
    :on-preview="handlePreview"
    name="file">
      <el-button type="primary" size="small" icon="el-icon-upload" :loading="uploading">{{btnText}}</el-button>
    </el-upload>
    <div class="fixed-loading" v-if="isLoading">
      <!--上传空的文件-->
      <div v-if="pageCount == 0">请勿上传空文件</div>
      <div v-else>
        <div class="text" v-if="pageCount == 1 ? true : false">
          <div style="margin-bottom:6px;"><i class="el-icon-loading"></i></div>
          <div>正在上传文件...</div>
        </div>
        <div class="text" v-else>
          <div style="margin-bottom:6px;"><i class="el-icon-loading"></i></div>
          <div>{{`正在上传 ${num + 1}/${pageCount} ...`}}</div>
        </div>
      </div>

      
    </div>
  </div>
</template>
<script>
  import { getAuthKey } from '@/utils/auth'
  export default {
    // props:['url','Edata'],
    props:{
      num:{
        type:[Number,String]
      },
      pageCount:{
        type:[Number,String]
      },
      url:{
        type:String
      },
      Edata:{
        type:Object,
        default() {
          return {}
        }
      },
      btnText:{
        type:String,
        default:'上传文件'
      }
    },
    data(){
      return {
        uploading:false,
        apiUrl:'',
        headerObject:null,
        fullscreenLoading:false,
        loading:null,
        loadingText:'正在上传文件...',
        isLoading:false,
      }
    },
    created(){
      console.log(this.url)
      this.apiUrl = `${this.urlAds}${this.url}`;
      // this.headerObject = {
      //   'X-AuthKey': getAuthKey(),
      //   'authKey' : Lockr.get("authKey"),
      //   'sessionId': Lockr.get("sessionId")
      // }
    },
    watch:{
      num() {
        if(this.num >= this.pageCount){
          this.isLoading = false;
          this.uploading = false;
          _g.toastMsg('success','上传成功')
        }else{

        }
      },
      pageCount() {
        
        if(this.pageCount){
          // this.loading.close();
          // console.log('进来了')
          // this.loading = this.$loading({
          //   lock: true,
          //   text: `正在上传${this.num}/${this.pageCount}...`,
          //   spinner: 'el-icon-loading',
          //   background: 'rgba(0, 0, 0, 0.7)'
          // });
          
        }
      }
    },
    methods:{
      openFullScreen2() {
        // this.loading = this.$loading({
        //     lock: true,
        //     text: this.loadingText,
        //     spinner: 'el-icon-loading',
        //     background: 'rgba(0, 0, 0, 0.7)'
        //   });
      },
      changeFun(data){
      
      },
      submitUpload(file){
      
      },
      handleUpload(file){
        
         this.uploading = !this.uploading;
         //对num和pageCount 进行重置
          this.$emit('reset')
      },
      handleProgress(){
        this.openFullScreen2()
        this.isLoading = true;
      },
      handlePreview(file){
       
      },
      handleSuccess(res){
        console.log(res)
        if(res.data.page_count == 1){
          this.isLoading = false;
          this.uploading = false;
          this.$emit('on-first-file',res)
          _g.toastMsg('success','上传成功')
          return false;
        }
        this.$emit('on-selected-file',res);
        
      },
      handleError(res){
        this.uploading = false;
        _g.toastMsg('error','上传失败');
      }
    }
  }
</script>
<style lang="scss" scoped>
.fixed-loading{
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background:rgba(0,0,0,0.8);
  z-index:9999;
  .text{
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    font-size:14px;
    color:#409eff;
    text-align:center;
  }
}
</style>

