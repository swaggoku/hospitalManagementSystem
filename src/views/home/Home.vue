<template>
  <div class="about">
    <!--  -->
    <div class="left">
      <div class="image">
        <img src="../../assets/logo.png" alt />
      </div>
      <ul>
        <li @click="change('/one','我的病人')" :class="{active: current == '/one'}">
          <van-icon class="vicon" name="friends" />我的病人
        </li>
        <li @click="change('/two','电子病历')" :class="{active: current == '/two'}">
          <van-icon class="vicon" name="label" />电子病历
        </li>
        <li @click="change('/three','住院管理')" :class="{active: current == '/three'}">
          <van-icon class="vicon" name="todo-list" />住院管理
        </li>
        <li @click="change('/fore','报告查询')" :class="{active: current == '/fore'}">
          <van-icon class="vicon" name="search" />报告查询
        </li>
        <li @click="change('/five','出院管理')" :class="{active: current == '/five'}">
          <van-icon class="vicon" name="notes-o" />出院管理
        </li>
        <li @click="change('/six','处方管理')" :class="{active: current == '/six'}">
          <van-icon class="vicon" name="notes-o" />处方管理
        </li>
        <li @click="change('/seven','就诊咨询')" :class="{active: current == '/seven'}">
          <van-icon class="vicon" name="notes-o" />就诊咨询
        </li>
        <li @click="change('/eight','个人管理')" :class="{active: current == '/eight'}">
          <van-icon class="vicon" name="notes-o" />个人管理
        </li>
      </ul>
      <div class="people">
        <h3>{{getUname}}</h3>
        <van-icon name="circle" />&nbsp;
        <span @click="logOut">注销用户</span>
      </div>
    </div>
    <!--  -->
    <div class="right">
      <div class="name">
        <h3>{{title}}</h3>
        <van-button @click="add()" v-show="addbingli" type="primary" size="mini">添加病人</van-button>
      </div>
      <div class="view">
        <router-view></router-view>
      </div>
      <div class="nav-bar">
        <div class="icon">
          <van-icon name="star-o" />
          <van-icon class="iconn" name="setting" />
          <van-icon class="iconn" name="bell" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      current: sessionStorage.getItem("active") || "/one",
      title: sessionStorage.getItem("title") || "我的病人",
      addbingli: sessionStorage.getItem('addbingli') || false
    };
  },
  computed: {
    getUname() {
      return this.$store.state.uname;
    }
  },
  // 监听地址栏路由的变化，修改左侧选项卡高亮状态
  watch: {
    '$route'(to, from) {
      if (to.path == "/one") {
        this.current = to.path;
        sessionStorage.setItem("active", to.path);
        this.title = "我的病人";
        sessionStorage.setItem("title", "我的病人");
        this.addbingli = false;
        sessionStorage.setItem("addbingli", false);
      } else if (to.path == "/two") {
        this.current = to.path;
        sessionStorage.setItem("active", to.path);
        this.title = "电子病历";
        sessionStorage.setItem("title", "电子病历");
        this.addbingli = true;
        sessionStorage.setItem("addbingli", true);
      } else if (to.path == "/three") {
        this.current = to.path;
        sessionStorage.setItem("active", to.path);
        this.title = "住院管理";
        sessionStorage.setItem("title", "住院管理");
        this.addbingli = false;
        sessionStorage.setItem("addbingli", false);
      } else if (to.path == "/fore") {
        this.current = to.path;
        sessionStorage.setItem("active", to.path);
        this.title = "报告查询";
        sessionStorage.setItem("title", "报告查询");
        this.addbingli = false;
        sessionStorage.setItem("addbingli", false);
      }
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch("logOut").then(res => {
        this.$router.push("/index");
      });
    },
    change(a, title) {
      this.current = a;
      sessionStorage.setItem("active", a);
      this.title = title;
      sessionStorage.setItem("title", title);
      this.$router.push(a).catch(err => {});
    },
    add() {
      this.$router.push({
        name: "Add",
        query: {
          
        }
      });
    },
  }
};
</script>

<style scoped>
.active {
  color: #42b982;
}
* {
  margin: 0;
  padding: 0;
}
.about {
  border-radius: 40px;
  height: 100%;
  border: 2px solid #42b983;
  display: flex;
  width: 90%;
  height: 87%;
  margin: 0 auto;
}
.left {
  height: 100%;
  width: 250px;
  /* min-width: 250px; */
  position: relative;
}
.image {
  width: 100%;
  height: 100px;
  border-bottom: 2px solid #42b983;
}
.image img {
  width: 60px;
  height: 60px;
  margin-top: 20px;
}
.people {
  border-top: 2px solid #42b983;
  width: 100%;
  height: 100px;
  line-height: 40px;
  position: absolute;
  bottom: 0;
}
.people h3 {
  margin-top: 10px;
}
.people span {
  cursor: pointer;
}
.people img {
  width: 30px;
  height: 30px;
}
.left ul li {
  margin-top: 20px;
}
.left ul li:hover {
  color: #42b982;
  cursor: pointer;
}
.vicon {
  vertical-align: middle;
  margin-right: 10px;
}
.right {
  width: 100%;
  /* min-width: 400px; */
  height: 100%;
  border-left: 2px solid #42b983;
  position: relative;
}
.name {
  position: absolute;
  top: 2%;
  left: 15%;
  border-radius: 50px;
  /* background-color: #42b982; */
  /* box-shadow: 0 1px 4px 1px rgba(100, 100, 100, 0.8); */
  color: black;
  width: 200px;
  height: 40px;
  line-height: 40px;
}
.name h3 {
  float: left;
}
.view {
  width: 95%;
  height: 80%;
  /* border: 2px solid #42b983; */
  box-shadow: 1px 1px 10px 1px rgba(100, 100, 100, 0.8);
  margin: 0 auto;
  margin-top: 50px;
}
.nav-bar {
  width: 100%;
  height: 50px;
  box-shadow: 0 -0.5px 4px 1px rgba(100, 100, 100, 0.8);
  /* border-top: 1px solid #42b983; */
  position: absolute;
  bottom: 0;
  border-bottom-right-radius: 40px;
}
.icon {
  width: 100px;
  height: 50px;
  line-height: 50px;
  /* background-color: skyblue; */
  float: right;
  margin-right: 20px;
}
.iconn {
  margin-left: 8px;
}
</style>
