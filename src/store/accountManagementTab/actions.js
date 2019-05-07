import * as api from "../../lib/api";
import { Notification } from 'element-ui'
export default {
    //  搜索账号列表
    async searchUserList({commit,state},data) {
      let  obj  = await api.getUserListApi(state.searchForm);
      commit('setUserListApi', obj);
    },
    //  新增/修改用户
    async addAndEditUserInfo({commit,state,dispatch},param) {
      if(param){
        let data = {
          companyUserId:param,
          name: state.addUserForm.name,
          phoneNo: state.addUserForm.phoneNo,
          companyServiceTypeIds: state.addUserForm.companyServiceTypeIds,
          wechatAccount: state.addUserForm.wechatAccount,
          wechatCity: state.addUserForm.wechatCity
        }
        let  obj  = await api.editUserApi(data);
        if(obj){
          Notification({ title: "提示", message: '修改成功',type: 'success', });
        }
      }else{
        let  obj  = await api.addUserApi(state.addUserForm);
        if(obj.flag){
          Notification({ title: "提示", message: '新增成功',type: 'success', });
        }
      }
      dispatch('searchUserList');
    },
    //  删除用户
    async delUserInfo({commit,state,dispatch},param) {
      let data ={
        companyUserId: param
      }
      let  obj  = await api.delUserApi(data);
      if(obj.flag){
        Notification({ title: "提示", message: '删除成功',type: 'success', });
        dispatch('searchUserList');
      }
  
    },
}
