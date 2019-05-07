export default {
  // 设置是否登
  setLoginStatus(state, payload) {
    state.isLogin = payload.isLogin;
  },

  setLoginUser(state, payload) {
    if(payload){
        state.loginUser = payload.customer;
    }
  },
}
