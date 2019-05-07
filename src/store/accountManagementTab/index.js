import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'
import * as api from "../../lib/api";

const state = {
  searchForm:{
    "companyId": "",
    "endDate": "",
    "locationNo": "",
    "name": "",
    "pagingDto": {
      "pageNo": 1,
      "pageSize": 10
    },
    "phoneNo": "",
    "serviceType": "",
    "startDate": "",
    "wechatAccount": "",
    "wechatCity": ""
  },
  addUserForm:{
    "companyId": "",
    "name": "",
    "phoneNo": "",
    "wechatAccount": "",
    "wechatCity": "",
    "companyServiceTypeIds": []
  },
  editUserPassForm:{
    password:''
  },
  userList: [],
  pagerData: Object.assign({}, api.pagerParam)
}

export default {
	namespaced: true,
  state,
  getters,
  actions,
  mutations
}
