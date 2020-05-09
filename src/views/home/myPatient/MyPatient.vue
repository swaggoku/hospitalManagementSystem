<template>
  <div class="my-patient">
    <form class="search" action>
      <van-search
        @keydown.enter="search()"
        v-model.trim="conName"
        class="search-input"
        placeholder="请输入搜索关键词"
      />
      <van-icon @click="search()" class="search-icon" size="25px" name="search" />
    </form>
    <ul>
      <li v-for="(item,index) in search()" :key="index">
        <div class="img">
          <img src="../../../assets/logo.png" alt />
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
import url from "../../../network/serve";

export default {
  name: "MyPatient",
  data() {
    return {
      list: [],
      defaultImg: "this.src='../assets/logo.png'",
      conName: ""
    };
  },
  created() {
    this.getConList();
  },
  methods: {
    // 获取我的病人
    getConList() {
      var token = sessionStorage.getItem("token");
      var info = "authorization=" + token + "&pageNo=1&pageSize=11";
      this.axios.post(url.GET_CON_LIST, info).then(res => {
        if (!res.data.suc) {
          this.$router.push("/index");
        } else {
          this.list = res.data.result;
        }
      });
    },
    // 根据关键字搜索病人
    search() {
      var newList = [];
      this.list.forEach(item => {
        if (item.username.indexOf(this.conName) !== -1) {
          newList.push(item);
        }
      });
      return newList;
    }
  }
};
</script>

<style scoped>
.my-patient ul li {
  /* float: left; */
  width: 21%;
  height: 20%;
  line-height: 0;
  box-shadow: 1px 1px 4px 1px rgba(100, 100, 100, 0.8);
  float: left;
  margin-left: 30px;
  margin-top: 25px;
}
.my-patient ul li p {
  font-size: 12px;
  line-height: 5px;
}
.my-patient ul li img {
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
.search {
  display: flex;
}
.search .search-input {
  width: 30%;
}
.search .search-icon {
  width: 35px;
  height: 35px;
  margin-top: 10px;
  cursor: pointer;
  /* border: 1px solid black; */
  line-height: 35px;
  border-radius: 50px;
}
.search .search-icon:hover {
  background-color: rgb(230, 230, 230);
}
</style>