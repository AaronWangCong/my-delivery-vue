<template>
  <div class="timeset-wrap">
    <div class="timeset-wrap-account page-common">
      <div class="timeset-head page-common-head">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>时间设置</el-breadcrumb-item>
        </el-breadcrumb>
        <span class="add-btn" @click="setWorkTime()">设置工作时间</span>
      </div>

      <div class="search-form timeset-form">
        <el-form :model="searchForm">
          <div>
            <el-form-item label="公司名称" label-width="90px" class="company-name">
              <el-select v-model="searchForm.companyId" clearable filterable placeholder="请选择" @change="companyChange(searchForm.companyId)">
                <el-option
                  v-for="item in allCompanyName"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="服务类型" label-width="90px" class="inputWidth160">
              <el-select v-model="searchForm.companyServiceTypeId" clearable filterable placeholder="请选择">
                <el-option
                  v-for="item in serviceTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="创建时间" label-width="90px">
              <el-date-picker
                v-model="dateTime"
                type="daterange"
                range-separator="-"
                value-format="yyyy-MM-dd HH:mm:ss"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                @change="dateTimeChange()">
              </el-date-picker>
            </el-form-item>
            <el-form-item label-width="70px" class="search-form-btn">
              <span class="add-btn" @click="searchByPage(1, pagerData.pageSize)">筛选</span>
            </el-form-item>
          </div>
        </el-form>
      </div>
      
      <div class="page-common-content timeset-content">
        <div class="timeset-content-table">
          <template>
            <el-table :data="timesetInfo" style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="scope">
                    <detail-table :scope="scope"></detail-table>
                </template>
              </el-table-column>
              <el-table-column prop="createDate" label="创建时间" min-width="160"></el-table-column>
              <el-table-column prop="companyName" label="公司名称" min-width="150"></el-table-column>
              <el-table-column prop="companyServiceTypeName" label="服务类型" min-width="203"></el-table-column>
              <el-table-column prop="timeZoneCn" label="时区" min-width="150"></el-table-column>
              <el-table-column label="操作" min-width="150">
                <template slot-scope="scope">
                  <div class="operate">
                    <span class="operate-btn" @click="editWorkTime(scope.row)">修改</span>
                    <!-- <span class="operate-btn" @click="delWorkTime(scope.row)">删除</span> -->
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </div>

      <pagination :pagerData="pagerData" @onSearch="searchByPage"></pagination>
    </div>

    <!-- 设置工作时间 -->
    <el-dialog title="设置工作时间" :visible.sync="setWorkTimeDialog" :close-on-click-modal="false" width="500px">
      <el-form :model="setWorkTimeDialogForm" :rules="setWorkTimeDialogFormRules" ref="setWorkTimeDialogForm" class="setWorkTimeDialog-form">
        <el-form-item label="公司名称" label-width="80px" prop="companyId" class="company-name">
          <el-select v-model="setWorkTimeDialogForm.companyId" clearable filterable placeholder="请选择" @change="getCompanyServiceTypes(setWorkTimeDialogForm.companyId)">
            <el-option
              v-for="item in allCompanyName"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务类型" label-width="80px" prop="companyServiceTypeId">
          <el-select v-model="setWorkTimeDialogForm.companyServiceTypeId" clearable filterable placeholder="请选择" @change="companyServiceTypesChange">
            <el-option
              v-for="item in companyServiceTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时区" label-width="80px" prop="timeZoneCn" class="time-zone">
          <el-select v-model="setWorkTimeDialogForm.timeZoneCn" clearable filterable placeholder="请选择" @change="timeZoneCnChange">
            <el-option
              v-for="item in allTimeZon"
              :key="item.value"
              :label="item.label + ' ' + item.value"
              :value="item.value">
            </el-option>
          </el-select>
          <span class="green"><i class="iconfont icon-diqiu"></i>时区查询</span>
        </el-form-item>
        <el-form-item v-if="isWorkTime == true" label="工作时间" label-width="80px" class="work-time">
          <el-checkbox-group v-model="workTimeLabel" @change="weekTimeChange()">
            <el-checkbox v-for="(item, index) in weekTimeInfo" :key="index" :label="item.week">
              <span>{{ item.weekName }}</span>
              <el-time-select v-model="item.startTime" value-format="HH:mm" :picker-options="{ start: '00:00', step: '00:15', end: '24:00' }" placeholder="开始时间" @change="startTimeChange(index)"></el-time-select>
              <el-time-select v-model="item.endTime" value-format="HH:mm" :picker-options="{ start: '00:00', step: '00:15', end: '24:00', minTime: item.startTime }" placeholder="结束时间" @change="endTimeChange(index)"></el-time-select>
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitWorkTimeDialogForm('setWorkTimeDialogForm')">确 定</el-button>
        <el-button @click="setWorkTimeDialog = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import timesetDetail from "../components/timeset/timesetDetail";
