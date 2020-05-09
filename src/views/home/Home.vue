<template>
  <div class="home">
    <!-- 左侧导航栏 -->
    <div class="left">
      <div class="image">
        <img src="../../assets/logo.png" alt />
      </div>
      <ul>
        <li @click="change('/myPatient','我的病人')" :class="{active: current == '/myPatient'}">
          <van-icon class="vicon" name="friends" />我的病人
        </li>
        <li @click="change('/emr','电子病历')" :class="{active: current == '/emr'}">
          <van-icon class="vicon" name="label" />电子病历
        </li>
        <li @click="change('/inHosCon','住院管理')" :class="{active: current == '/inHosCon'}">
          <van-icon class="vicon" name="todo-list" />住院管理
        </li>
        <li @click="change('/reportQuery','报告查询')" :class="{active: current == '/reportQuery'}">
          <van-icon class="vicon" name="search" />报告查询
        </li>
        <li @click="change('/outHosCon','出院管理')" :class="{active: current == '/outHosCon'}">
          <van-icon class="vicon" name="notes-o" />出院管理
        </li>
        <li
          @click="change('/prescriptionCon','处方管理')"
          :class="{active: current == '/prescriptionCon'}"
        >
          <van-icon class="vicon" name="notes-o" />处方管理
        </li>
        <li @click="change('/doctorConsult','就诊咨询')" :class="{active: current == '/doctorConsult'}">
          <van-icon class="vicon" name="notes-o" />就诊咨询
        </li>
        <li @click="change('/profile','个人管理')" :class="{active: current == '/profile'}">
          <van-icon class="vicon" name="notes-o" />个人管理
        </li>
      </ul>
      <div class="people">
        <h3>{{getUname}}</h3>
        <van-icon name="circle" />&nbsp;
        <span @click="logOut">注销用户</span>
      </div>
    </div>
    <!-- 右侧视图 -->
    <div class="right">
      <!-- 顶部标题 -->
      <div class="name">
        <p>{{title}}</p>
      </div>
      <div class="add-icon" v-show="addbingli">
        <p @click="add()">添加病人</p>
      </div>
      <!-- 中间视图 -->
      <div class="view">
        <router-view></router-view>
      </div>
      <!-- 底部对话 -->
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
      current: sessionStorage.getItem("active") || "/myPatient",
      title: sessionStorage.getItem("title") || "我的病人",
      addbingli: sessionStorage.getItem("addbingli") || false
    };
  },
  computed: {
    getUname() {
      return this.$store.state.uname;
    }
  },
  // 监听地址栏路由的变化，修改左侧选项卡高亮状态
  watch: {
    $route(to, from) {
      if (to.path == "/myPatient") {
        this.current = to.path;
        sessionStorage.setItem("active", to.path);
        this.title = "我的病人";
        sessionStorage.setItem("title", "我的病人");
        this.addbingli = false;
        sessionStorage.setItem("addbingli", false);
      } else if (to.path == "/emr") {
        this.current = to.path;
        sessionStorage.setItem("active", to.path);
        this.title = "电子病历";
        sessionStorage.setItem("title", "电子病历");
        this.addbingli = true;
        sessionStorage.setItem("addbingli", true);
      } else if (to.path == "/inHosCon") {
        this.current = to.path;
        sessionStorage.setItem("active", to.path);
        this.title = "住院管理";
        sessionStorage.setItem("title", "住院管理");
        this.addbingli = false;
        sessionStorage.setItem("addbingli", false);
      } else if (to.path == "/reportQuery") {
        this.current = to.path;
        sessionStorage.setItem("active", to.path);
        this.title = "报告查询";
        sessionStorage.setItem("title", "报告查询");
        this.addbingli = false;
        sessionStorage.setItem("addbingli", false);
      } else if (to.path == "/outHosCon") {
        this.current = to.path;
        sessionStorage.setItem("active", to.path);
        this.title = "出院管理";
        sessionStorage.setItem("title", "出院管理");
        this.addbingli = false;
        sessionStorage.setItem("addbingli", false);
      } else if (to.path == "/doctorConsult") {
        this.current = to.path;
        sessionStorage.setItem("active", to.path);
        this.title = "就诊咨询";
        sessionStorage.setItem("title", "出院管理");
        this.addbingli = false;
        sessionStorage.setItem("addbingli", false);
      } else if (to.path == "/prescriptionCon") {
        this.current = to.path;
        sessionStorage.setItem("active", to.path);
        this.title = "处方管理";
        sessionStorage.setItem("title", "出院管理");
        this.addbingli = false;
        sessionStorage.setItem("addbingli", false);
      } else if (to.path == "/profile") {
        this.current = to.path;
        sessionStorage.setItem("active", to.path);
        this.title = "个人信息";
        sessionStorage.setItem("title", "出院管理");
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
        query: {}
      });
    }
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
.home {
  height: 100%;
  display: flex;
  width: 99%;
  height: 99%;
  margin: 0 auto;
  background-image: url("../../assets/bg.jpg");
  background-size: 100% 100%;
}
.left {
  height: 100%;
  width: 250px;
  position: relative;
  background-color: rgba(255, 255, 255, 0.7);
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
  height: 100%;
  position: relative;
}
.name {
  margin-top: 15px;
  margin-left: 100px;
  float: left;
  background-image: url("../../assets/title_bg.png");
  background-size: 100% 90px;
  color: black;
  width: 200px;
  height: 45px;
  line-height: 45px;
  font-weight: 600;
}
.add-icon {
  float: left;
  width: 200px;
  height: 45px;
  line-height: 45px;
  font-weight: 600;
  background-image: url("../../assets/title_bg.png");
  background-size: 100% 90px;
  background-position: 0 134px;
  margin-left: 10px;
  margin-top: 15px;
}
.view {
  width: 95%;
  height: 80%;
  box-shadow: 0 0 1px 1px rgba(200, 200, 200, 0.8);
  margin: 0 auto;
  margin-top: 60px;
  background-color: rgba(255, 255, 255, 0.7);
}
.nav-bar {
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: 0;
  background-color: rgba(255, 255, 255);
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
