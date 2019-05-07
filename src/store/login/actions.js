import * as api from "../../lib/api";
import router from '../../router';
import { Notification } from 'element-ui'
export default {
    //  登录
    async userLogin ({commit}, loginForm) {
        let result = await api.userLogin(loginForm);
        if(result.flag){
            router.replace({ path: "/home" });
        }else{
            Notification({ title: "提示", message: result.msg,type: 'error', });
        }
    },
    //  退出
    logout: ({ commit, dispatch }) => {
        axios.get(api.authorBackEnd + "/logout").then(response => {
            Notification({ title: "提示", message: "退出成功！",type: 'success', });
            router.replace({ path: "/login" });
        }).catch(response => {
            // 302 跳转被catch
            router.replace({ path: "/login" });
        });
    }
}
