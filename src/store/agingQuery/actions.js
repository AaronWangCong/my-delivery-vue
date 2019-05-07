import * as api from "../../lib/api";
export default {
    async getQuerySelectDatas ({commit}) {
        let result = await api.setQuerySelectDatas();
        commit('setQuerySelectDatas', result.obj);
    },

    async searchList({state, commit}) {
        let result = await api.searchList(state.queryData);
        commit('setQueryResult', result);
    },

    async getTrackInfoList({commit}, orderId) {
        let result = await api.getTrackInfoList(orderId);
        commit('setTrackInfoData', result);
    },

    async getWarehouseSelect({commit}, orgId) {
        let result = await api.getWarehouseSelect(orgId);
        commit('setWarehouseSelect', result.obj)
    }
}
