<template>
  <div class="agingQuery-wrap">
    <div class="agingQuery-wrap-account page-common">
      <div class="agingQuery-head page-common-head">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>时效查询</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      
      <div class="agingQuery-content page-common-content">
        <div class="agingQuery-content-form search-form">
          <el-form :model="queryData" ref="ruleForm">
            <div>
              <el-form-item label="平台类型" :label-width="labelWidth">
                <el-select v-model="queryData.systemType" clearable filterable placeholder="请选择">
                  <el-option
                    v-for="(item, key) in querySelectDatas.systemTypeMap"
                    :key="key"
                    :label="item"
                    :value="key">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="组织名称" :label-width="labelWidth">
                <el-select v-model="queryData.organizationId" @change="changeOrganization" clearable filterable placeholder="请选择">
                  <el-option
                    v-for="(item, key) in querySelectDatas.organizationMap"
                    :key="key"
                    :label="item"
                    :value="key">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="分公司" :label-width="labelWidth">
                <el-select v-model="queryData.warehouseId" :disabled="disabledSelect" clearable filterable placeholder="请选择">
                  <el-option
                    v-for="(item, key) in warehouseListMap"
                    :key="key"
                    :label="item"
                    :value="key">
                  </el-option> 
                </el-select>
              </el-form-item>
              <el-form-item label="出发地" :label-width="labelWidth">
                <el-select v-model="queryData.originName" clearable filterable placeholder="请选择">
                  <el-option
                    v-for="orginName in querySelectDatas.orginNameList"
                    :key="orginName"
                    :label="orginName"
                    :value="orginName">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="目的地" :label-width="labelWidth">
                <el-select v-model="queryData.destinationName" clearable filterable placeholder="请选择">
                  <el-option
                    v-for="destination in querySelectDatas.destinationList"
                    :key="destination"
                    :label="destination"
                    :value="destination">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="产品名称" :label-width="labelWidth">
                <el-select v-model="queryData.productId" clearable filterable placeholder="请选择">
                  <el-option
                    v-for="(item, key) in querySelectDatas.productMap"
                    :key="key"
                    :label="item"
                    :value="key">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="航班" :label-width="labelWidth">
                <el-select v-model="queryData.flightNo" clearable filterable placeholder="请选择">
                  <el-option
                    v-for="flightNo in querySelectDatas.flightNoList"
                    :key="flightNo"
                    :label="flightNo"
                    :value="flightNo">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="代理商" :label-width="labelWidth">
                <el-select v-model="queryData.agentName" clearable filterable placeholder="请选择">
                  <el-option
                    v-for="logisticsSupplyCompany in querySelectDatas.logisticsSupplyCompanyList"
                    :key="logisticsSupplyCompany"
                    :label="logisticsSupplyCompany"
                    :value="logisticsSupplyCompany">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="派送商" :label-width="labelWidth">
                <el-select v-model="queryData.deliveryCompany" clearable filterable placeholder="请选择">
                  <el-option
                    v-for="deliveryCompany in querySelectDatas.deliveryCompanyList"
                    :key="deliveryCompany"
                    :label="deliveryCompany"
                    :value="deliveryCompany">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="出库短驳公司" :label-width="labelWidth">
                <el-select v-model="queryData.warehouseShortBargeCompanyId" clearable filterable placeholder="请选择">
                  <el-option
                    v-for="(item, key) in querySelectDatas.warehouseShortBargeCompanyMap"
                    :key="key"
                    :label="item"
                    :value="key">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="机场短驳公司" :label-width="labelWidth">
                <el-select v-model="queryData.airportShortBargeCompanyId" clearable filterable placeholder="请选择">
                  <el-option
                    v-for="(item, key) in querySelectDatas.airportShortBargeCompanyMap"
                    :key="key"
                    :label="item"
                    :value="key">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="国内报关公司" :label-width="labelWidth">
                <el-select v-model="queryData.declarationCompanyId" clearable filterable placeholder="请选择">
                  <el-option
                    v-for="(item, key) in querySelectDatas.declarationCompanyMap"
                    :key="key"
                    :label="item"
                    :value="key">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="航空公司" :label-width="labelWidth">
                <el-select v-model="queryData.airlineCompanyId" clearable filterable placeholder="请选择">
                  <el-option
                    v-for="(item, key) in querySelectDatas.airlineCompanyMap"
                    :key="key"
                    :label="item"
                    :value="key">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="海外清关公司" :label-width="labelWidth">
                <el-select v-model="queryData.clearanceCompanyId" clearable filterable placeholder="请选择">
                  <el-option
                    v-for="(item, key) in querySelectDatas.clearanceCompanyMap"
                    :key="key"
                    :label="item"
                    :value="key">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="客户" :label-width="labelWidth">
                <el-select v-model="queryData.customerId" clearable filterable placeholder="请选择">
                  <el-option
                    v-for="(item, key) in querySelectDatas.customerMap"
                    :key="key"
                    :label="item"
                    :value="key">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="主单号" :label-width="labelWidth" class="width370">
                <el-input v-model="queryData.aviaOrderNo" clearable autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="订单号" :label-width="labelWidth" class="width370">
                <el-input v-model="queryData.insideNumber" clearable autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="追踪单号" :label-width="labelWidth" class="width370">
                <el-input v-model="queryData.deliveryNumber" clearable autocomplete="off"></el-input>
              </el-form-item>
            </div>

            <div>
              <el-form-item label="下单时间" :label-width="labelWidth">
                <el-date-picker
                  v-model="dateTime"
                  type="daterange"
                  range-separator="-"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间">
                </el-date-picker>
              </el-form-item>
              <el-form-item label-width="70px" class="search-form-btn">
                <span class="add-btn" @click="searchByPage(1, pagerData.pageSize)">搜索</span>
                <span class="add-btn" @click="resetForm()">重置</span>
              </el-form-item>
            </div>

            <div>
              <el-form-item label="服务类型:" label-width="80px">
                <el-radio v-model="serviceType" @change="changeServiceType"
                  v-for="(item, key) in serviceTypes" 
                  :label="key"
                  :key="key">{{item}}
                </el-radio>
              </el-form-item>
            </div>
              
            <div>
              <el-form-item label="订单状态:" label-width="80px" class="width370">
                <el-checkbox-group
                  v-model="queryData.orderStatusEnumList"
                >
                  <el-checkbox-button
                    v-for="(item, key) in querySelectDatas.orderStatusMap"
                    @change="changeOrderStatus"
                    :label="key"
                    :key="key"
                  >{{ item }}
                  </el-checkbox-button>
                </el-checkbox-group>
              </el-form-item>
            </div>

            <div>
              <el-form-item label="时效状态:" label-width="80px">
                <el-radio v-model="agingAbnormal" @change="fnChangeAgingStatus" label="1">所有</el-radio>
                <el-radio v-model="agingAbnormal" @change="fnChangeAgingStatus" label="2">正常</el-radio>
                <el-radio v-model="agingAbnormal" @change="fnChangeAgingStatus" label="3">异常</el-radio>
              </el-form-item>
            </div>
          </el-form>
        </div>

        <div class="agingQuery-content-table">
          <template>
            <el-table :data="orderTimelineList" style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="scope">
                    <detail-table :scope="scope"></detail-table>
                </template>
              </el-table-column>
              <el-table-column prop="orderCreatedTime" label="下单时间" min-width="160"></el-table-column>
              <el-table-column prop="customerName" label="客户名称" min-width="160"></el-table-column>
              <el-table-column prop="organizationName" label="组织" min-width="80"></el-table-column>
              <el-table-column prop="systemTypeDesc" label="平台类型" min-width="80"></el-table-column>
              <el-table-column prop="warehouseName" label="分公司" min-width="95"></el-table-column>
              <el-table-column prop="originName" label="出发地" min-width="64"></el-table-column>
              <el-table-column prop="destinationName" label="目的地" min-width="64"></el-table-column>
              <el-table-column prop="productName" label="产品名称" min-width="120"></el-table-column>
              <el-table-column prop="aviaOrderNo" label="主单号" min-width="130"></el-table-column>
              <el-table-column prop="insideNumber" label="订单号" min-width="170"></el-table-column>
              <el-table-column prop="flightNo" label="航班" min-width="80"></el-table-column>
              <el-table-column prop="actualWeight" label="实重" min-width="75"></el-table-column>
              <el-table-column prop="deliveryNumber" label="追踪单号" min-width="160"></el-table-column>
              <el-table-column fixed="right" prop="orderStatusDesc" label="订单状态" min-width="80"></el-table-column>
            </el-table>
          </template>
        </div>
        <pagination :pagerData="pagerData" @onSearch="searchByPage"></pagination>
      </div>
    </div>
  </div>
