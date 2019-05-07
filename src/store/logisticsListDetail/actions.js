import * as api from "../../lib/api";
import { Notification } from 'element-ui'
export default {
  //  上传时效模板
  async uploadLimitationTemplate({commit,state,dispatch,rootState},data) {
    let  obj  = await api.uploadLimitationTemplateApi(data);
    if(obj.flag){
      Notification({ title: "提示", message: '上传成功',type: 'success', });
      dispatch('logisticsListTab/searchServiceList', {}, {root: true}) // 调用其他模块的 actions
    }
  },
  //  删除时效
  async delLimitation({commit,state,dispatch,rootState},data) {
    let  obj  = await api.delLimitationApi(data);
    if(obj.flag){
      Notification({ title: "提示", message: '删除成功',type: 'success', });
      dispatch('logisticsListTab/searchServiceList', {}, {root: true}) // 调用其他模块的 actions
    }
  },
  //  设置时效
  async setLimitationAct({commit,state,dispatch,rootState},param) {
    let data = {
      "companyId": state.setLimitationForm.companyId,
      "companyServiceTypeId": state.setLimitationForm.companyServiceTypeId,
      "originCode": state.setLimitationForm.originCode,
      "maxShippingCycle": state.setLimitationForm.maxShippingCycle,
      "minShippingCycle": state.setLimitationForm.minShippingCycle,
      "timeType": state.setLimitationForm.timeType
    }
    let  obj  = await api.setLimitationApi(data);
    if(obj.flag){
      Notification({ title: "提示", message: '设置成功',type: 'success', })
      dispatch('logisticsListTab/searchServiceList', {}, {root: true}) // 调用其他模块的 actions
    }
  },
}
