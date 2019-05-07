import * as api from "../../lib/api";
import { Notification } from 'element-ui'
export default {
  //  搜索服务商列表
  async searchServiceList({commit,state},data) {
    let  obj  = await api.getServiceProvidersListApi(state.searchForm);
    commit('setServiceList', obj);
  },
  //  新增服务商
  async addServiceProviders({commit,state,dispatch},param) {
    let data = {
      "companyName": state.serviceProvidersForm.companyName,
      "locationName": state.serviceProvidersForm.locationName,
      "locationNo": state.serviceProvidersForm.locationNo,
      "logoPath": state.serviceProvidersForm.logoPath,
      "serviceCodes": state.serviceProvidersForm.serviceCodes
    }
    let  obj  = await api.addServiceProvidersApi(data);
    if(obj.flag){
      Notification({ title: "提示", message: '新增成功',type: 'success', });
    }
    dispatch('searchServiceList')
  },
  //  修改服务商
  async editServiceProviders({commit,state,dispatch},param) {
    let  obj  = await api.editServiceProvidersApi(state.serviceProvidersForm);
    if(obj.flag){
      Notification({ title: "提示", message: '修改成功',type: 'success', });
    }
    dispatch('searchServiceList')
  },
  //  删除服务商
  async delLogisticsicsAct({commit,state,dispatch},param) {
    let data ={
      companyId: param
    }
    let  obj  = await api.delServiceProvidersApi(data);
    if(obj.flag){
      Notification({ title: "提示", message: '删除成功',type: 'success', });
      dispatch('searchServiceList');
    }

  },
  //  上传服务商logo
  async uploadServiceProvid({commit,state},data) {
    let  obj  = await api.uploadServiceProvidApi(data);
    if(obj.flag) {
      commit('setUploadServiceProvidFile', obj);
      Notification({ title: "提示", message: '上传成功',type: 'success', });
    }
  }
}
