<template>
  <div class="hello">
    <div class="outer_label">
      <img class="inner_label login_logo" src="./../assets/logo.png">
    </div>
    <el-form 
    class="login_form" 
    ref="AccountForm" 
    :model="account" 
    :rules="loginRules" 
    label-position="left">
    <h3>Login</h3>
    <el-form-item prop="username">
      <el-input 
          v-model="account.username" 
          type="text" 
          placeholder="账号" prefix-icon="el-icon-user" class="qxs-ic_user qxs-icon">
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="account.password" type="password" placeholder="密码" prefix-icon="el-icon-user" class="qxs-ic_password qxs-icon" show-password></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" >记住密码</el-checkbox>
    <el-form-item>
        <el-button class="login_btn" round @click.native.prevent="handleLogin" :loading="logining" type="primary">login</el-button>
        <el-button
          type="primary"
          class="resetBtn"
          @click.native.prevent="reset">
          reset
        </el-button>
      </el-form-item>
  </el-form>
  </div>
</template>

<script>
 import { requseLogin } from '../axios/api';
 
  export default {
    name: 'Login',
    data() {
      return {
        account: {
          userName: '',
          password: ''
        },
        loginRules: {
          username: [{required: true, message: '请输入账号', trigger: 'blur'}],
          password: [{required: true,message: '请输入密码', trigger: 'blur'}],
        },
        checked: false,
        logining: false
      }
    },
    created () {
      if(JSON.parse( sessionStorage.getItem('user')) && JSON.parse( sessionStorage.getItem('user')).userName){
        this.account.userName = JSON.parse( sessionStorage.getItem('user')).userName;
        this.account.password = JSON.parse( sessionStorage.getItem('user')).password;
      }
      console.log(JSON.parse( sessionStorage.getItem('user')))

    },
    mounted(){

      // this.getlocalStorage()
      // console.log(2)
    },
    computed: {
      
    },
    methods: {
      handleLogin() {
        this.$refs.AccountForm.validate((valid) => {
          if (valid) {
            this.logining = true;
            let loginParams = {
              username: this.account.username,
              password: this.account.password
            }
            // 调用axios登录接口
            requseLogin(loginParams).then(res => {
              // debugger;
              this.logining = false;
              // 根据返回的code判断是否成功
              let { code, msg, user } = res.data;
              if (code === 200) {
                // elementui中提示组件
                this.$message({
                  type: 'success',
                  message: msg
                });
                // 登陆成功，用户信息就保存在sessionStorage中

                sessionStorage.setItem('user', JSON.stringify(user));
                // 跳转到后台主页面
                console.log('this',this)
                this.$router.push({ path: '/' })

              }else {
                this.$message({
                  type: 'error',
                  message: msg,
                });
              }
            }).catch(err =>{
              console.log(err);
            });
          }else {
            console.log('error submit!');
            return false;
          }
        })
      },
      reset () {
        this.$refs.AccountForm.resetFields()
      },
      // 当记住密码的checbox选中时，像localStorage里存入一下用户输入的用户名和密码
      // submitForm(formName) {
      //   const self = this
      //   if (self.checked == true) {
      //     self.setlocalStorage(self.ruleForm.username, self.ruleForm.password)
      //   } else {
      //     self.clearlocalStorage()
      //   }
      //   //与后端请求代码，暂时还没有请求地址，先省略了
      //   console.log('登陆成功')
      // },
      //像localStorage里存入从页面获取的用户名和密码；
      // setlocalStorage(c_name, c_pwd) {
      //   localStorage.siteName = c_name
      //   localStorage.sitePassword = c_pwd
      // },
      // getlocalStorage: function() {
      //   this.ruleForm.username = localStorage.getItem(localStorage.key(1)) //保存到保存数据的地方
      //   this.ruleForm.password = localStorage.getItem(localStorage.key(2))
      // },
      // // 点击忘记密码，清空localStorage里的存储
      // clear: function() {
      //   this.setlocalStorage('', '')
      // }
    }
  }
</script>
<style scoped>
  .login_form {
    padding-top: 10%;
    padding-left: 10%;
    padding-right: 10%;
  }
/*  .qxs-ic_user {
    background: url("./../assets/ic_user.png") no-repeat;
    background-size: 13px 15px;
    background-position: 3%;
  }
  .qxs-ic_password {
    background: url("./../assets/ic_password.png") no-repeat;
    background-size: 13px 15px;
    background-position: 3%;
    margin-bottom: 20px;
  }*/
  .login_logo {
    height: 100%;
  }
  .login_btn,.resetBtn {
    width: 100%;
    font-size: 16px;
    margin-top: 20px;
    background: -webkit-linear-gradient(left, #000099, #2154FA); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #000099, #2154FA); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #000099, #2154FA); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #000099 , #2154FA); /* 标准的语法 */
    filter: brightness(1.4);
  }
</style>
