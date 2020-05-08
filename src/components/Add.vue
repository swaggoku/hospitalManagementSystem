<template>
  <div class="add">
    <div class="top">
      <h3>病历夹</h3>
      <div class="content">
        <div class="left">
          <span>患者姓名</span>
          <input type="text" />
        </div>
        <div class="center">
          <span>就诊科室</span>
          <input type="text" />
        </div>
        <div class="right">
          <span>用药详情</span>
          <input type="text" />
        </div>
      </div>
    </div>
    <div class="bottom">
      <van-button @click="add" type="primary" size="mini">确认添加</van-button>
      <van-button type="primary" size="mini">取消</van-button>
    </div>
  </div>
</template>

<script>
import url from '../network/serve'

export default {
  name: "Add",
  data() {
    return {
      info: {
        conNo: "1",
        startTime: "",
        phone: 13283985506
      }
    };
  },
  methods: {
    add() {
      var token = sessionStorage.getItem("token");
      var info =
        "authorization=" +
        token +
        "&conNo=111115&phone=18042845678&deId=1&docId=1&comment=qwwe";
      this.axios.post(url.ADD_MED, info).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style scoped>
.add {
  width: 100%;
  height: 100%;
}
.top {
  width: 100%;
  height: 90%;
}
.top h3 {
  border-bottom: 1px solid #cdcdcd;
  padding: 5px;
}
.bottom {
  margin-top: 15px;
}
.content {
  display: flex;
  /* justify-content: space-around; */
  height: 90%;
}
.content span {
  font-size: 13px;
}
.content input {
  width: 90%;
  height: 15px;
  margin-top: 10px;
}
.left {
  height: 100%;
  flex: 1;
}
.center {
  height: 100%;
  flex: 1;
  border-left: 1px solid #cdcdcd;
  border-right: 1px solid #cdcdcd;
}
.right {
  height: 100%;
  flex: 1;
}
</style>