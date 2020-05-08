<template>
  <div class="one">
    <ul>
      <li v-for="(item,index) in list" :key="index">
        <div class="img">
          <img src="../assets/logo.png" alt />
          <!-- <img :src="item.avaUrl" :onerror="defaultImg" /> -->
        </div>
        <div class="p">
          <p>编号:{{item.id}}</p>
          <p>姓名:{{item.username}}</p>
          <p>性别:{{item.gender == '1' ? '男' : '女'}}</p>
          <p>年龄:{{item.age}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import url from '../network/serve'

export default {
  name: "One",
  data() {
    return {
      list: [],
      defaultImg: "this.src='../assets/logo.png'"
    };
  },
  created() {
    var token = sessionStorage.getItem("token");
    var info = "authorization=" + token + "&pageNo=1&pageSize=11";
    this.axios.post(url.GET_CON_LIST, info).then(res => {
      if (!res.data.suc) {
        this.$router.push("/index");
      } else {
        this.list = res.data.result;
      }
    });
  }
};
</script>

<style scoped>
.one ul li {
  /* float: left; */
  width: 21%;
  height: 20%;
  line-height: 0;
  box-shadow: 1px 1px 4px 1px rgba(100, 100, 100, 0.8);
  float: left;
  margin-left: 30px;
  margin-top: 25px;
}
.one ul li p {
  font-size: 12px;
  line-height: 5px;
}
.one ul li img {
  float: left;
  width: 50px;
  height: 50px;
  margin-top: 8px;
}
.img {
  float: left;
  margin: 10px;
}
.p {
  float: left;
  margin-left: 30px;
  padding: 2px;
}
</style>