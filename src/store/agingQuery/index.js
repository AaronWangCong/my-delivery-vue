import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'

import * as api from "../../lib/api";

const state = {
  querySelectDatas: {
    destinationList: [],
    deliveryCompanyList: [],
    warehouseShortBargeCompanyMap: {},
    clearanceCompanyMap: {},
    declarationCompanyMap: {},
    roleTypeMap: {},
    orginNameList: [],
    productMap: {},
    airlineCompanyMap: {},
    airportShortBargeCompanyMap: {},
    organizationMap: {},
    logisticsSupplyCompanyList: [],
    flightNoList: [],
    customerMap: {},
    orderStatusMap: {},
    systemTypeMap: {}
  },
  serviceTypes: {},
  serviceTypeOrderStatus: {},
  pagerData: Object.assign({}, api.pagerParam),
  queryData: {
    organizationId: '',
    systemType: null,
    warehouseId: '',
    originName: '',
    destinationName: '',
    productId: '',
    flightNo: '',
    agentName: '',
    deliveryCompany: '',
    warehouseShortBargeCompanyId: '',
    airportShortBargeCompanyId: '',
    declarationCompanyId: '',
    airlineCompanyId: '',
    clearanceCompanyId: '',
    customerId: '',
    aviaOrderNo: '',
    insideNumber: '',
    deliveryNumber: '',
    orderCreatedTimeStart: '',
    orderCreatedTimeEnd: '',
    orderStatusEnumList: [],
    pagingDto: {
      pageNo: api.pagerParam.pageNo,
      pageSize: api.pagerParam.pageSize
    },
    agingAbnormal: null
  },
  orderTimelineList: [],
  warehouseListMap: {},

  trackInfoList: [],
  workUserdTimeMsg: '',
  serviceUsedTimeMsg: '',
}

export default {
	namespaced: true,
  state,
  getters,
  actions,
  mutations
}
