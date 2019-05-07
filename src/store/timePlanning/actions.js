import { seachCompanysApi,processListApi, getLabelModelListApi } from "../../lib/api";
export default {
// 获取查询选择列表
  async seachCompanys({commit,state},param) {
    let data ={
      roleTypeEnum:param
    }
    let  obj  = await seachCompanysApi(data);
    switch (data.roleTypeEnum) {
      //  司机取货
      case "A": commit('setCompanyA', obj);break;
      //  仓库配货
      case "B": commit('setCompanyB', obj);break;
      //  出库短驳
      case "C": commit('setCompanyC', obj);break;
      //  国内报关
      case "DF": commit('setCompanyDF', obj);break;
      //  机场短驳
      case "E": commit('setCompanyE', obj);break;
      //  航司航程
      case "GH": commit('setCompanyGH', obj);break;
      //  航司理货
      case "I": commit('setCompanyI', obj);break;
      //  海外清关
      case "J": commit('setCompanyJ', obj);break;
      //  代理提货
      case "K": commit('setCompanyK', obj);break;
      //  代理转出
      case "L": commit('setCompanyL', obj);break;
      //  末端派送
      case "MN": commit('setCompanyMN', obj);break;
    }
  },
// 获取时效路线
  async processList({commit,state},data) {
    let  obj  = await processListApi(state.searchForm);
     commit('seachCompanysVal', obj);
  }
}
