import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'

const state = {
  setLimitationForm: {
    "companyName": "",
    "companyId": "",
    "serviceName": "",
    "originCode": "",
    "companyServiceTypeId": "",
    "maxShippingCycle": 0,
    "minShippingCycle": 0,
    "timeType": "DAY"
  },
  servicesInfo: []
}

export default {
	namespaced: true,
  state,
  getters,
  actions,
  mutations
}
