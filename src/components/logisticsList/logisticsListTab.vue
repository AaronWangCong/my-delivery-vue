<template>
  <div class="logisticsListTab-wrap">
    <div class="logisticsListTab-content-form search-form">
      <el-form :model="searchForm">
        <div>
          <el-form-item label="公司名称" label-width="95px" class="inputWidth160">
            <el-select v-model="searchForm.companyId" clearable filterable placeholder="请选择">
              <el-option
                v-for="item in allCompanyName"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所在地" label-width="95px" class="inputWidth160">
            <el-select v-model="searchForm.locationNo" clearable filterable placeholder="请选择">
              <el-option
                v-for="item in allCompanyLocations"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="服务类型" label-width="95px" class="inputWidth160">
            <el-select v-model="searchForm.serviceType" clearable filterable placeholder="请选择">
              <el-option
                v-for="item in allServiceTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间" label-width="95px">
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
          <el-form-item label-width="30px" class="search-form-btn">
            <span class="add-btn" @click="searchServiceList()">筛选</span>
            <span class="add-btn">导出数据</span>
          </el-form-item>
        </div>
      </el-form>
    </div>

    <div class="logisticsListTab-content-table">
      <template>
        <el-table :data="serviceProviderList" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="scope">
                <detail-table :scope="scope"></detail-table>
            </template>
          </el-table-column>
          <el-table-column prop="createDate" label="创建时间" min-width="160"></el-table-column>
          <el-table-column prop="companyName" label="公司名称" min-width="160"></el-table-column>
          <el-table-column prop="name" label="公司logo" min-width="76">
            <template slot-scope="scope">
              <div class="company-logo">
                <img :src="scope.row.companyLogoPath" alt="">
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="companyName" label="公司名称" min-width="150"></el-table-column> -->
          <el-table-column prop="locationName" label="所在地" min-width="75"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div class="operate">
                <span class="operate-btn" @click="editService(scope.row)">编辑</span>
                <span class="operate-btn" @click="delLogisticsics(scope.row)">删除</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <pagination :pagerData="pagerData" @onSearch="searchByPage"></pagination>
    </div>

    <!-- 新增/编辑服务商Modal -->
    <el-dialog :title="logisticsDialogTitle" :visible.sync="logisticsDialog"  :close-on-click-modal="false" width="500px">
      <el-form :model="serviceProvidersForm" :rules="serviceProvidersFormRules" ref="serviceProvidersForm">
        <el-form-item label="公司名称" label-width="80px" prop="companyName">
          <el-input type="text" v-model="serviceProvidersForm.companyName" placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <el-form-item label="所在地" label-width="80px" prop="locationNo">
          <el-select v-model="serviceProvidersForm.locationNo" clearable filterable placeholder="请选择" @change="locationNameChange">
            <el-option
              v-for="item in allDestinationAndCity"
              :key="item.label"
              :label="item.label + ' ' + item.value"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公司logo" label-width="80px" class="form-avatar-uploader">
          <el-upload
            class="avatar-uploader"
            action="/"
            :show-file-list="false"
            :multiple="false"
            :http-request="uploadChange"
            :before-upload="beforeAvatarUpload"
            accept="image/*">
            <img v-if="this.serviceProvidersForm.logoPath" :src="this.serviceProvidersForm.logoPath" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="avatar-uploader-tips">
            <span>Logo尺寸：300 x 300px</span>
            <span>只能上传jpg/png文件，且不超过500kb</span>
          </div>
        </el-form-item>
        <el-form-item label="服务类型" label-width="80px" prop="serviceCodes">
          <el-checkbox-group v-model="serviceProvidersForm.serviceCodes">
            <el-checkbox v-for="(item,index) in allServiceTypes" :key="index" :label="item.value" :vlue="item.value">{{ item.label }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="serviceProviders('serviceProvidersForm')">确 定</el-button>
        <el-button @click="logisticsDialog = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import logisticsListDetail from "./logisticsListDetail";
import pagination from '../common/Pagination.vue'
export default {
  name: "",
  components: {
    "detail-table": logisticsListDetail,
    "pagination": pagination
  },
  props: {},
  data() {
    return {
      changePassDialog: false,
      logisticsDialog: false,
      logisticsType: '',
      logisticsDialogTitle: '编辑服务商',
      dateTime: [],
      logoFile: {},
      serviceProvidersFormRules: {
        companyName: [
          { required: true, message: '请选择公司名称', trigger: 'blur' }
        ],
        locationNo: [
          { required: true, message: '请选择公司所在地', trigger: 'blur' }
        ],
        serviceCodes: [
          { required: true, message: '请选择服务类型', trigger: 'blur' }
        ]
      },
    };
  },
  computed: {
    ...mapState({
      'allDestinationAndCity': state => state.common.allDestinationAndCity,
      'allCompanyName': state => state.common.allCompanyName,
      'allServiceTypes': state => state.common.allServiceTypes,
      'allCompanyLocations': state => state.common.allCompanyLocations,

      'serviceProvidersForm': state => state.logisticsListTab.serviceProvidersForm,
      'searchForm': state => state.logisticsListTab.searchForm,
      'serviceProviderList': state => state.logisticsListTab.serviceProviderList,
      'pagerData': state => state.logisticsListTab.pagerData,
    })
  },
  methods: {
    ...mapActions('logisticsListTab', [
      'searchServiceList',
      'editServiceProviders',
      'delLogisticsicsAct',
      'addServiceProviders',
      'uploadServiceProvid'
    ]),

    ...mapMutations('logisticsListTab', [
      'setPageData',
      'resetServiceProvidersForm'
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
    // 分页查询
    searchByPage(pageNo, pageSize) {
      this.setPageData({
        pageNo: pageNo,
        pageSize: pageSize
      });
      this.searchServiceList();
    },
    // 新增服务商
    addService(type){
      this.logisticsDialogTitle = '新增服务商'
      this.logisticsDialog = true
      this.resetServiceProvidersForm()
      this.logisticsType = type
    },
    // 编辑服务商
    editService(row){
      this.serviceProvidersForm.companyId = row.id
      this.serviceProvidersForm.companyName = row.companyName
      this.serviceProvidersForm.locationName = row.locationName
      this.serviceProvidersForm.locationNo = row.locationNo
      this.serviceProvidersForm.logoPath  = row.companyLogoPath
      let serviceTypeArr = []
      for(let i =0; i < row.services.length; i ++ ){
        serviceTypeArr.push(row.services[i].serviceType)
      }
      this.serviceProvidersForm.serviceCodes = serviceTypeArr // 服务类型

      this.logisticsDialog = true
      this.logisticsType = ''
    },
    // 新增、编辑服务商==提交
    serviceProviders(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(!this.serviceProvidersForm.logoPath) {
            this.$notify.error({
              title: '错误',
              message: '公司logo不能为空！'
            });
            return
          }

          this.logisticsDialog = false;
          if(this.logisticsType == 'add'){
            this.addServiceProviders()
          }else{
            this.editServiceProviders()
          }
        } else {
          return false;
        }
      });
    },
    uploadChange(data) {
      let fd = new FormData;
      fd.append("file", data.file)
      this.uploadServiceProvid(fd)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 修改密码
    changePass() {
      this.changePassDialog = true;
    },
    // 删除服务商
    delLogisticsics(row) {
      this.$confirm("确认删除该服务商吗？", "删除提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning",
        closeOnClickModal: false
      })
        .then(() => {
          this.delLogisticsicsAct(row.id)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 同时获取label和value
    locationNameChange(val) {
      let obj = {};
      obj = this.allDestinationAndCity.find((item)=>{//这里的userList就是上面遍历的数据源
        return item.value === val;//筛选出匹配数据
      });
      this.serviceProvidersForm.locationName=obj.label;
      this.serviceProvidersForm.locationNo=val;
    }
  },
  created() {
    this.searchServiceList()
  },
  mounted() {

  }
};
</script>
<style lang="scss">
.logisticsListTab-wrap{
  width: 100%;
  .logisticsListTab-content-form{
    padding: 15px 0;
    .el-form{
      &>div{
        flex-wrap: wrap;
      }
    }
    .el-input{
      max-width: 180px;
    }
  }
  .logisticsListTab-content-table{
    width: 100%;
    .company-logo{
      img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid #ccc;
        display: inline-block;
      }
    }
  }
  .avatar{
    width: 70px;
    height: 70px;
  }
}
</style>