</template>

<script>
import agingQueryDetail from "../components/agingQuery/agingQueryDetail";
import { mapState, mapMutations, mapActions } from 'vuex'
import pagination from '../components/common/Pagination.vue'
export default {
  data() {
    return {
      labelWidth: '130px',
      addlogisticsDialog: false,
      changePassDialog: false,
      imageUrl: "",
      dateTime: [],
      serviceType: '',
      serviceStatus: '',
      agingAbnormal: 1,
      disabledSelect: true,
    };
  },
  components: {
    "detail-table": agingQueryDetail,
    "pagination": pagination
  },
  methods: {
    ...mapActions('agingQuery', [
      'getQuerySelectDatas',
      'searchList',
      'getWarehouseSelect'
    ]),
    ...mapMutations('agingQuery', [
      'setPageData',
      'setOrderStatusByServiceType',
      'changeAgingStatus',
      'setWarehouseSelect',
      'resetFormData'
    ]),
    //分页查询
    searchByPage(pageNo, pageSize) {
      this.setPageData({
        pageNo: pageNo,
        pageSize: pageSize
      });

      this.search();
    },
    search() {
      this.searchList();
    },
    //切换服务类型
    changeServiceType(serviceType) {
      (async() => {
        await this.setOrderStatusByServiceType(serviceType);
        await this.search();
      })()
    },
    //切换订单状态
    changeOrderStatus(orderStatus) {
      //清空服务类型选择的radio
      this.serviceType = '';
      this.search();
    },
    //切换时效异常状态
    fnChangeAgingStatus(agingStatus) {
      (async() => {
        await this.changeAgingStatus(agingStatus);
        await this.search();
      })()
    },
    //切换组织
    changeOrganization(orgId) {
      this.queryData.warehouseId = '';
      if (orgId == '') {
        this.disabledSelect = true;
        this.setWarehouseSelect({});
      } else {
        this.disabledSelect = false;
        this.getWarehouseSelect(orgId);
      }
    },
    resetForm() {
      this.resetFormData();
      this.serviceType = '';

      this.searchByPage(1, this.pagerData.pageSize)
    }
  },
  computed: {
    ...mapState({
      'querySelectDatas': state => state.agingQuery.querySelectDatas,
      'serviceTypes': state => state.agingQuery.serviceTypes,
      'queryData': state => state.agingQuery.queryData,
      'pagerData': state => state.agingQuery.pagerData,
      'orderTimelineList': state => state.agingQuery.orderTimelineList,
      'warehouseListMap': state => state.agingQuery.warehouseListMap,
    })
  },
  created() {
    this.getQuerySelectDatas();
  },
  mounted() {
    this.searchList();
  }
};
</script>

<style lang="scss">
@import "@assets/agingQuery/agingQuery.scss";
</style>
