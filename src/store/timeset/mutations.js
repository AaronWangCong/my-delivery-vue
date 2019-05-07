export default {
  setTimeSetInfo (state, data) {
    state.timesetInfo = data.rows
    state.pagerData.pageTotal = data.total;
  },
  setServiceTimeSet (state, data) {
    state.serviceTimesetInfo = data.rows
  },
  setPageData(state, data) {
    state.searchForm.pagingDto.pageNo = data.pageNo;
    state.searchForm.pagingDto.pageSize = data.pageSize;
  },
  resetServiceProvidersForm(state, data) {
    state.serviceProvidersForm = {
      "companyId": "",
      "companyName": "",
      "file": [],
      "locationName": "",
      "locationNo": "",
      "serviceType": []
    }
  },
}
