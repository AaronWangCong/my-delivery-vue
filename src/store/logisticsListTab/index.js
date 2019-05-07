import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'
import * as api from "../../lib/api";

const state = {
  searchForm: {
    "companyName": "",
    "locationNo": "",
    "serviceType": "",
    "startDate": "",
    "endDate": "",
    "pagingDto": {
      "pageNo": 1,
      "pageSize": 10
    }
  },
  serviceProvidersForm: {
    "companyId": "",
    "companyName": "",
    "locationName": "",
    "locationNo": "",
    "logoPath": "",
    "serviceCodes": []
  },
  serviceProviderList: [],
  uploadServiceProvidFile: {},
  pagerData: Object.assign({}, api.pagerParam),
}

export default {
	namespaced: true,
  state,
  getters,
  actions,
  mutations
}
