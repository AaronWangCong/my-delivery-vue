<template>
  <div class="header-wrap">
    <div class="header-button" :class="isCollapse ? 'on' : ''">
      <i class="iconfont icon-nav" @click="toggleAside"></i>
    </div>

    <div class="header-nav">
        <span>
          <router-link :to="{ name:'home' }" v-if="customer.nickName">欢迎，管理员{{ customer.nickName }}</router-link>
          <router-link :to="{ name:'home' }">修改密码</router-link>
          <el-button type="text" @click="logout()">退出</el-button>
        </span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
export default {
  name: "Header",
  data() {
    return {};
  },

  computed: {
    ...mapState({
      isCollapse: state => state.common.isCollapse,
      customer: state => state.login.customer,
    })
  },

  methods: {
    ...mapMutations("common", ["toggleAside"]),
    ...mapActions("login", ["logout","isLogin"])
  },
  created() {
    
  },
  mounted() {}
};
</script>

<style lang="scss">
@import "@assets/layout/header.scss";
</style>
