export default {
  setServiceList (state, data) {
    state.serviceProviderList = data.rows
    state.pagerData.pageTotal = data.total;
  },
  setPageData(state, data) {
    state.searchForm.pagingDto.pageNo = data.pageNo;
    state.searchForm.pagingDto.pageSize = data.pageSize;
  },
  setUploadServiceProvidFile(state, data) {
    state.uploadServiceProvidFile = data.obj
    state.serviceProvidersForm.logoPath = data.obj.downloadPath;
  },
  resetServiceProvidersForm(state, data) {
    state.serviceProvidersForm = {
      "companyId": "",
      "companyName": "",
      "locationName": "",
      "locationNo": "",
      "logoPath": "",
      "serviceCodes": []
    }
  },
}
