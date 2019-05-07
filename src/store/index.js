// import Vue from 'vue'
// import Vuex from 'vuex'
// Vue.use(Vuex)
import createPersistedState from 'vuex-persistedstate'
import common from './common'
import agingQuery from './agingQuery'
import timePlanning from './timePlanning'
import logisticsListTab from './logisticsListTab'
import accountManagementTab from './accountManagementTab'
import login from './login'
import logisticsListDetail from './logisticsListDetail'
import timeset from './timeset'

const store = new Vuex.Store({
  modules: {
    common,
    agingQuery,
    timePlanning,
    logisticsListTab,
    accountManagementTab,
    logisticsListDetail,
    login,
    timeset
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer(val) {
        return {
        // 只储存state中的user
        // common: val.common
      }
    }
  })]
});
export default store
