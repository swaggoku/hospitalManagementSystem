<template>
  <div class="index">
    <img alt="Vue logo" src="../../assets/logo.png" />
    <!-- <van-image round width="10rem" height="10rem" src="../assets/logo.png" /> -->
    <Login msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import Login from "../../views/index/Login";

export default {
  name: "Index",
  components: {
    Login
  }
};
</script>
