<template>
  <div class="logisticsListDetail-wrap">
    <template>
      <el-table :data="servicesInfo" style="width: 100%">
        <el-table-column prop="serviceName" label="服务类型" min-width="160"></el-table-column>
        <el-table-column label="参考时效" min-width="76">
          <template slot-scope="scope">
            {{ scope.row.minShippingCycle }} - {{ scope.row.maxShippingCycle }}
            <span v-if="scope.row.timeType == 'DAY'">天</span>
            <span v-if="scope.row.timeType == 'HOUR'">小时</span>
            <span v-if="scope.row.timeType == 'MINUTE'">分钟</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="operate">
              <span class="operate-btn" @click="setLimitation(scope.row)">设置时效</span>
              <span v-if="scope.row.shippingCycleId" class="operate-btn" @click="delLimitationModal(scope.row)">删除</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!-- 设置时效 -->
    <el-dialog title="设置时效" :visible.sync="setLimitationDialog" :close-on-click-modal="false" width="480px">
      <el-form :model="setLimitationForm">
        <el-form-item label="公司名称" label-width="75px">
          <span>{{ setLimitationForm.companyName }}</span>
        </el-form-item>
        <el-form-item v-if="setLimitationForm.serviceName !== '航司航程' && setLimitationForm.serviceName !== '航司理货' && setLimitationForm.serviceName !== '末端派送'" :label="setLimitationForm.serviceName" label-width="75px" class="set-limitation">
          <el-input type="number" v-model="setLimitationForm.minShippingCycle"></el-input>
          <span class="line">——</span>
          <el-input type="number" v-model="setLimitationForm.maxShippingCycle"></el-input>
          <el-select v-model="setLimitationForm.timeType" placeholder="请选择">
            <el-option
              v-for="item in timeTypeInfo"
              :key="item.value"
              :label="item.label"
              :value="item.vlaue">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-else :label="setLimitationForm.serviceName" label-width="75px" class="upload-limitation">
          <input :value="filename" type="text" readonly placeholder="文件名">
          <el-upload
            :http-request="uploadChange"
            :before-upload="beforeUpload"
            :multiple="false"
            :show-file-list="false"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            action="/"
          >
            <el-button size="small" type="primary">上传</el-button>
          </el-upload>
          <span class="text">下载模板</span>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="setLimitationDialogConfirm()">确 定</el-button>
        <el-button @click="setLimitationDialog = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: "",
  components: {},
  props: {
    scope: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      setLimitationDialog: false,
      timeTypeInfo: [{label: '分钟', vlaue: 'MINUTE'},{label: '小时', vlaue: 'HOUR'},{label: '天', vlaue: 'DAY'}],
      filename: "",
      uploadFile: {},
      servicesInfo: []
    };
  },
  computed: {
    ...mapState({
      'setLimitationForm': state => state.logisticsListDetail.setLimitationForm
    })
  },
  methods: {
    ...mapActions('logisticsListDetail', [
      'uploadLimitationTemplate',
      'delLimitation',
      'setLimitationAct'
    ]),
    ...mapMutations('logisticsListDetail', [
      'setServicesInfo',
    ]),
    // 设置时效
    setLimitation(row){
      this.setLimitationForm.companyName = this.scope.row.companyName
      this.setLimitationForm.companyId = this.scope.row.id
      this.setLimitationForm.serviceName = row.serviceName
      this.setLimitationForm.originCode = this.scope.row.locationNo
      this.setLimitationForm.companyServiceTypeId = row.companyServiceTypeId
      this.setLimitationForm.maxShippingCycle = row.maxShippingCycle
      this.setLimitationForm.minShippingCycle = row.minShippingCycle
      this.setLimitationForm.timeType = row.timeType
      
      this.setLimitationDialog = true
    },
    // 设置时效==确认
    setLimitationDialogConfirm(){
      if(this.setLimitationForm.serviceName !== '航司航程' && this.setLimitationForm.serviceName !== '航司理货' && this.setLimitationForm.serviceName !== '末端派送') {
        if(!this.setLimitationForm.maxShippingCycle || !this.setLimitationForm.minShippingCycle || !this.setLimitationForm.timeType) {
          this.$notify.error({
            title: '错误',
            message: '最小时效、最大时效、时效单位不能为空！'
          });
          return
        }else{
          this.setLimitationAct()
          this.setLimitationDialog = false

          for(let i = 0; i < this.servicesInfo.length; i++) {
            if(this.servicesInfo[i].companyServiceTypeId == this.setLimitationForm.companyServiceTypeId) {
              this.servicesInfo[i].maxShippingCycle = this.setLimitationForm.maxShippingCycle
              this.servicesInfo[i].minShippingCycle = this.setLimitationForm.minShippingCycle
              this.servicesInfo[i].timeType = this.setLimitationForm.timeType
            }
          }
        }
      }else{
        let fd = new FormData;
        fd.append('file', this.uploadFile);
        fd.append('companyId',this.scope.row.id);
        fd.append('companyName',this.scope.row.companyName);
        fd.append('companyServiceTypeId',this.setLimitationForm.companyServiceTypeId);
        this.uploadLimitationTemplate(fd)
        this.setLimitationDialog = false
      }
    },
    delLimitationModal(row){
      console.log(row)
      this.$confirm('确定删除该时效记录吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          shippingCycleId: row.shippingCycleId
        }
        this.delLimitation(data)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    beforeUpload(file){
      // return parseExcel(file);
    },
    // 上传时效模板
    uploadChange(data) {
      this.filename = data.file.name;
      this.uploadFile = data.file
    }
  },
  created() {},
  mounted() {
    this.servicesInfo = this.scope.row.services
  }
};
</script>
<style lang="scss">
</style>