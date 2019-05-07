import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'

const state = {
  isCollapse: false,
  allCompanyName: [], //  获取所有公司名称
  allCompanyLocations: [], // 获取所有公司所在地
  allDestinationAndCity: [], // 获取所有目的国和中国城市
  allChineseCity: [], //  获取所有中国城市
  alldestinationCountrie: [], //  获取所有目的国家
  allServiceTypes: [], // 获取所有服务类型
  companyServiceTypes: [],  // 获取某个公司服务类型
  allTimeZon: [] ,  // 获取所有时区类型
}

export default {
	namespaced: true,
  state,
  getters,
  actions,
  mutations
}
