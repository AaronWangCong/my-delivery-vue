// import Vue from 'vue'
import App from './App'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // 这个样式必须引入
import { filters } from "./lib/filters";
filters();
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

import './assets/css/style.scss';
import './assets/css/reset.css';

// Vue.use(ElementUI)
import vuePicturePreview from 'vue-picture-preview'
Vue.use(vuePicturePreview)

axios.interceptors.response.use(
  response => {
    if(!response.data.flag && response.data.msg == "LOGIN_FAILED"){
      //没有权限，或登录失败
      var query = {};
      var currentPath = router.currentRoute.fullPath;
      if(currentPath.indexOf("redirect") == -1 && currentPath.indexOf("/login") == -1){
        query = {
          redirect: currentPath
        }
      }
      router.replace({
        path: '/login',
        query: query  //  登录成功后跳入浏览的当前页面
      })
    }
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          ELEMENT.Notification({
            type: 'error',
            title : "参数错误",
            message : error.response.data.msg
          });
          break;
        case 404:
          if(error.response.config && error.response.config.url && error.response.config.url.indexOf("/logout") != -1){
          }else{
            ELEMENT.Notification({
              type: 'error',
              title : "请求异常",
              message : "服务器内部错误：" + error.response.status
            });
          }
          break;
        case 500:
          if(error.response.data && error.response.data.message){
            ELEMENT.Notification({
              type: '',
              title : "",
              message : error.response.data.message
            });
          }else{
            ELEMENT.Notification({
              type: 'error',
              title : "请求异常",
              message : "服务器内部错误：" + error.response.status
            });
          }
          break;
        default :
          ELEMENT.Notification({
            type: 'error',
            title : "请求异常",
            message : "服务器内部错误：" + error.response.status
          });
      }
    }else{
      ELEMENT.Notification({
        type: 'error',
        title : "请求异常",
        message : "服务器内部错误"
      });
    }
    return Promise.reject(error);
  });

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
