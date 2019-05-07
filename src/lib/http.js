import axios from 'axios'
import qs from 'qs'
import { Loading } from 'element-ui'

export default (url = '', data = {}, type = 'GET', contentType) => {
  // application/x-www-form-urlencoded;charset=UTF-8   和  multipart/form-data 两种特殊contentType需在api.js定义
  return new Promise((resolve, reject) => {
    // var loadingInstance = Loading.service({
    //   lock: true,
    //   text: '正在加载...',
    //   spinner: 'el-icon-loading',
    //   background: 'rgba(0, 0, 0, 0.3)',
    //   customClass:"axios-loading",
    //   fullscreen: true 
    // })

    let requestConfig = {
      method: type,
      url: url,
      headers: {
        'Accept': 'application/json',
        'Content-Type': contentType ? contentType : 'application/json'
      },
      timeout: 10000
    };

    switch (type.toUpperCase()) {
      case "GET":
        requestConfig.params = data;
        requestConfig.paramsSerializer = params => {
          return qs.stringify(params, { indices: false })
        };
        break;
      case "DELETE": requestConfig.params = data; break;
      case "POST": requestConfig.data = data; break;
      case "PUT": requestConfig.data = data; break;
    }

    axios(requestConfig).then((resp) => {
      // setTimeout(function(){
      //   loadingInstance.close();
      // }, 100);
      resolve(resp.data);
    }).catch((err) => {
      // setTimeout(function(){ 
      //   loadingInstance.close();
      // }, 100);
      reject(err);
    })
  });
}
