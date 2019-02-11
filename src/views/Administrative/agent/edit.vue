<template>
<div>
        <sticky :className="'sub-navbar'" :stickyTop="84">
            <div class="app-main-btm-fixed" ref="appMainFixed">
                <h1 class="page-title-box">
                    代理人编辑
                </h1>
                <div>
                <el-button type="danger" size="mini" icon="el-icon-close" @click="handleEmpty()">清空表单</el-button>
                <el-button type="primary" icon="el-icon-check" size="mini" @click="handleSubmit" :loading="isLoading">保存</el-button>
                </div>
            </div>
        </sticky>
        <div class="app_main_content">
            <el-form :model="form" ref="form" class="form" v-loading="loading" element-loading-text="数据加载中">
                <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
                    <el-tab-pane label="职位信息" name="first">
                        <div class="pane">
                            <el-row :gutter="30">
                                <el-col :span="6">
                                    <el-form-item label="机构">
                                        <el-select v-model="form.self.agency_id" placeholder="请选择机构" style="width:100%" @change="agencyChange">
                                            <el-option v-for="(item,index) in orgOption" :key="index" :label="item.agency_name" :value="item.id"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="部门">
                                        <el-select v-model="form.self.depart_id" placeholder="请选择部门" style="width:100%" :disabled="departFlag">
                                            <el-option v-for="(item,index) in departOption" :key="index" :label="item.agency_name" :value="item.id"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <!-- <el-col :span="6">
                                    <el-form-item label="职位">
                                        <el-select v-model="form.self.position_id" placeholder="请选择职位" style="width:100%">
                                            <el-option v-for="(item,index) in gjOption" :key="index" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col> -->
                                <el-col :span="6">
                                    <el-form-item label="勤务类型">
                                        <!-- <el-input v-model="form.info.id_type" placeholder="请输入国籍"></el-input> -->
                                        <el-select v-model="form.self.duty_type" style="width:100%" placeholder="请选择勤务类型">
                                            <el-option v-for="(item,index) in dutyOption" :key="index" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="30">
                                <el-col :span="6">
                                    <el-form-item label="员工编号">
                                        <el-input v-model="form.self.agent_no" placeholder="请输入员工编号"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="入司时间">
                                        <el-date-picker
                                            v-model="form.self.join_time"
                                            type="date"
                                            style="width:100%"
                                            value-format="yyyy-MM-dd"
                                            clearable
                                            placeholder="请输入入司时间">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="30">
                                <el-col :span="6">
                                    <el-form-item label="合同号码">
                                        <el-input v-model="form.self.contract_code" placeholder="请输入证件号"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="合同起期">
                                        <el-date-picker
                                            v-model="form.self.contract_start"
                                            type="date"
                                            style="width:100%"
                                            value-format="yyyy-MM-dd"
                                            clearable
                                            placeholder="请输入合同起期">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="合同终期">
                                        <el-date-picker
                                            v-model="form.self.contract_end"
                                            type="date"
                                            style="width:100%"
                                            value-format="yyyy-MM-dd"
                                            clearable
                                            placeholder="请输入合同终期">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="基本信息" name="second">
                        <div class="pane">
                                <el-row :gutter="30">
                                    <el-col :span="6">
                                        <el-form-item label="中文名">
                                            <el-input v-model="form.info.realname" placeholder="请输入中文名"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="英文名">
                                            <el-input v-model="form.info.eng_realname" placeholder="请输入英文名"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="性别">
                                            <el-select v-model="form.info.sex" placeholder="请选择性别" style="width:100%">
                                                <el-option v-for="(item,index) in sexOption" :label="item.label" :value="item.value" :key="index"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="证件类型">
                                            <el-select v-model="form.info.id_type" placeholder="请选择证件类型" style="width:100%">
                                                <el-option v-for="(item,index) in idTypeOption" :label="item.label" :value="item.value" :key="index"></el-option>
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
                                        <el-form-item label="联系地址">
                                            <el-input v-model="form.info.address" placeholder="请输入联系地址"></el-input>
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
                                        <el-form-item label="婚姻">
                                            <el-select v-model="form.info.marriage" placeholder="请输入婚姻" style="width:100%">
                                                <el-option v-for="(item,index) in marriageOption" :label="item.label" :value="item.value" :key="index"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="30">
                                    <el-col :span="6">
                                        <el-form-item label="学历">
                                            <el-select v-model="form.info.education" placeholder="请输入学历" style="width:100%">
                                                <el-option v-for="(item,index) in educationOption" :label="item.label" :value="item.value" :key="index"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="民族">
                                            <el-select v-model="form.info.nation" placeholder="请选择民族" style="width:100%">
                                                <el-option v-for="(item,index) in nationOption" :label="item.label" :value="item.value" :key="index"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="血型">
                                            <el-select v-model="form.info.blood" placeholder="请选择血型" style="width:100%">
                                                <el-option v-for="(item,index) in bloodOption" :label="item.label" :value="item.value" :key="index"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="社保">
                                            <el-select v-model="form.info.social" placeholder="请选择社保" style="width:100%">
                                                <el-option v-for="(item,index) in socialOption" :label="item.label" :value="item.value" :key="index"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="30">
                                    <el-col :span="6">
                                        <el-form-item label="政治面貌">
                                            <el-select v-model="form.info.political" placeholder="请选择政治面貌" style="width:100%">
                                                <el-option v-for="(item,index) in politicalOption" :label="item.label" :value="item.value" :key="index"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="邮编">
                                            <el-input v-model="form.info.zip" placeholder="请输入邮编"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="手机号码">
                                            <el-input v-model="form.info.mobile" placeholder="请输入手机号码"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="30">
                                    <el-col :span="6">
                                        <el-form-item label="邮箱">
                                            <el-input v-model="form.info.email" placeholder="请输入邮箱"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="座机">
                                            <el-input v-model="form.info.phone" placeholder="请输入座机"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="紧急联系人电话">
                                            <el-input v-model="form.info.contact_mobile" placeholder="请输入紧急联系人电话"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="籍贯">
                                            <el-select v-model="form.info.native_place" placeholder="请选择籍贯" style="width:100%">
                                                <el-option v-for="(item,index) in placeOption" :label="item.label" :value="item.value" :key="index"></el-option>
                                            </el-select>
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
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="文档信息" name="third">
                        <el-table :data="qTableData" border>
                            <el-table-column label="文档类型" prop="file_id">
                                <template slot-scope="scope">
                                    <span>{{ dictionary(fileOption,scope.row.file_id) }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="内容(卡号)号码" prop="value"></el-table-column>
                            <el-table-column label="有效期起" prop="start_time"></el-table-column>
                            <el-table-column label="有效期止" prop="end_time"></el-table-column>
                            <!-- <el-table-column label="影像文档" prop="id_code"></el-table-column> -->
                            <el-table-column label="备注" prop="note"></el-table-column>
                            <el-table-column label="操作" width="80">
                                <template slot-scope="scope">
                                    <el-button type="danger" size="mini" @click="handleDelete(scope)">移除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-row type="flex" justify="end" style="margin-top:20px">
                            <el-button type="primary" size="small" @click="handleAddRelationship">新增文档</el-button>
                        </el-row>
                        
                    </el-tab-pane>
                </el-tabs>
            </el-form>
        </div>
        <el-dialog
        title="新增文档信息"
        :visible.sync="dialogVisible"
        width="800px"
        :before-close="handleClose">
        <add-relationship v-if="dialogVisible" @formChange="handleFormChange" @change="handleChange" :sexOption="sexOption" :shipOption="shipOption"></add-relationship>
        </el-dialog>
</div>
</template>
<script>
import { getAllDict } from '@/api/dataDictionary'
import { agentSave,agentRead,agentUpdate } from '@/api/agent'
import { agencyIndex } from '@/api/agency'
 import addRelationship from './addRelationship.vue'
export default {
    name:'agentEdit',
    components:{
        addRelationship
    },
    data() {
        return {
            isLoading:false,
            dialogVisible:false,
            qTableData:[],
            dutyOption:[],
            idTypeOption:[],
            fileOption:[],
            loading:false,
            socialOption:[{
                label:'是',
                value:1
            },{
                label:'否',
                value:0
            }],
            departFlag:true,
            form:{
                self:{
                    agency_id:'',
                    depart_id:'',
                    position_id:'',
                    duty_type:'',
                    agent_no:'',
                    introduce_id:'',
                    relatively_id:'',
                    charge_id:'',
                    join_time:'',
                    contract_code:'',
                    contract_start:'',
                    contract_end:'',
                },
                info:{
                    realname:'',
                    eng_realname:'',
                    sex:'',
                    id_type:'',
                    id_code:'',
                    birthday:'',
                    marriage:'',
                    education:'',
                    nation:'',                               
                    blood:'',
                    social:'',
                    political:'',
                    address:'',
                    zip:'',
                    mobile:'',
                    email:'',
                    phone:'',
                    note:'',
                    contact_mobile:'',
                    native_place:'',
                },
                file:[]
            },
            orgOption:[],
            departOption:[],
            gjOption:[],
            idTypeOption:[],
            sexOption:[],
            marriageOption:[],
            shipOption:[],
            educationOption:[],
            nationOption:[],
            bloodOption:[],
            politicalOption:[],
            placeOption:[],
            activeName:'first'
        }
    },
    computed:{
        dictionaryData() {
            return this.$store.state.appMain.dataDictionary
        }
    },
    created() {
        // let arr = ['1',['2','3'],'5'];
        // console.log(arr.includes(['2','3']))
        this.init();
        this.dutyOption = _g.handleSelect(this.dictionaryData.system,'DUTY_TYPE');
        this.idTypeOption = _g.handleSelect(this.dictionaryData.system,'CERTTYPE');
        this.educationOption = _g.handleSelect(this.dictionaryData.system,'EDUCATION');
        this.nationOption = _g.handleSelect(this.dictionaryData.system,'NATION');
        this.bloodOption = _g.handleSelect(this.dictionaryData.system,'BLOOD');
        this.politicalOption = _g.handleSelect(this.dictionaryData.system,'POLITICAL');
        this.placeOption = _g.handleSelect(this.dictionaryData.system,'COUNTRY');
        this.fileOption = _g.handleSelect(this.dictionaryData.system,'FILE_TYPE');
        this.sexOption = _g.handleSelect(this.dictionaryData.system,'SEX');
        this.marriageOption = _g.handleSelect(this.dictionaryData.system,'MARRIAGE');
        console.log(this.dutyOption)
    },

    methods:{
        agencyChange(value) {
            console.log(value)
            let flag = true;
            _(this.orgOption).forEach(item => {
                if(item.id == value){
                    if(item.child) {
                        this.departOption = item.child;
                        flag = false;
                    }
                }
            })
            this.departFlag = flag;
        },
        async init() {
            this.loading = true;
            
            await agencyIndex().then(res => {
                if(res !== 'error'){
                    console.log(res)
                    this.orgOption = res.data;
                }
            })

            await agentRead(this.$route.params.id).then(res => {
                if(res !== 'error'){
                    this.form = res.data;
                    this.form.self.agency_id = Number(this.form.self.agency_id);
                    this.form.self.depart_id = Number(this.form.self.depart_id);
                    this.agencyChange(this.form.self.agency_id);
                    this.qTableData = this.form.file;
                    // this.form.self.join_time = _g.timestampToTime(this.form.self.join_time)
                    // this.form.self.contract_end = _g.timestampToTime(this.form.self.contract_end)
                    // this.form.self.contract_start = _g.timestampToTime(this.form.self.contract_start)
                    // console.log(this.form.self.contract_start)
                    this.loading = false;
                }
            })
        },
        handleDelete(scope) {
            console.log(scope)
            this.form.file.splice(scope.$index,1)
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
            this.form.file.push(form)
            console.log(this.form.file)
            this.qTableData = this.form.file
            this.dialogVisible = false;

        },
        handleAddRelationship() {
            this.dialogVisible = true;
        },
        handleEmpty() {},
        handleClick() {

        },
        handleSubmit() {
            
            agentUpdate(this.$route.params.id,this.form).then(res => {
                console.log(res)
                if(res !== 'error'){
                     _g.toastMsg('success','保存成功')
                     setTimeout(() => {
                         this.addRefresh('agentList');
                     },1000)
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



