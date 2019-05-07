export default {
  toggleAside (state, data) {
    state.isCollapse = !state.isCollapse
  },
  setAllCompanyName (state, data) {
    state.allCompanyName = data.rows
  },
  setAllCompanyLocations (state, data) {
    state.allCompanyLocations = data.rows
  },
  setAllDestinationAndCity (state, data) {
    state.allDestinationAndCity = data.rows
  },
  setAllChineseCity (state, data) {
    state.allChineseCity = data.rows
  },
  setAlldestinationCountrie (state, data) {
    state.alldestinationCountrie = data.rows
  },
  setAllServiceTypes (state, data) {
    state.allServiceTypes = data.rows
  },
  setCompanyServiceTypes (state, data) {
    state.companyServiceTypes = data.rows
  },
  setAllTimeZon (state, data) {
    state.allTimeZon = data.rows
  },
}
