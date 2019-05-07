import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'

const state = {
  isCollapse: false,
  searchForm: {
    startTime: "",
    sendNo: "",
    deliveryNo: "",
    companyA: "",
    companyB: "",
    companyC: "",
    companyDF: "",
    companyGH: "",
    firstFlightNo: "",
    companyK: "",
    companyJ: "",
    companyMN: "",
  },
  companyOptions: {
    companyAoptions: [],  //  司机取货1
    companyBoptions: [],  //  仓库配货
    companyCoptions: [],  //  出库短驳1
    companyDFoptions: [], //  国内报关1
    companyEoptions: [],  //  机场短驳1
    companyGHoptions: [], //  航司航程1
    companyIoptions: [],  //  航司理货
    companyJoptions: [],  //  海外清关1
    companyKoptions: [],  //  代理提货1
    companyLoptions: [],  //  代理转出
    companyMNoptions: [], //  末端派送1
  },
  noBondedList: [],
  bondedList: []
}

export default {
	namespaced: true,
  state,
  getters,
  actions,
  mutations
}
