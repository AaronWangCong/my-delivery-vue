<template>
  <div class="accountManagementTab-wrap">
    <div class="accountManagementTab-wrap-account">
      <div class="account-content">
        <div class="account-content-title">
          <span class="text"></span>
          <span class="add-btn" @click="addUser()"><i class="el-icon-plus"></i>新建账号</span>
        </div>
        <div class="account-content-form search-form">
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
              <el-form-item label="姓名" label-width="95px" class="inputWidth160">
                <el-input v-model="searchForm.name" autocomplete="off" placeholder="个人姓名"></el-input>
              </el-form-item>
              <el-form-item label="手机号" label-width="95px" class="inputWidth160">
                <el-input v-model="searchForm.phoneNo" autocomplete="off" placeholder="个人手机号"></el-input>
              </el-form-item>
              <el-form-item label="微信昵称" label-width="95px" class="inputWidth160">
                <el-input v-model="searchForm.wechatAccount" autocomplete="off" placeholder="个人微信昵称"></el-input>
              </el-form-item>
              <el-form-item label="城市" label-width="95px" class="inputWidth160">
                <el-input v-model="searchForm.wechatCity" autocomplete="off" placeholder="个人微信资料城市"></el-input>
              </el-form-item>
              <el-form-item label="创建时间" label-width="95px">
                <el-date-picker
                  v-model="dateTime"
                  type="daterange"
                  range-separator="-"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  @change="dateTimeChange">
                </el-date-picker>
              </el-form-item>
              <el-form-item label-width="30px" class="search-form-btn">
                <span class="add-btn" @click="searchByPage(1, pagerData.pageSize)">筛选</span>
                <span class="add-btn">导出数据</span>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="account-content-table">
          <el-table :data="userList" style="width: 100%">
            <el-table-column prop="createDate" label="创建时间" min-width="160"></el-table-column>
            <el-table-column prop="companyName" label="公司名称" min-width="100"></el-table-column>
            <el-table-column prop="name" label="姓名" min-width="100"></el-table-column>
            <el-table-column prop="phoneNo" label="手机号" min-width="160"></el-table-column>
            <el-table-column prop="wechatAccount" label="微信昵称" min-width="180"></el-table-column>
            <el-table-column prop="wechatCity" label="微信城市" min-width="180"></el-table-column>
            <el-table-column prop="serviceNames" label="服务类型" min-width="203"></el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
              <template slot-scope="scope">
                <div class="operate">
                  <span class="operate-btn" @click="editUser(scope.row)">编辑</span>
                  <span class="operate-btn" @click="delUser(scope.row)">删除</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pagination :pagerData="pagerData" @onSearch="searchByPage"></pagination>
      </div>
    </div>

    <!-- 新建账号Modal -->
    <el-dialog title="新建账号" :visible.sync="addUserInfoDialog" :close-on-click-modal="false" width="400px">
      <el-form :model="addUserForm" :rules="addUserFormRules" ref="addUserForm">
        <el-form-item label="公司名称" label-width="80px" prop="companyId">
          <el-select v-model="addUserForm.companyId" clearable filterable placeholder="请选择" @change="companyChange(addUserForm.companyId)">
            <el-option
              v-for="item in allCompanyName"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务类型" label-width="80px" prop="companyServiceTypeIds">
          <el-select v-model="addUserForm.companyServiceTypeIds" multiple collapse-tags clearable filterable placeholder="请选择">
            <el-option
              v-for="item in companyServiceTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" label-width="80px" prop="name">
          <el-input v-model="addUserForm.name" autocomplete="off" placeholder="您的姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="80px" prop="phoneNo">
          <el-input v-model="addUserForm.phoneNo" autocomplete="off" placeholder="您的手机号"></el-input>
        </el-form-item>
        <el-form-item label="微信昵称" label-width="80px" prop="wechatAccount">
          <el-input v-model="addUserForm.wechatAccount" autocomplete="off" placeholder="微信昵称"></el-input>
        </el-form-item>
        <el-form-item label="城市" label-width="80px" prop="wechatCity">
          <el-input v-model="addUserForm.wechatCity" autocomplete="off" placeholder="微信城市（如果为中文请使用拼音）"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addUserInfoConfirm('addUserForm')">确 定</el-button>
        <el-button @click="addUserInfoDialog = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import pagination from '../common/Pagination.vue'
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      addUserInfoDialog: false,
      dateTime: [],
      addUserFormRules:{
        companyId: [
          { required: true, message: '请选择公司名称', trigger: 'blur' }
        ],
        companyServiceTypeIds: [
          { required: true, message: '请选择服务类型', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        phoneNo: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        wechatAccount: [
          { required: true, message: '请输入微信昵称', trigger: 'blur' }
        ],
        wechatCity: [
          { required: true, message: '请输入微信资料城市', trigger: 'blur' }
        ]
      },
      companyUserId:'',
    };
  },
  components: {
    "pagination": pagination
  },
  methods: {
    ...mapActions('accountManagementTab', [
      'searchUserList',
      'addAndEditUserInfo',
      'delUserInfo'
    ]),
    ...mapActions('common', [
      'getCompanyServiceTypes'
    ]),
    ...mapMutations('accountManagementTab', [
      'setPageData',
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
      this.searchUserList();
    },
    //新建账号
    addUser() {
      this.companyUserId = ''
      this.addUserForm.companyId = ''
      this.addUserForm.companyServiceTypeIds = []
      this.addUserForm.name = ''
      this.addUserForm.phoneNo = ''
      this.addUserForm.wechatAccount = ''
      this.addUserForm.wechatCity = ''

      this.addUserInfoDialog = true;
    },
    // 编辑账号
    editUser(row) {
      this.addUserForm.companyId = row.companyId
      this.addUserForm.companyServiceTypeIds = row.companyServiceTypeIds
      this.addUserForm.name = row.name
      this.addUserForm.phoneNo = row.phoneNo
      this.addUserForm.wechatAccount = row.wechatAccount
      this.addUserForm.wechatCity = row.wechatCity
      this.companyUserId = row.id
      
      this.getCompanyServiceTypes(row.companyId)

      this.addUserInfoDialog = true;
    },
    //确认添加/修改
    addUserInfoConfirm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addAndEditUserInfo(this.companyUserId)

          this.addUserInfoDialog = false
        } else {
          return false;
        }
      });
    },
    // 删除
    delUser(row) {
      this.$confirm("确认删除该账号吗？", "删除提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning",
        closeOnClickModal: false
      })
        .then(() => {
          this.delUserInfo(row.id)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    companyChange(companyId) {
      this.getCompanyServiceTypes(companyId)
    }
  },
  computed: {
    ...mapState({
      'allCompanyName': state => state.common.allCompanyName,
      'allCompanyLocations': state => state.common.allCompanyLocations,
      'allServiceTypes': state => state.common.allServiceTypes,
      'companyServiceTypes': state => state.common.companyServiceTypes,
      'addUserForm': state => state.accountManagementTab.addUserForm,

      'searchForm': state => state.accountManagementTab.searchForm,
      'editUserForm': state => state.accountManagementTab.editUserForm,
      'editUserPassForm': state => state.accountManagementTab.editUserPassForm,
      'userList': state => state.accountManagementTab.userList,
      'pagerData': state => state.accountManagementTab.pagerData,
    })
  },
  created() {
    this.searchUserList()
  },
  mounted() {
  }
};
</script>

<style lang="scss">
.accountManagementTab-wrap{
  width: 100%;
	.accountManagementTab-wrap-account{
		width: 100%;
		.account-content{
			.account-content-title{
				display: flex;
				justify-content: space-between;
				align-items: center;
        padding: 15px 0;
        border-bottom: 1px solid #EBEEF5;
				.text{
					font-size: 16px;
					color: #333;
				}
      }
      .account-content-form{
        .el-form{
          padding: 20px 0;
          &>div{
            justify-content: flex-start;
            flex-wrap: wrap;
          }
        }
      }
		}
	}
}
</style>
