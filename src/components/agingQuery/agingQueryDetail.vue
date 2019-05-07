<template>
  <div class="agingQueryDetail-wrap">
    <div class="agingQueryDetail-header">
      <span>内单号：{{ scope.row.insideNumber }}</span>
      <span class="red">作业耗时：{{ scope.row.realUsedMiniteTotalDesc }}</span>
      <span class="red">门到门服务耗时：{{ scope.row.usedMiniteTotalDesc }}</span>
    </div>

    <div class="agingQueryDetail-content">
      <div v-for="(trackInfo, item) in trackInfoListData" :key="item" class="agingQueryDetail-content-item">
        <p><span class="green">{{ trackInfo.timeUsedMsg }}</span></p>
        <p class="time">
          <span>{{ trackInfo.statusDesc }}</span>
          <span :class="trackInfo.statusDesc == '已签收' ? 'on' : ''"><i class="el-icon-check"></i></span>
          <span>{{ trackInfo.trackingTime.split(' ')[0] }}<span>{{ trackInfo.trackingTime.split(' ')[1] }}</span></span>
          <span>{{ trackInfo.trackingContent }}</span>
          <span v-show="trackInfo.tipsMsg != null && trackInfo.tipsMsg != ''" :class="trackInfo.trackTipsType == 'WARNING' ? 'warning-tips' : 'systems-tips'">
            <img v-show="trackInfo.trackTipsType == 'WARNING'" src="../../assets/img/06.png" alt="">
            <img v-show="trackInfo.trackTipsType == 'DANGER'" src="../../assets/img/07.png" alt="">
            <span>{{ trackInfo.tipsMsg }}</span>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import * as api from "../../lib/api";
import { mapState, mapMutations, mapActions } from 'vuex'
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
      trackInfoListData: []
    };
  },
  computed: {
    ...mapState({
      'workUserdTimeMsg': state => state.agingQuery.workUserdTimeMsg,
      'serviceUsedTimeMsg': state => state.agingQuery.serviceUsedTimeMsg,
    })
  },
  methods: {
    async getTableData() {
      let result = await api.getTrackInfoList(this.scope.row.orderId);
      this.trackInfoListData = result.rows
    }
  },
  created() {
    this.getTableData()
  },
  mounted() {
  }
};
</script>
<style lang="scss">
.agingQueryDetail-wrap{
  .agingQueryDetail-header{
    height: 49px;
    line-height: 49px;
    border-bottom: 1px solid #ccc;
    padding-left: 20px;
    span{
      font-size: 14px;
      margin-right: 40px;
      color: #666;
      font-weight: bold;
    }
  }
  .agingQueryDetail-content{
    padding: 20px 0;
    .agingQueryDetail-content-item{
      p{
        margin: 0 0 27px;
        padding-left: 20px;
        position: relative;
        &::before{
          content: '';
          width: 1px;
          height: 51px;
          background-color: #ccc;
          position: absolute;
          left: 148px;
          bottom: 0;
        }
      }
      &:first-child{
        p::before{
          height: 0;
        }
      }
      .blue{
        padding-left: 323px;
        color: #1a7dd1;
        font-weight: bold;
      }
      .green{
        padding-left: 358px;
        color: #1c9f41;
        font-weight: bold;
      }
      .time{
        display: flex;
        align-items: center;
        &>span{
          font-size: 14px;
          color: #666;
          display: inline-block;
          &:nth-of-type(1){
            margin-right: 26px;
            width: 90px;
          }
          &:nth-of-type(2){
            margin-right: 30px;
            text-align: center;
            line-height: 24px;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: 1px solid #999;
            background-color: #fff;
            z-index: 10;
            &.on{
              background-color: #29b751;
              color: #fff;
              border: 1px solid #29b751;
            }
          }
          &:nth-of-type(3){
            width: 160px;
            margin-right: 22px;
            span{
              color: #999;
              padding-left: 10px;
            }
          }
        }
        .warning-tips{
          color: #333;
          padding-left: 40px;
          position: relative;
          span{
            padding: 0 3px;
            margin-left: 5px;
            background: url('../../assets/img/warning-tips.jpg') repeat-x;
          }
          &>img{
            position: absolute;
            left: 23px;
            top: 0;
          }
        }
        .systems-tips{
          color: #333;
          padding-left: 40px;
          position: relative;
          span{
            padding: 0 3px;
            margin-left: 5px;
            background: url('../../assets/img/systems-tips.jpg') repeat-x;
          }
          &>img{
            position: absolute;
            left: 23px;
            top: 0;
          }
        }
      }
    }
  }
}
</style>