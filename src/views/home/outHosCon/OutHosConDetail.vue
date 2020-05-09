<template>
  <div class="container">
    <div class="top">
      <ul class="ul1">
        <li>姓名：{{list.conName}}</li>
        <li>性别：{{list.gender == "1" ? "男" : "女"}}</li>
        <li>年龄：{{list.age}}</li>
        <li>科室：{{list.deName}}</li>
        <li>住院时间：{{list.seektime}}</li>
      </ul>
      <br />
      <ul class="ul2">
        <li>住院号：032564</li>
        <li>病床号：005</li>
        <li>主治医生：徐医生</li>
        <li>护士：小刘</li>
      </ul>
    </div>
    <div class="center">
      <ul>
        <li>诊断症状：骨折</li>
        <li>手术：钢板固定</li>
        <li>恢复情况：还不错</li>
        <li>备注：无</li>
      </ul>
    </div>
    <div class="bottom">
      <ul>
        <li>出院时间：2018-12-31</li>
        <li>核准医生：王医生</li>
      </ul>
      <div class="hiddens">
        <button class="btn" @click="print">打印证明</button>
      </div>
    </div>
  </div>
</template>

<script>
import url from "../../../network/serve";

export default {
  name: "OutHosConDetail",
  data() {
    return {
      list: [],
      currentPage: 1,
      conName: "",
      seekTime: ""
    };
  },
  created() {
    this.getList();
  },
  methods: {
    print() {
      // 1.设置打印的区域
      var printArea = document.getElementsByClassName("container")[0];
      // 2.把原来body页面中的内容备份
      var oldHtml = document.body.innerHTML;
      // 3.获取body元素,准备进行替换
      var newBody = document.body;
      // 4.替换body中内容为打印内容
      newBody.innerHTML = printArea.innerHTML;
      // 5.获取需要隐藏的元素d
      var hiddenHtml = document.getElementsByClassName("hiddens")[0];
      // 6.隐藏
      hiddenHtml.classList.add("printHidden");
      // 7.打印
      window.print();
      // 8.重置HTML页面
      document.body.innerHTML = oldHtml;
      // 9.刷新页面
      location.reload();
    },
    // 获取电子病历
    getList() {
      var token = sessionStorage.getItem("token");
      var info = "&pageNo=1&pageSize=5";
      this.axios.post(url.GET_CHECK_REPORT_LIST, info).then(res => {
        if (!res.data.suc) {
          this.$router.push("/index");
        } else {
          console.log(res.data.result);
          this.list = res.data.result;
        }
      });
    }
  }
};
</script>

<style scoped>
.printHidden {
  display: none;
}
.btn {
  border-radius: 50px;
  border: none;
  width: 200px;
  height: 25px;
  margin: 10px;
  background-color: rgb(135, 233, 218);
  cursor: pointer;
}
.container {
  width: 95%;
  margin: 0 auto;
  height: 100%;
}
.container .top {
  width: 100%;
  height: 20%;
}
.center {
  width: 100%;
  height: 65%;
  border-top: 1px solid #cdcdcd;
  border-bottom: 1px solid #cdcdcd;
}
.bottom {
  width: 100%;
  height: 15%;
}
.ul2,
.ul1 {
  width: 100%;
  height: 30px;
  font-size: 13px;
  display: flex;
  justify-content: space-around;
}
.ul1 li {
  float: left;
}
.ul2 li {
  float: left;
}
.center ul {
  float: left;
  font-size: 13px;
}
.center ul li {
  margin-top: 60px;
}
.bottom ul {
  float: left;
  font-size: 13px;
}
.bottom ul li {
  float: left;
  margin-top: 10px;
  margin-left: 50px;
}
</style>