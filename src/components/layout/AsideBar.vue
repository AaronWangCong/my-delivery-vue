<!--  -->
<template>
  <div class="aside-wrap">
    <el-menu :default-active="$route.name" :router='true' class="el-menu-vertical-demo" :collapse="isCollapse" :collapse-transition="true" background-color="#1D2B36" text-color="#b0c2d0" active-text-color="#fff">
      <div class="aside-wrap-logo">
        <img v-if="!isCollapse" src="../../assets/img/logo2.png" alt="">
        <img v-else src="../../assets/img/logo2_small.png" alt="">
      </div>
      <div class="aside-wrap-user">
        <div v-if="!isCollapse" class="user-big">
          <img src="../../assets/img/02.jpg" alt="">
          <p><span>总经理</span><span>三哥</span></p>
        </div>
        <span v-else class="user-small"><img src="../../assets/img/02.jpg" alt=""></span>
      </div>
      <el-menu-item index="home">
          <i class="iconfont icon-home"></i>
          <span slot="title">默认主页</span>
          <i class="right-icon iconfont icon-right"></i>
      </el-menu-item>
      <el-menu-item index="logisticsList">
          <i class="iconfont icon-shezhi"></i>
          <span slot="title">账户管理</span>
          <i class="right-icon iconfont icon-right"></i>
      </el-menu-item>
      <el-menu-item index="timeset">
          <i class="iconfont icon-shijian"></i>
          <span slot="title">时间设置</span>
          <i class="right-icon iconfont icon-right"></i>
      </el-menu-item>
      <el-menu-item index="agingQuery">
          <i class="iconfont icon-query1"></i>
          <span slot="title">时效查询</span>
          <i class="right-icon iconfont icon-right"></i>
      </el-menu-item>
      <el-menu-item index="timePlanning">
          <i class="iconfont icon-shijian1"></i>
          <span slot="title">时效规划</span>
          <i class="right-icon iconfont icon-right"></i>
      </el-menu-item>
      <!-- <el-menu-item index="6">
          <i class="iconfont icon-tongji"></i>
          <span slot="title">统计报表</span>
          <i class="right-icon iconfont icon-right"></i>
      </el-menu-item> -->
    </el-menu>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  components: {},
  computed: {
    ...mapState({
      isCollapse: state => state.common.isCollapse,
      customer: state => state.common.customer
    })
  },
  mounted() {
  },
  methods: {}
};
</script>
<style lang='scss'>
.aside-wrap {
  min-height: 400px;
  .el-menu {
    height: calc(100% - 88px);
    border-left: 0;
    height: 100%;
    .el-menu-item {
      width: 200px;
      position: relative;
      i{
        font-size: 20px;
      }
      .right-icon {
        position: absolute;
        right: 15px;
        top: 0px;
        display: none;
        font-size: 14px;
      }
      &::after {
        content: "";
        width: 160px;
        height: 1px;
        background-color: #3f4b54;
        position: absolute;
        bottom: 0;
        left: 20px;
        display: inline-block;
      }
      &:first-child::before {
        content: "";
        width: 160px;
        height: 1px;
        background-color: #3f4b54;
        position: absolute;
        top: 0;
        left: 20px;
        display: inline-block;
      }
      &.is-active {
        .right-icon {
          display: block;
        }
      }
      &>span{
        padding-left: 10px;
      }
    }
  }
  .aside-wrap-logo {
    height: 88px;
    background-color: #1d2b36;
    border-bottom: 1px solid rgba(12, 17, 22, 1);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .aside-wrap-user {
    border-top: 1px solid rgba(63, 75, 84, 1);
    background-color: #1d2b36;
    .user-big {
      height: 158px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      img {
        width: 90px;
        height: 90px;
        border-radius: 50%;
      }
      p {
        margin: 12px 0 0;
        span {
          font-size: 16px;
          color: #fff;
          margin-right: 15px;
        }
      }
    }
    .user-small {
      width: 100%;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 44px;
        height: 44px;
        border-radius: 50%;
      }
    }
  }
  .el-menu-vertical-demo {
    border: 0;
    width: 200px;
  }
  .el-menu--collapse {
    width: 65px;
    .el-menu-item {
      width: 65px;
      &::after {
        height: 0 !important;
      }
      &::before {
        height: 0 !important;
      }
      &.is-active {
        .right-icon {
          display: none;
        }
      }
    }
  }
}
</style>