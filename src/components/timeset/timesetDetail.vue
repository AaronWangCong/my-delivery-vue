<template>
  <div class="logisticsListDetail-wrap">
    <template>
      <el-table :data="tableData" style="width: 100%" :default-sort = "{prop: 'week'}">
        <el-table-column prop="firstFlightNo" label="航班" min-width="150"></el-table-column>
        <el-table-column prop="week" label="星期" min-width="150" sortable></el-table-column>
        <el-table-column prop="startTime" label="开始时间" min-width="150"></el-table-column>
        <el-table-column prop="endTime" label="截止时间" min-width="150"></el-table-column>
        <el-table-column prop="spendTime" label="耗时" min-width="150"></el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
import * as api from "../../lib/api";
export default {
  name: "",
  components: {},
  props: {
    scope: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tableData: []
    };
  },
  computed: {
  },
  methods: {
    async getTableData() {
      let data = {
        companyServiceTypeId: this.scope.row.companyServiceTypeId
      }
      let  obj  = await api.getServiceTimeSetApi(data);
      this.tableData = obj.rows
    }
  },
  created() {
    this.getTableData()
  },
  mounted() {
    // this.tableData = this.serviceTimesetInfo
    // (async() => {
  }
};
</script>
<style lang="scss">
</style>