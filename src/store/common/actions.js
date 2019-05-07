import * as api from "../../lib/api";
export default {
  //  获取所有公司名称
  async getAllCompanyName({commit,state},data) {
    let  obj  = await api.getAllCompanyNameApi();
    commit('setAllCompanyName', obj);
  },
  //  获取所有公司所在地
  async getAllCompanyLocations({commit,state},data) {
    let  obj  = await api.getAllCompanyLocationsApi();
    commit('setAllCompanyLocations', obj);
  },
  //  获取所有目的国和中国城市
  async getAllDestinationAndCity({commit,state},data) {
    let  obj  = await api.getAllDestinationAndCityApi();
    commit('setAllDestinationAndCity', obj);
  },
  //  获取所有中国城市
  async getAllChineseCity({commit,state},data) {
    let  obj  = await api.getAllChineseCityApi();
    commit('setAllChineseCity', obj);
  },
  //  获取所有目的国家
  async getAlldestinationCountrie({commit,state},data) {
    let  obj  = await api.getAlldestinationCountrieApi();
    commit('setAlldestinationCountrie', obj);
  },
  //  获取所有服务类型
  async getAllServiceTypes({commit,state},data) {
    let  obj  = await api.getAllServiceTypesApi();
    commit('setAllServiceTypes', obj);
  },
  //  获取某个公司服务类型
  async getCompanyServiceTypes({commit,state},data) {
    let  obj  = await api.getCompanyServiceTypesApi(data);
    commit('setCompanyServiceTypes', obj);
  },
  //  获取所有时区类型
  async getAllTimeZon({commit,state},data) {
    let  obj  = await api.getAllTimeZonApi();
    commit('setAllTimeZon', obj);
  }
}
