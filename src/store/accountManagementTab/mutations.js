export default {
  setUserListApi(state, data) {
    state.userList = data.rows
    state.pagerData.pageTotal = data.total;
  },
  setPageData(state, data) {
    state.searchForm.pagingDto.pageNo = data.pageNo;
    state.searchForm.pagingDto.pageSize = data.pageSize;
  },
}
