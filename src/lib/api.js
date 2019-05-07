import http from './http'

export const labelBackEnd = '/label/v1'; // 平台后台
export const authorBackEnd = '/auth/v1'; // 认证后台
export const mdBackEnd = '/md/v1'; // 时效工具后台
export const pagerParam = {
    pageNo: 1,
    pageSize: 10,
    pageTotal: 0,
    currentPage: 1
};
export const pageSizes = [10];

/**
 *    common
 */
export const getAllCompanyNameApi  = (data) => http(mdBackEnd + '/dropdown_list/company_name_list', data, 'GET'); //获取所有公司名称
export const getAllCompanyLocationsApi  = (data) => http(mdBackEnd + '/dropdown_list/company_location_list', data, 'GET'); //获取所有公司所在地
export const getAllDestinationAndCityApi  = (data) => http(mdBackEnd + '/dropdown_list/list', data, 'GET'); //获取所有目的国和中国城市
export const getAllChineseCityApi  = (data) => http(mdBackEnd + '/dropdown_list/list_china_All_city', data, 'GET'); //获取所有中国城市
export const getAlldestinationCountrieApi  = (data) => http(mdBackEnd + '/dropdown_list/list_destination', data, 'GET'); //获取所有目的国家
export const getAllServiceTypesApi  = (data) => http(mdBackEnd + '/dropdown_list/roleType_list', data, 'GET'); //获取所有服务类型
export const getCompanyServiceTypesApi  = (data) => http(mdBackEnd + `/dropdown_list/${data}`, data, 'GET'); //获取某个公司服务类型
export const getAllTimeZonApi  = (data) => http(mdBackEnd + '/dropdown_list/timeZon_list', data, 'GET'); //获取所有时区类型

/**
 *   home
 */


/**
 * 登录注册
 */
export const userLogin = (data) => http(authorBackEnd + "/subject/login", data, "POST"); //web端登录
export const isLogin = (data) => http(authorBackEnd + "/subject/is_login", data, "GET"); // 是否登录
export const getCustomer = (data) => http(authorBackEnd + "/subject/customer", data, "POST"); // 获取用户信息

 /**
 *   账户管理
 */
export const getServiceProvidersListApi  = (data) => http(mdBackEnd + '/companys/list', data, 'POST'); // 服务商列表查询
export const getServiceProvidersIdApi  = (data) => http(mdBackEnd + `/companys/${data.companyId}`, data, 'GET'); // id查询服务商
export const addServiceProvidersApi  = (data) => http(mdBackEnd + "/companys/add", data, 'POST'); // 新增服务商
export const uploadServiceProvidApi  = (data) => http(mdBackEnd + "/companys/upCompanyLogo", data, 'POST'); // 上传服务商logo
export const editServiceProvidersApi  = (data) => http(mdBackEnd + '/companys/update', data, 'PUT'); // 修改服务商
export const delServiceProvidersApi  = (data) => http(mdBackEnd + `/companys/${data.companyId}`, data, 'DELETE'); // 删除服务商
export const uploadLimitationTemplateApi  = (data) => http(mdBackEnd + '/shipping_cycles/import', data, 'POST'); // 设置时效导入
export const delLimitationApi  = (data) => http(mdBackEnd + `/shipping_cycles/${data.shippingCycleId}`, data, 'DELETE'); // 删除时效
export const setLimitationApi  = (data) => http(mdBackEnd + '/shipping_cycles/add', data, 'POST'); // 设置时效

export const getUserListApi  = (data) => http(mdBackEnd + '/company_users/list', data, 'POST'); // 账号列表查询
export const addUserApi  = (data) => http(mdBackEnd + '/company_users/add', data, 'POST'); // 新增账号
export const editUserApi  = (data) => http(mdBackEnd + `/company_users/${data.companyUserId}`, data, 'PUT'); // 修改账号
export const delUserApi  = (data) => http(mdBackEnd + `/company_users/${data.companyUserId}`, data, 'DELETE'); // 删除账号

 /**
 * 时间设置
 */
export const getTimeSetApi = (data) => http(mdBackEnd + "/company_service_types/list", data, "POST"); //获取时间设置列表
export const getServiceTimeSetApi = (data) => http(mdBackEnd + `/company_working_days/${data.companyServiceTypeId}`, data, "GET"); //根据服务id查询服务商时间
export const addTimeSetApi = (data) => http(mdBackEnd + "/company_working_days/add", data, 'POST'); //新增时间
export const editTimeSetInfoApi = (data) => http(mdBackEnd + "/company_working_days/update", data, 'PUT'); //修改时间


/**
 * 时效查询
 */
export const setQuerySelectDatas = (data) => http(mdBackEnd + '/order_timelines/get_query_select_datas', data, 'GET'); //获取查询条件下拉框中的数据
export const searchList = (data) => http(mdBackEnd + '/order_timelines/list', data, 'POST'); //时效列表查询
export const getTrackInfoList = (data) => http(mdBackEnd + `/order_timelines/get_track_info/${data}`, data, 'GET'); //获取订单追踪信息
export const getWarehouseSelect = (data) => http(mdBackEnd + `/order_timelines/get_warehouse_datas/${data}`, data, 'GET'); //切换组织下拉框获取对应分公司信息


 /**
 * 时效规划
 */
export const processListApi = (data) => http(mdBackEnd + "/process/list", data, "POST"); //获取规划线路
export const seachCompanysApi = (data) => http(mdBackEnd + "/process/seachCompanys", data, 'POST'); //获取公司列表
