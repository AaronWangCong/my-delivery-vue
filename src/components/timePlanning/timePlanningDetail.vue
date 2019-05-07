<template>
  <div v-if="scope" class="timePplanningDetail-wrap">
    <div class="timePplanningDetail-box">
      <div>
        <div class="timePplanningDetail-item item1">
          <p><span>-</span></p>
          <p><span>-<br>-</span></p>
          <p><span>-<br>-</span></p>
        </div>
      </div>
      <div v-for="(box,index) in roleTypeDescArr" :key="index">
        <div class="timePplanningDetail-item" v-if="item.roleTypeDesc == box" v-for="(item, index) in scope.row.dtos" :key="index">
          <p><span v-if="item.companyName">{{ item.companyName }}</span><span v-else></span></p>
          <p><span v-if="item.startDate">{{ item.startDate }}{{ item.roleTypeDesc | cutStrFormat }}</span><span v-else></span></p>
          <p><span v-if="item.endDate">{{ item.endDate }}完成</span><span v-else></span></p>
        </div>
        <div class="timePplanningDetail-item" v-else></div>
      </div>
    </div>
    <div class="timePplanningDetail-last">
      <p><span>门到门耗时总计</span></p>
      <p><span>{{ scope.row.calculationLimitation }}</span></p>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  components: {},
  props: {
    scope: {
      type: Object,
      required: true
    },
    detailType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      roleTypeDescArr: []
    };
  },
  computed: {},
  methods: {
    goAccountManagement(){
      this.$router.push('/logisticsList/accountManagement')
    }
  },
  created() {
    if(this.detailType == 'noBondedList') {
      this.roleTypeDescArr = ['司机取货','仓库配货','出库短驳','国内报关','航司航程','航司理货','海外清关','代理提货','代理转出','末端派送']
    }else{
      this.roleTypeDescArr = ['司机取货','仓库配货','出库短驳','国内报关','航司航程','航司理货','代理提货','海外清关','代理转出','末端派送']
    }
  },
  mounted() {
    
  },
  filters: {
    cutStrFormat(value) {
      if(value&& value.length > 2) {
        value = value.substring(value.length-2);
      }
      return value;
    }
  }
};
</script>
<style lang="scss">
.timePplanningDetail-wrap{
  display:flex;
  .timePplanningDetail-box{
    display: flex;
    flex: 1;
    .timePplanningDetail-item{
      min-width: 130px;
      width: 100%;
      p{
        border-bottom: 1px solid #EBEEF5;
        padding: 10px;
        span{
          line-height: 20px;
        }
        &:last-child{
          border-bottom: 0;
        }
      }
    }
    .item1{
      width: 160px;
    }
  }
  .timePplanningDetail-last{
    width: 150px;
    min-width: 150px;
    display: flex;
    flex-direction: column;
    p{
      border-left: 1px solid #EBEEF5;
      padding: 10px;
      span{
        line-height: 20px;
      }
      &:nth-of-type(2){
        flex: 1;
        span{
          line-height: 80px;
        }
      }
    }
  }
}
</style>