import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'
import * as api from "../../lib/api";

const state = {
  searchForm: {
    "companyId": "",
    "endDate": "",
    "companyServiceTypeId": "",
    "pagingDto": {
      "pageNo": 1,
      "pageSize": 10
    },
    "startDate": ""
  },
  setWorkTimeDialogForm: {
    "companyId": "",
    "companyServiceTypeId": "",
    "timeZone": "",
    "timeZoneCn": "",
    "workingTimes": []
  },
  timesetInfo: [],
  serviceTimesetInfo: [],
  pagerData: Object.assign({}, api.pagerParam),
}

export default {
	namespaced: true,
  state,
  getters,
  actions,
  mutations
}
