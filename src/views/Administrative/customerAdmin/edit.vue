<template>
<div>
        <sticky :className="'sub-navbar'" :stickyTop="84">
            <div class="app-main-btm-fixed" ref="appMainFixed">
                <h1 class="page-title-box">
                    客户信息编辑
                </h1>
                <div>
                <el-button type="danger" size="mini" icon="el-icon-close" @click="handleEmpty()">清空表单</el-button>
                <el-button type="primary" icon="el-icon-check" size="mini" @click="handleSubmit" :loading="isLoading">保存</el-button>
                </div>
            </div>
        </sticky>
        <div class="app_main_content">
            <el-form :model="form" ref="form" class="form">
                <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
                    <el-tab-pane label="基本信息" name="first">
                        <div class="pane">
                            
                            <el-row :gutter="30">
                                <!-- <el-col :span="6">
                                    <el-form-item label="推荐业务员">
                                        <el-input v-model="form.info.pid" placeholder="请输入推荐业务员"></el-input>
                                    </el-form-item>
                                </el-col> -->
                                <el-col :span="6">
                                    <el-form-item label="客户姓名">
                                        <el-input v-model="form.info.realname" placeholder="请输入客户姓名"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="客户类型">
                                        <el-select v-model="form.info.customer_type" placeholder="请选择客户类型" style="width:100%">
                                            <el-option v-for="(item,index) in customerOption" :key="index" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="国籍">
                                        <el-select v-model="form.info.country" placeholder="请选择国籍" style="width:100%">
                                            <el-option v-for="(item,index) in gjOption" :key="index" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="证件类型">
                                        <!-- <el-input v-model="form.info.id_type" placeholder="请输入国籍"></el-input> -->
                                        <el-select v-model="form.info.id_type" style="width:100%">
                                            <el-option v-for="(item,index) in idTypeOption" :key="index" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="30">
                                
                                <el-col :span="6">
                                    <el-form-item label="证件号">
                                        <el-input v-model="form.info.id_code" placeholder="请输入证件号"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="出生日期">
                                        <el-date-picker
                                            v-model="form.info.birthday"
                                            type="date"
                                            style="width:100%"
                                            value-format="yyyy-MM-dd"
                                            clearable
                                            placeholder="请输入出生日期">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="性别">
                                        <el-select v-model="form.info.sex" placeholder="请选择性别" style="width:100%">
                                            <el-option v-for="(item,index) in sexOption" :key="index" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="婚姻">
                                        <el-select v-model="form.info.marriage" placeholder="请选择婚姻" style="width:100%">
                                            <el-option v-for="(item,index) in marriageOption" :key="index" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="30">
                                
                                <el-col :span="6">
                                    <el-form-item label="手机">
                                        <el-input v-model="form.info.mobile" placeholder="请输入证件号"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="邮箱">
                                        <el-input v-model="form.info.email" placeholder="请输入出生日期"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="座机">
                                        <el-input v-model="form.info.phone" placeholder="请输入国籍"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="30">
                                <el-col :span="18">
                                    <el-form-item label="家庭地址">
                                        <el-input v-model="form.info.address" placeholder="请输入家庭地址"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="家庭地址邮编">
                                        <el-input v-model="form.info.zip" placeholder="请输入家庭地址邮编"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="30">
                                <el-col :span="18">
                                    <el-form-item label="其他地址">
                                        <el-input v-model="form.info.other_address" placeholder="请输入其他地址"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="其他地址邮编">
                                        <el-input v-model="form.info.other_zip" placeholder="请输入其他地址邮编"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="30">
                                <el-col :span="24">
                                    <el-form-item label="备注">
                                        <el-input v-model="form.info.note" placeholder="请输入备注"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="30">
                                <el-col :span="24">
                                    <el-form-item label="信息补充">
                                        <el-input v-model="form.info.other_note" placeholder="请输入信息补充"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            
                        </div>
                        
                        
                    </el-tab-pane>
                    <el-tab-pane label="公司信息" name="second">
                        <div class="pane">
                                <el-row :gutter="30">
                                    <el-col :span="6">
                                        <el-form-item label="单位名称">
                                            <el-input v-model="form.company.cname" placeholder="请输入单位名称"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="联系电话">
                                            <el-input v-model="form.company.cphone" placeholder="请输入联系电话"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="传真号码">
                                            <el-input v-model="form.company.cfax" placeholder="请输入传真号码"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="法定代表">
                                            <el-input v-model="form.company.clegal" placeholder="请输入法定代表"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="30">
                                    <el-col :span="6">
                                        <el-form-item label="单位税号">
                                            <el-input v-model="form.company.cduty" placeholder="请输入单位税号"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="单位地址">
                                            <el-input v-model="form.company.caddress" placeholder="请输入单位地址"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="职级名称">
                                            <el-input v-model="form.company.rank" placeholder="请输入职级名称"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="联系电话">
                                            <el-input v-model="form.company.mobile" placeholder="请输入联系电话"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="30">
                                    <el-col :span="6">
                                        <el-form-item label="职级内容">
                                            <el-input v-model="form.company.rank_content" placeholder="请输入职级内容"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="职业类别">
                                            <el-input v-model="form.company.rank_type" placeholder="请输入职业类别"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="年收入">
                                            <el-input v-model="form.company.income" placeholder="请输入年收入"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="亲朋好友信息" name="third">
                        <el-table :data="form.relative" border>
                            <el-table-column label="客户姓名" prop="realname"></el-table-column>
                            <el-table-column label="性别">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.sex | sex }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="联系电话" prop="mobile"></el-table-column>
                            <el-table-column label="出生日期" prop="birthday"></el-table-column>
                            <el-table-column label="证件号码" prop="id_code"></el-table-column>
                            <el-table-column label="存在关系">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.ship | RELATIONSHIP }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="80">
                                <template slot-scope="scope">
                                    <el-button size="mini" type="danger" @click="handleDelete(scope)">移除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-row type="flex" justify="end" style="margin-top:20px">
                            <el-button type="primary" size="small" @click="handleAddRelationship">新增关系人</el-button>
                        </el-row>
                        
                    </el-tab-pane>
                </el-tabs>
            </el-form>
        </div>
        <el-dialog
        title="新增关系人"
        :visible.sync="dialogVisible"
        width="800px"
        :before-close="handleClose">
        <add-relationship v-if="dialogVisible" @formChange="handleFormChange" @change="handleChange" :sexOption="sexOption" :shipOption="shipOption"></add-relationship>
        </el-dialog>
