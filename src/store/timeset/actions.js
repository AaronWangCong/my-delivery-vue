import * as api from "../../lib/api";
import { Notification } from 'element-ui'
export default {
  //  搜索时间列表
  async getTimeSetInfo({commit,state},data) {
    let  obj  = await api.getTimeSetApi(state.searchForm);
    commit('setTimeSetInfo', obj);
  },
  //  根据服务id查询服务商时间
  async getServiceTimeSet({commit,state},param) {
    let data = {
      companyServiceTypeId: param
    }
    let  obj  = await api.getServiceTimeSetApi(data);
    commit('setServiceTimeSet', obj);
  },
  //  新增时间
  async addTimeSetInfo({commit,state,dispatch},data) {
    let  obj  = await api.addTimeSetApi(state.setWorkTimeDialogForm);
    if(obj.flag){
      Notification({ title: "提示", message: '新增成功',type: 'success', });
      dispatch('getTimeSetInfo');
    }
  },
  //  修改时间
  async editTimeSetInfo({commit,state,dispatch},param) {
    let  obj  = await api.editTimeSetInfoApi(state.setWorkTimeDialogForm);
    if(obj.flag){
      Notification({ title: "提示", message: '修改成功',type: 'success', });
      dispatch('getTimeSetInfo');
    }
  },
  //  删除时间
  async delLogisticsicsAct({commit,state,dispatch},param) {
    let data ={
      companyId: param
    }
    let  obj  = await api.delServiceProvidersApi(data);
    if(obj.flag){
      Notification({ title: "提示", message: '删除成功',type: 'success', });
      dispatch('getTimeSetInfo');
    }

  },
}