import { mapState, mapActions, mapMutations } from "vuex";
import pagination from '../components/common/Pagination.vue'
export default {
  data() {
    return {
      workTimeLabel: [],
      weekTimeInfo:[
        {"endTime": "","startTime": "","week":1,"weekName": "星期一"},
        {"endTime": "","startTime": "","week":2,"weekName": "星期二"},
        {"endTime": "","startTime": "","week":3,"weekName": "星期三"},
        {"endTime": "","startTime": "","week":4,"weekName": "星期四"},
        {"endTime": "","startTime": "","week":5,"weekName": "星期五"},
        {"endTime": "","startTime": "","week":6,"weekName": "星期六"},
        {"endTime": "","startTime": "","week":7,"weekName": "星期日"}
      ],
      setWorkTimeDialog: false,
      dateTime: [],
      setWorkTimeDialogFormRules:{
        companyId: [
          { required: true, message: '请选择公司名称', trigger: 'blur' }
        ],
        companyServiceTypeId: [
          { required: true, message: '请选择服务类型', trigger: 'blur' }
        ],
        timeZoneCn: [
          { required: true, message: '请选择时区', trigger: 'blur' }
        ]
      },
      dialogType: '', // 弹窗类型
      isWorkTime: true,
      serviceTypes: []
    };
  },
  components: {
    "detail-table": timesetDetail,
    "pagination": pagination
  },
  methods: {
    ...mapActions('common', [
      'getAllCompanyName',
      'getAllTimeZon',
      'getCompanyServiceTypes',
      'getAllServiceTypes'
    ]),
    ...mapActions('timeset', [
      'getTimeSetInfo',
      'addTimeSetInfo',
      'delLogisticsicsAct',
      'editTimeSetInfo',
      'getServiceTimeSet'
    ]),

    ...mapMutations('timeset', [
      'setPageData'
    ]),

    // 时间处理
    dateTimeChange(){
      if(this.dateTime){
        this.searchForm.startDate = this.dateTime[0]
        this.searchForm.endDate = this.dateTime[1]
      }else{
        this.searchForm.startDate = ''
        this.searchForm.endDate = ''
      }
      console.log(this.dateTime)
    },
    //分页查询
    searchByPage(pageNo, pageSize) {
      this.setPageData({
        pageNo: pageNo,
        pageSize: pageSize
      });

      this.getTimeSetInfo();
    },
    //新增时间
    setWorkTime() {
      this.dialogType = 'add'

      this.setWorkTimeDialogForm.companyId = ""
      this.setWorkTimeDialogForm.timeZoneCn = ""
      this.setWorkTimeDialogForm.companyServiceTypeId = ""
      this.workTimeLabel = []
      for(let i = 0; i < this.weekTimeInfo.length; i ++ ){
        this.weekTimeInfo[i].startTime = ""
        this.weekTimeInfo[i].endTime = ""
      }

      this.setWorkTimeDialog = true
    },
    //编辑时间
    async editWorkTime(row) {
      await this.getServiceTimeSet(row.companyServiceTypeId)
      this.getCompanyServiceTypes(row.companyId)
      this.dialogType = 'edit'
      this.setWorkTimeDialogForm.companyId = row.companyId
      this.setWorkTimeDialogForm.companyServiceTypeId = row.companyServiceTypeId
      this.setWorkTimeDialogForm.timeZoneCn = row.timeZoneCn

      this.workTimeLabel = []
      for(let i = 0; i < this.weekTimeInfo.length; i ++ ){
        this.weekTimeInfo[i].startTime = ""
        this.weekTimeInfo[i].endTime = ""
      }
      for(let j = 0; j < this.serviceTimesetInfo.length; j ++ ){
        let item = this.serviceTimesetInfo[j]
        this.workTimeLabel.push(item.week)
        this.weekTimeInfo[item.week-1].startTime = item.startTime; this.weekTimeInfo[item.week-1].endTime = item.endTime;
      }

      this.setWorkTimeDialog = true
    },
    //新增时间提交
    submitWorkTimeDialogForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 将时间添加到表单
          this.setWorkTimeDialogForm.workingTimes = []
          for(let i = 0; i < this.workTimeLabel.length; i ++ ){
            this.setWorkTimeDialogForm.workingTimes.push(this.weekTimeInfo[this.workTimeLabel[i]-1])
          }
          
          if(this.dialogType == 'edit'){
            this.editTimeSetInfo()
          }else{
            this.addTimeSetInfo()
          }
          this.setWorkTimeDialog = false
        } else {
          return false;
        }
      });
    },
    delWorkTime(row) {
      this.$confirm("确认删除该工作时间吗？", "删除提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning",
        closeOnClickModal: false
      })
      .then(() => {
        this.delLogisticsicsAct(row.companyId)
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
    },
    weekTimeChange() {
      console.log(this.workTimeLabel)
    },
    startTimeChange(index) {
      this.weekTimeInfo[index].startTime = this.weekTimeInfo[index].startTime + ':00'
    },
    endTimeChange(index) {
      this.weekTimeInfo[index].endTime = this.weekTimeInfo[index].endTime + ':00'
    },
    // 同时获取label和value
    timeZoneCnChange(val) {
      let obj = {};
      obj = this.allTimeZon.find((item)=>{
        return item.value === val;//筛选出匹配数据
      });
      this.setWorkTimeDialogForm.timeZoneCn=obj.label;
      this.setWorkTimeDialogForm.timeZone=val;
    },
    companyServiceTypesChange(val) {
      let obj = {};
      obj = this.companyServiceTypes.find((item)=>{
        return item.value === val;//筛选出匹配数据
      });
      if(obj.label == '航司航程' || obj.label == '航司理货') {
        this.isWorkTime = false
        this.setWorkTimeDialogForm.workingTimes = []
      }else{
        this.isWorkTime = true
      }
    },
    async companyChange(companyId){
      await this.getCompanyServiceTypes(companyId)
      this.serviceTypes = this.companyServiceTypes
      if(!companyId) {
        this.serviceTypes = this.allServiceTypes
      }
    }
  },
  computed: {
    ...mapState({
      allCompanyName: state => state.common.allCompanyName,
      allServiceTypes: state => state.common.allServiceTypes,
      allTimeZon: state => state.common.allTimeZon,
      companyServiceTypes: state => state.common.companyServiceTypes,

      searchForm: state => state.timeset.searchForm,
      timesetInfo: state => state.timeset.timesetInfo,
      setWorkTimeDialogForm: state => state.timeset.setWorkTimeDialogForm,
      serviceTimesetInfo: state => state.timeset.serviceTimesetInfo,
      pagerData: state => state.timeset.pagerData
    })
  },
  created() {
    this.getAllTimeZon()
    this.getAllServiceTypes()
    this.getAllCompanyName()
    this.getTimeSetInfo()
  },
  mounted() {
    this.serviceTypes = this.allServiceTypes
  }
};
</script>

<style lang="scss">
@import "@assets/timeset/timeset.scss";
</style>
