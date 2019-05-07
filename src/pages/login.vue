<template>
  <div class="login-wrap">
    <div class="login-wrap-top">
      <img src="../assets/img/01.jpg" alt="">
    </div>
    <div class="login-wrap-content">
      <img src="../assets/img/logo1.png" alt="">
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
        <h3>管理后台登录</h3>
        <el-input v-show="false" v-model="loginForm.userType"></el-input>
        <el-form-item label="用户名" label-width="75px">
          <el-input type="text" placeholder="用户名" v-model="loginForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="75px">
          <el-input type="passWord" placeholder="密码" v-model="loginForm.password" autocomplete="off" @keyup.enter.native="submitLoginBtn('loginForm')"></el-input>
        </el-form-item>
        <el-form-item label-width="75px">
            <el-checkbox v-model="loginForm.rememberMe">记住密码</el-checkbox>
        </el-form-item>
        <el-form-item label="" label-width="75px" class="login-btn">
          <span @click="submitLoginBtn('loginForm')">登录</span>
        </el-form-item>
      </el-form>
      <p class="login-footer">©武汉洋山信息科技有限公司</p>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import Cookie from 'js-cookie'
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        rememberMe: true,
        userType: 'MD_PLATFORM'
      },
      loginRules: {
        password: [
          { required: true, message: "请输入密码", trigger: "change" }
        ],
        username: [
          { required: true, message: "请输入货主名", trigger: "change" }
        ]
      }
    };
  },
  computed: {},
  methods: {
    ...mapActions('login', [
      'userLogin',
    ]),
    submitLoginBtn(formName) {
      if (this.loginForm.rememberMe) {
        Cookie.set('username', this.loginForm.username)
        Cookie.set('password', this.loginForm.password)
        Cookie.set('rememberMe', this.loginForm.rememberMe)
      }else {
        Cookie.remove('username');
        Cookie.remove('password');
        Cookie.remove('rememberMe');
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.userLogin(this.loginForm);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //判断是否记住密码并且填入
    getCookies(){
      var isrememberMe = Cookie.get('rememberMe')
      if(isrememberMe){
        this.loginForm.username = Cookie.get('username')
        this.loginForm.password = Cookie.get('password')
      }
    }
  },
  created() {
    this.getCookies()
  },
  mounted() {
    // (async() => {
  }
};
</script>
<style lang="scss">
.login-wrap {
  width: 100%;
  background-color: #fff;
  position: absolute;
  height: 100%;
  top: 0;
  bottom: 0;
  .login-wrap-top {
    width: 100%;
    height: 343px;
    overflow: hidden;
    img {
      width: 100%;
      min-width: 1500px;
    }
  }
  .login-wrap-content {
    position: absolute;
    top: 13%;
    left: 50%;
    transform: translatex(-50%);
    z-index: 1001;
    display: flex;
    flex-direction: column;
    align-items: center;
    .el-form {
      width: 430px;
      height: 360px;
      background-color: #ffffff;
      box-shadow: 0px 0px 38px 0px rgba(0, 0, 0, 0.14);
      border-radius: 10px;
      padding-right: 57px;
      padding-left: 23px;
      h3 {
        font-size: 20px;
        color: #333;
        font-weight: bold;
        text-align: center;
        padding: 36px 0;
      }
      .login-btn {
        .el-form-item__content {
          span {
            width: 100%;
            height: 42px;
            background-color: #29b751;
            border-radius: 3px;
            display: inline-block;
            cursor: pointer;
            text-align: center;
            line-height: 42px;
            color: #fff;
            font-size: 18px;
            &:hover {
              opacity: 0.8;
            }
          }
        }
      }
    }
    & > img {
      margin-bottom: 30px;
    }
    .login-footer {
      font-size: 14px;
      color: #666;
      margin-top: 90px;
    }
  }
}
</style>