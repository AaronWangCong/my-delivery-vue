<template>
  <div class="timePplanning-wrap">
    <div class="timePplanning-wrap-account page-common">
      <div class="timePplanning-head page-common-head">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>时效规划</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      
      <div class="timePplanning-content page-common-content">
        <div class="timePplanning-content-form search-form">
          <el-form :model="searchForm">
            <div>
              <el-form-item label="取货时间" label-width="110px" class="inputWidth160">
                <el-date-picker
                  v-model="searchForm.startTime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="出发地" label-width="110px" class="inputWidth160">
                <el-select v-model="searchForm.sendNo" clearable filterable placeholder="请选择" @change="sendNoChange">
                  <el-option
                    v-for="item in allChineseCity"
                    :key="item.value"
                    :label="item.label + ' ' + item.value"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="目的地" label-width="110px" class="inputWidth160">
                <el-select v-model="searchForm.deliveryNo" clearable filterable placeholder="请选择" @change="deliveryNoChange">
                  <el-option
                    v-for="item in alldestinationCountrie"
                    :key="item.value"
                    :label="item.label + ' ' + item.value"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="取货公司" label-width="110px" class="inputWidth160">
                <el-select v-model="searchForm.companyA" clearable filterable placeholder="请选择">
                  <el-option
                    v-for="item in companyOptions.companyAoptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="出库短驳公司" label-width="110px" class="inputWidth160">
                <el-select v-model="searchForm.companyB" clearable filterable placeholder="请选择">
                  <el-option
                    v-for="item in companyOptions.companyCoptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="机场短驳公司" label-width="110px" class="inputWidth160">
                <el-select v-model="searchForm.companyC" clearable filterable placeholder="请选择">
                  <el-option
                    v-for="item in companyOptions.companyEoptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="国内报关行" label-width="110px" class="inputWidth160">
                <el-select v-model="searchForm.companyDF" clearable filterable placeholder="请选择">
                  <el-option
                    v-for="item in companyOptions.companyDFoptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="航空公司" label-width="110px" class="inputWidth160">
                <el-select v-model="searchForm.companyGH" clearable filterable placeholder="请选择">
                  <el-option
                    v-for="item in companyOptions.companyGHoptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item label="航班" label-width="110px" class="inputWidth160">
                <el-select v-model="searchForm.firstFlightNo" clearable filterable placeholder="请选择">
                  <el-option
                    v-for="item in companyOptions.companyGHoptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="海外代理商" label-width="110px" class="inputWidth160">
                <el-select v-model="searchForm.companyK" clearable filterable placeholder="请选择">
                  <el-option
                    v-for="item in companyOptions.companyKoptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="海外清关公司" label-width="110px" class="inputWidth160">
                <el-select v-model="searchForm.companyJ" clearable filterable placeholder="请选择">
                  <el-option
                    v-for="item in companyOptions.companyJoptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="派送公司" label-width="110px" class="inputWidth160">
                <el-select v-model="searchForm.companyMN" clearable filterable placeholder="请选择">
                  <el-option
                    v-for="item in companyOptions.companyMNoptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label-width="30px" class="search-form-btn">
                <span class="add-btn"  @click="onSubmit">搜索</span>
              </el-form-item>
            </div>
          </el-form>
        </div>

        <div class="timePplanning-content-table">
          <div class="table-head">{{ sendNoLabel || '出发地' }} - {{ deliveryNoLabel || '目的地' }} 时效规划方案</div>
          <template>
            <el-table v-if="noBondedList.length" :data="noBondedList">
              <el-table-column type="expand" fixed="left">
                <template slot-scope="scope">
                    <detail-table :scope="scope" :detailType="'noBondedList'"></detail-table>
                </template>
              </el-table-column>
              <el-table-column label="取货时间" fixed="left" min-width="160">
                <template slot-scope="scope">
                  <span v-if="searchForm.startTime">{{ searchForm.startTime }}</span>
                </template>
              </el-table-column>
              <el-table-column label="司机取货" min-width="130">
                <template slot-scope="scope">
                  <div v-for="(item,index) in scope.row.dtos" :key="index">
                    <span v-if="item.roleTypeDesc == '司机取货'">{{ item.shippingCycleStr }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="仓库配货" min-width="130">
                <template slot-scope="scope">
                  <div v-for="(item,index) in scope.row.dtos" :key="index">
                    <span v-if="item.roleTypeDesc == '仓库配货'">{{ item.shippingCycleStr }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="出库短驳" min-width="130">
                <template slot-scope="scope">
                  <div v-for="(item,index) in scope.row.dtos" :key="index">
                    <span v-if="item.roleTypeDesc == '出库短驳'">{{ item.shippingCycleStr }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="国内报关" min-width="130">
                <template slot-scope="scope">
                  <div v-for="(item,index) in scope.row.dtos" :key="index">
                    <span v-if="item.roleTypeDesc == '国内报关'">{{ item.shippingCycleStr }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="航司航程" min-width="130">
                <template slot-scope="scope">
                  <div v-for="(item,index) in scope.row.dtos" :key="index">
                    <span v-if="item.roleTypeDesc == '航司航程'">{{ item.shippingCycleStr }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="航司理货" min-width="130">
                <template slot-scope="scope">
                  <div v-for="(item,index) in scope.row.dtos" :key="index">
                    <span v-if="item.roleTypeDesc == '航司理货'">{{ item.shippingCycleStr }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="海外清关" min-width="130">
                <template slot-scope="scope">
                  <div v-for="(item,index) in scope.row.dtos" :key="index">
                    <span v-if="item.roleTypeDesc == '海外清关'">{{ item.shippingCycleStr }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="代理提货" min-width="130">
                <template slot-scope="scope">
                  <div v-for="(item,index) in scope.row.dtos" :key="index">
                    <span v-if="item.roleTypeDesc == '代理提货'">{{ item.shippingCycleStr }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="代理转出" min-width="130">
                <template slot-scope="scope">
                  <div v-for="(item,index) in scope.row.dtos" :key="index">
                    <span v-if="item.roleTypeDesc == '代理转出'">{{ item.shippingCycleStr }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="末端派送" min-width="130">
                <template slot-scope="scope">
                  <div v-for="(item,index) in scope.row.dtos" :key="index">
                    <span v-if="item.roleTypeDesc == '末端派送'">{{ item.shippingCycleStr }}</span>
                  </div>
                </template>
              </el-table-column>
              <!-- <el-table-column v-for="(item, index) in tableData[0].dtos" :label="item.roleTypeDesc" min-width="110" :key="index">
                <template slot-scope="scope">
                  <span v-if="scope.row.bonded == false">{{item.shippingCycleStr}}</span>
                </template>
              </el-table-column> -->
              <el-table-column fixed="right" label="作业时间总计" width="150">
                <template slot-scope="scope">
                  <div class="red">
                    {{scope.row.setLimitation}}
                  </div>
                </template>
              </el-table-column>
            </el-table>

            <el-table v-if="bondedList.length" :data="bondedList">
              <el-table-column type="expand" fixed="left">
                <template slot-scope="scope">
                    <detail-table :scope="scope" :detailType="'bondedList'"></detail-table>
                </template>
              </el-table-column>
              <el-table-column label="取货时间" fixed="left" min-width="160">
                <template slot-scope="scope">
                  <span v-if="searchForm.startTime">{{ searchForm.startTime }}</span>
                </template>
              </el-table-column>
              <el-table-column type="expand">
                <template slot-scope="scope">
                    <detail-table :scope="scope"></detail-table>
                </template>
              </el-table-column>
              <el-table-column label="司机取货" min-width="130">
                <template slot-scope="scope">
                  <div v-for="(item,index) in scope.row.dtos" :key="index">
                    <span v-if="item.roleTypeDesc == '司机取货'">{{ item.shippingCycleStr }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="仓库配货" min-width="130">
                <template slot-scope="scope">
                  <div v-for="(item,index) in scope.row.dtos" :key="index">
                    <span v-if="item.roleTypeDesc == '仓库配货'">{{ item.shippingCycleStr }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="出库短驳" min-width="130">
                <template slot-scope="scope">
                  <div v-for="(item,index) in scope.row.dtos" :key="index">
                    <span v-if="item.roleTypeDesc == '出库短驳'">{{ item.shippingCycleStr }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="国内报关" min-width="130">
                <template slot-scope="scope">
                  <div v-for="(item,index) in scope.row.dtos" :key="index">
                    <span v-if="item.roleTypeDesc == '国内报关'">{{ item.shippingCycleStr }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="航司航程" min-width="130">
                <template slot-scope="scope">
                  <div v-for="(item,index) in scope.row.dtos" :key="index">
                    <span v-if="item.roleTypeDesc == '航司航程'">{{ item.shippingCycleStr }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="航司理货" min-width="130">
                <template slot-scope="scope">
                  <div v-for="(item,index) in scope.row.dtos" :key="index">
                    <span v-if="item.roleTypeDesc == '航司理货'">{{ item.shippingCycleStr }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="代理提货" min-width="130">
                <template slot-scope="scope">
                  <div v-for="(item,index) in scope.row.dtos" :key="index">
                    <span v-if="item.roleTypeDesc == '代理提货'">{{ item.shippingCycleStr }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="海外清关" min-width="130">
                <template slot-scope="scope">
                  <div v-for="(item,index) in scope.row.dtos" :key="index">
                    <span v-if="item.roleTypeDesc == '海外清关'">{{ item.shippingCycleStr }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="代理转出" min-width="130">
                <template slot-scope="scope">
                  <div v-for="(item,index) in scope.row.dtos" :key="index">
                    <span v-if="item.roleTypeDesc == '代理转出'">{{ item.shippingCycleStr }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="末端派送" min-width="130">
                <template slot-scope="scope">
                  <div v-for="(item,index) in scope.row.dtos" :key="index">
                    <span v-if="item.roleTypeDesc == '末端派送'">{{ item.shippingCycleStr }}</span>
                  </div>
                </template>
              </el-table-column>
              <!-- <el-table-column v-for="(item, index) in tableData[0].dtos" :label="item.roleTypeDesc" min-width="110" :key="index">
                <template slot-scope="scope">
                  <span v-if="scope.row.bonded == false">{{item.shippingCycleStr}}</span>
                </template>
              </el-table-column> -->
              <el-table-column fixed="right" label="作业时间总计" width="120">
                <template slot-scope="scope">
                  <div class="red">
                    {{scope.row.setLimitation}}
                  </div>
                </template>
              </el-table-column>
            </el-table>

            <p v-if="!noBondedList.length && !bondedList.length" class="notice-info">暂无数据(请至少搜索取货时间、出发地、目的地！)</p>
          </template>
        </div>
      </div>
    </div>

    <!-- 新建账号Modal -->
    <el-dialog title="新增服务商" :visible.sync="addlogisticsDialog" :close-on-click-modal="false" width="500px">
      <el-form :model="addlogisticsDialogForm">
        <el-form-item label="公司名称" label-width="75px">
          <el-input v-model="addlogisticsDialogForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所在地" label-width="75px">
          <el-input v-model="addlogisticsDialogForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" label-width="75px">
          <el-input v-model="addlogisticsDialogForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司logo" label-width="75px" class="form-avatar-uploader">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="avatar-uploader-tips">
            <span>Logo尺寸：300 x 300px</span>
            <span>只能上传jpg/png文件，且不超过500kb</span>
          </div>
        </el-form-item>
        <el-form-item label="服务类型" label-width="75px">
          <el-checkbox-group v-model="addlogisticsDialogForm.name">
            <el-checkbox label="司机取货"></el-checkbox>
            <el-checkbox label="仓库配货"></el-checkbox>
            <el-checkbox label="出库短驳"></el-checkbox>
            <el-checkbox label="机场短驳"></el-checkbox>
            <el-checkbox label="国内报关"></el-checkbox>
            <el-checkbox label="司机取货"></el-checkbox>
            <el-checkbox label="仓库配货"></el-checkbox>
            <el-checkbox label="出库短驳"></el-checkbox>
            <el-checkbox label="机场短驳"></el-checkbox>
            <el-checkbox label="国内报关"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addlogisticsDialog = false">确 定</el-button>
        <el-button @click="addlogisticsDialog = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import timePlanningDetail from "../components/timePlanning/timePlanningDetail";
import { mapState, mapActions} from "vuex";
export default {
  data() {
    return {
      addlogisticsDialog: false,
      changePassDialog: false,
      checkList: [],
      imageUrl: "",
      options8: [],
      addlogisticsDialogForm: {
        name: ""
      },
      sendNoLabel: '',
      deliveryNoLabel: ''
    };
  },
  components: {
    "detail-table": timePlanningDetail
  },
  computed: {
    ...mapState({
      companyOptions: state => state.timePlanning.companyOptions,
      searchForm: state => state.timePlanning.searchForm,
      noBondedList: state => state.timePlanning.noBondedList,
      bondedList: state => state.timePlanning.bondedList,

      allChineseCity: state => state.common.allChineseCity,
      alldestinationCountrie: state => state.common.alldestinationCountrie,
    })
  },
  methods: {
    ...mapActions('timePlanning',['seachCompanys','processList']),
    ...mapActions('common', [
      'getAllChineseCity',
      'getAlldestinationCountrie'
    ]),

    onSubmit(){
      if(!this.searchForm.startTime || !this.searchForm.sendNo || !this.searchForm.deliveryNo) {
        this.$notify.error({
          title: '错误',
          message: '请至少选择取货时间、出发地、目的地！'
        });
        return
      }
      this.processList();
    },
    //新建账号
    addlogistics() {
      this.addlogisticsDialog = true;
    },
    // 编辑账号
    editUserInfo() {},
    // 修改密码
    changePass() {
      this.changePassDialog = true;
    },
    // 删除
    delLogisticsics() {
      this.$confirm("确认删除该服务商吗？", "删除提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning",
        closeOnClickModal: false
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
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
    // 同时获取label和value
    sendNoChange(val) {
      let obj = {};
      obj = this.allChineseCity.find((item)=>{//这里的userList就是上面遍历的数据源
        return item.value === val;//筛选出匹配数据
      });
      this.sendNoLabel=obj.label;
    },
    deliveryNoChange(val) {
      let obj = {};
      obj = this.alldestinationCountrie.find((item)=>{//这里的userList就是上面遍历的数据源
        return item.value === val;//筛选出匹配数据
      });
      this.deliveryNoLabel=obj.label;
    }
  },
  created() {
    this.getAllChineseCity()
    this.getAlldestinationCountrie()

    this.processList()
    this.seachCompanys("A")
    this.seachCompanys("B")
    this.seachCompanys("C")
    this.seachCompanys("DF")
    this.seachCompanys("E")
    this.seachCompanys("GH")
    this.seachCompanys("I")
    this.seachCompanys("J")
    this.seachCompanys("K")
    this.seachCompanys("L")
    this.seachCompanys("MN")
  },
  mounted() {
  }
};
</script>

<style lang="scss">
@import "@assets/timePlanning/timePlanning.scss";
</style>
