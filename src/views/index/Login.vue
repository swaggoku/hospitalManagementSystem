<template>
  <div class="all">
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">欢迎登陆</van-divider>
    <van-cell-group>
      <van-field v-model="phone" required center label="手机号" placeholder="请输入手机号" />
      <van-field v-model="sms" required center clearable label="短信验证码" placeholder="请输入短信验证码">
        <template #button>
          <van-button @click="code" size="small" type="primary">发送验证码</van-button>
        </template>
      </van-field>
    </van-cell-group>
    <van-button @click="login" class="login" size="large" type="primary">登录</van-button>
  </div>
</template>

<script>
import url from '../../network/serve'

export default {
  name: "Login",
  data() {
    return {
      phone: "18346547345",
      sms: ""
    };
  },
  methods: {
    // 获取验证码
    code() {
      if (!/^1[3456789]\d{9}$/.test(this.phone)) {
        alert("手机号码有误，请重填");
        return false;
      } else {
        this.axios
          .get(url.GET_CODE, {
            params: {
              phone: this.phone
            }
          })
          .then(res => {
            if(!res.data.suc) {
              alert(res.data.msg);
              return;
            }
            alert(res.data.result);
          });
      }
    },
    // 登录
    login() {
      if (!/^1[3456789]\d{9}$/.test(this.phone)) {
        alert("手机号有误");
        return;
      }
      if (this.sms == "") {
        alert("验证码为空");
        return;
      }
      // 发送请求
      var info = "phone=" + this.phone + "&code=" + this.sms;
      this.$store.dispatch('login',info).then(res => {
        // alert('登录成功');
        this.$router.push('/home');
      });
    }
  }
};
</script>

<style scoped>
.all {
  width: 50%;
  margin: 0 auto;
}
.login {
  width: 70%;
  margin-top: 30px;
}
</style>