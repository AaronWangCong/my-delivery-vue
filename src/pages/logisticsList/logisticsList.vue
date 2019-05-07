<template>
  <div class="logisticsicsList-wrap">
    <div class="page-common logisticsicsList-wrap-account">
      <div class="page-common-head logisticsicsList-head">
        <div class="logisticsicsList-tab">
          <span :class="isTabsIndex == 1 ? 'on' : ''" @click="changeTabsIndex(1)">服务商列表</span>
          <span :class="isTabsIndex == 2 ? 'on' : ''" @click="changeTabsIndex(2)">账号管理</span>
        </div>
        <span v-if="isTabsIndex == 1" class="add-btn" @click="addServiceProvidersAct()"><i class="el-icon-plus"></i>新增服务商</span>
      </div>
      
      <div class="logisticsicsList-content page-common-content">
        <logisticsList-tab v-if="isTabsIndex == 1" ref="logisticsDialog"></logisticsList-tab>
        <accountManagement-tab v-if="isTabsIndex == 2"></accountManagement-tab>
      </div>
    </div>
  </div>
</template>

<script>
import accountManagementTab from "../../components/logisticsList/accountManagementTab";
import logisticsListTab from "../../components/logisticsList/logisticsListTab";
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      isTabsIndex: 1,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        dateTime: ""
      },
      imageUrl: "",
      checkList: [],
    };
  },
  components: {
    "logisticsList-tab": logisticsListTab,
    "accountManagement-tab": accountManagementTab
  },
  methods: {
    ...mapActions('common', [
      'getAllCompanyLocations',
      'getAllServiceTypes',
      'getAllCompanyName',
      'getAllDestinationAndCity'
    ]),
    // 切换tab页
    changeTabsIndex(val){
      this.isTabsIndex = val
    },
    //新增服务商
    addServiceProvidersAct() {
      this.$refs.logisticsDialog.addService('add');
    },
    

  },
  computed: {
    ...mapState({
      'allServiceTypes': state => state.common.allServiceTypes
    })
  },
  created() {
    this.getAllCompanyLocations()
    this.getAllServiceTypes()
    this.getAllCompanyName()
    this.getAllDestinationAndCity()
  },
  mounted() {}
};
</script>

<style lang="scss">
@import "@assets/logisticsList/logisticsList.scss";
</style>
