export default {
  setQuerySelectDatas (state, data) {
    state.querySelectDatas = data;
    for(var serviceType in data.roleTypeMap){
      var serviceTypeArr = serviceType.split('-');
      state.serviceTypes[serviceTypeArr[0]] = serviceTypeArr[1];
      state.serviceTypeOrderStatus[serviceTypeArr[0]] = data.roleTypeMap[serviceType];
    }
  },

  setQueryResult(state, data) {
    state.orderTimelineList = data.rows;
    state.pagerData.pageTotal = data.total;
  },

  setPageData(state, data) {
    state.queryData.pagingDto.pageNo = data.pageNo;
    state.queryData.pagingDto.pageSize = data.pageSize;
  },

  setOrderStatusByServiceType(state, data) {
    state.queryData.orderStatusEnumList = state.serviceTypeOrderStatus[data];
  },

  changeAgingStatus(state, data) {
    if (data == 1) {
      state.queryData.agingAbnormal = null;
    } else if (data == 2) {
      state.queryData.agingAbnormal = false;
    } else if (data == 3) {
      state.queryData.agingAbnormal = true;
    }
  },

  setTrackInfoData(state, data) {
    state.trackInfoList = data.rows;
    state.workUserdTimeMsg = data.code;
    state.serviceUsedTimeMsg = data.msg;
  },

  setWarehouseSelect(state, data) {
    state.warehouseListMap = data;
  },

  resetFormData(state, data) {
    state.queryData = {
      organizationId: '',
      systemType: null,
      warehouseId: '',
      originName: '',
      destinationName: '',
      productId: '',
      flightNo: '',
      agentName: '',
      deliveryCompany: '',
      warehouseShortBargeCompanyId: '',
      airportShortBargeCompanyId: '',
      declarationCompanyId: '',
      airlineCompanyId: '',
      clearanceCompanyId: '',
      customerId: '',
      aviaOrderNo: '',
      insideNumber: '',
      deliveryNumber: '',
      orderCreatedTimeStart: '',
      orderCreatedTimeEnd: '',
      orderStatusEnumList: [],
      pagingDto: {
        pageNo: 1,
        pageSize: 10
      },
      agingAbnormal: null
    };
  }
}
