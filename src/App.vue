<template>
  <div id="app">
    <div class="main-layout">
      <v-aside v-if="!$route.meta.showSidebar"></v-aside>
      <div :class="!$route.meta.showSidebar ? 'main-content' : ''">
        <v-head v-if="!$route.meta.showHeader"></v-head>
        <div :class="!$route.meta.showSidebar ? 'main-content-page' : ''">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <!-- <v-footer></v-footer> -->
  </div>
</template>

<script>
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Aside from './components/layout/AsideBar'
export default {
  name: 'App',
  components: {
    'v-head': Header,
    'v-footer': Footer,
    'v-aside': Aside
  }
}
</script>

<style lang="scss">
  .main-layout {
    display: flex;
    min-height: 800px;
    &>.main-content {
      flex: 1;
      background: rgb(239, 239, 239);
      min-height: 950px;
      min-width: 1000px;
      .main-content-page{
        padding: 15px;
        .page-common{
          width: 100%;
          border-radius: 3px;
          background-color: #ffffff;
          box-shadow: 0px 0px 8px 0px 
            rgba(0, 0, 0, 0.16);
          .page-common-head{
            height: 48px;
            background-color: #3eae5e;
            display: flex;
            align-items: center;
            padding: 0 20px;
            border-top-left-radius: 3px;
            border-top-right-radius: 3px;
          }
          .page-common-content{
            padding: 0 15px 20px;
          }
        }
      }
    }
  }
</style>