</div>
 
        

   
</template>
<script>
import { getAllDict } from '@/api/dataDictionary'
import { customerSave,customerGetDetail,customerUpdate } from '@/api/customer'
import addRelationship from './addRelationship.vue'
export default {
    name:'customerEdit',
    components:{
        addRelationship
    },
    data() {
        return {
            isLoading:false,
            dialogVisible:false,
            qTableData:[],
            form:{
                info:{
                    pid:'',
                    realname:'',
                    customer_type:'',
                    country:'',
                    id_type:'',
                    id_code:'',
                    birthday:'',
                    sex:'',
                    marriage:'',
                    mobile:'',
                    email:'',                               
                    phone:'',
                    note:'',
                    address:'',
                    zip:'',
                    other_address:'',
                    other_zip:'',
                    other_onte:'',
                },
                company:{
                    customer_info_id:'',
                    cname:'',
                    cphone:'',
                    cfax:'',
                    clegal:'',
                    cduty:'',
                    caddress:'',
                    rank:'',
                    mobile:'',
                    rank_content:'',
                    rank_type:'',
                    income:''
                },
                relative:[]
            },
            customerOption:[],
            gjOption:[],
            idTypeOption:[],
            sexOption:[],
            marriageOption:[],
            shipOption:[],
            activeName:'first'
        }
    },
    async created() {
        this.$store.dispatch('setLoading',true)
        await getAllDict().then(res => {
            this.handleSelect(res.data.system,'CUSTOMER_TYPE',this.customerOption);
            this.handleSelect(res.data.system,'COUNTRY',this.gjOption)
            this.handleSelect(res.data.system,'CERTTYPE',this.idTypeOption)
            this.handleSelect(res.data.system,'SEX',this.sexOption)
            this.handleSelect(res.data.system,'MARRIAGE',this.marriageOption)
            this.handleSelect(res.data.system,'RELATIONSHIP',this.shipOption)
        })
        await this.init()
    },
    activated() {
        let boo = this.$route.query.pageClick;
        if(boo){
            this.init();
        }
    },

    methods:{
        init() {
            this.$store.dispatch('setLoading',true)
            let data = {
                params:{
                    id:this.$route.params.id
                }
                
            }
            customerGetDetail(this.$route.params.id).then(res => {
                console.log(res)
                if(res !== 'error'){
                    this.form = res.data
                    this.$store.dispatch('setLoading',false)
                }
            })
        },
        handleDelete(scope) {
            console.log(scope)
            this.form.relative.splice(scope.$index,1)
        },
        handleSelect(obj,field,option) {
            for(let i in obj[field]){
                let o = {
                    label:obj[field][i],
                    value:i
                }
                option.push(o);
            }
        },
        handleChange() {
            this.dialogVisible = false;
        },
        handleFormChange(form) {
            this.form.relative.push(form)
            console.log(this.form.relative)
            this.dialogVisible = false;
        },
        handleAddRelationship() {
            this.dialogVisible = true;
        },
        handleEmpty() {},
        handleClick() {

        },
        handleSubmit() {
            this.isLoading = true;
            customerUpdate(this.$route.params.id,this.form).then(res => {
                console.log(res)
                if(res !== 'error'){
                     _g.toastMsg('success','保存成功')
                     setTimeout(() => {
                        this.addRefresh('customerList');
                    },300)
                    this.isLoading = false;
                }else{
                    this.isLoading = false;
                }
            })
        },
        handleClose() {
            this.dialogVisible = false;
        }
    }
}
</script>
<style lang="scss" scoped>

.innerbox{
    position: relative;
    width:100%;
    overflow-x: hidden;
    overflow-y: scroll;
    height:100%;
    padding-right:12px;
    box-sizing:border-box;
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

