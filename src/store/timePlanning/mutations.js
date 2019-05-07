export default {
  setCompanyA(state,params){
    state.companyOptions.companyAoptions = params.obj;
  },
  setCompanyB(state,params){
    state.companyOptions.companyBoptions = params.obj;
  },
  setCompanyC(state,params){
    state.companyOptions.companyCoptions = params.obj;
  },
  setCompanyDF(state,params){
    state.companyOptions.companyDFoptions = params.obj;
  },
  setCompanyE(state,params){
    state.companyOptions.companyEoptions = params.obj;
  },
  setCompanyGH(state,params){
    state.companyOptions.companyGHoptions = params.obj;
  },
  setCompanyI(state,params){
    state.companyOptions.companyIoptions = params.obj;
  },
  setCompanyJ(state,params){
    state.companyOptions.companyJoptions = params.obj;
  },
  setCompanyK(state,params){
    state.companyOptions.companyKoptions = params.obj;
  },
  setCompanyL(state,params){
    state.companyOptions.companyLoptions = params.obj;
  },
  setCompanyMN(state,params){
    state.companyOptions.companyMNoptions = params.obj;
  },
  seachCompanysVal(state,params){
    state.noBondedList = params.obj.noBondedList;
    state.bondedList = params.obj.bondedList;
  },
}
