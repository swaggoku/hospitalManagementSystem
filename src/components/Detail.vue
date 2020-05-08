<template>
  <div class="detail">
    <div class="pp">
      <van-button class="btn" v-show="is" @click="change()" type="primary" size="mini">修改信息</van-button>
      <van-button class="btn" v-show="!is" @click="quxiao()" type="primary" size="mini">取消</van-button>
      <van-button class="btn" v-show="!is" @click="baocun()" type="primary" size="mini">保存</van-button>
    </div>
    <div class="header">
      <p>姓名:{{list.conName}}</p>
      <p>性别:{{list.gender == '1' ? '男' : '女'}}</p>
      <p>年龄:{{list.age}}</p>
      <p>科别:{{list.deName}}</p>
      <p>诊断类型:{{list.diType == '1' ? '初诊' : '复诊'}}</p>
    </div>
    <ul>
      <li>
        <span>临床诊断:</span>
        <textarea v-model="list.symptom" :class="{change: !is}" :disabled="is" cols="30" rows="10"></textarea>
      </li>
      <li>
        <span>大体检查:</span>
        <textarea v-model="list.dtjc" :class="{change: !is}" :disabled="is" cols="30" rows="10"></textarea>
      </li>
      <li>
        <span>检查结果:</span>
        <textarea v-model="list.result" :class="{change: !is}" :disabled="is" cols="30" rows="10"></textarea>
      </li>
      <li>
        <span>检查时间:</span>
        <textarea v-model="list.seektime" :class="{change: !is}" :disabled="is" cols="30" rows="10"></textarea>
      </li>
      <li>
        <span>免疫/组化:</span>
        <textarea v-model="list.mianyi" :class="{change: !is}" :disabled="is" cols="30" rows="10"></textarea>
      </li>
      <li>
        <span>备注:</span>
        <textarea v-model="list.mark" :class="{change: !is}" :disabled="is" cols="30" rows="10"></textarea>
      </li>
    </ul>
    <div class="footer">
      <p>报告医师:{{list.bgysName}}</p>
      <p>审核医生:{{list.shysName}}</p>
      <p>报告时间:{{list.seektime}}</p>
      <!-- <van-button type="primary" size="mini">查看附件</van-button> -->
    </div>
  </div>
</template>

<script>
import url from '../network/request'

export default {
  name: "Detail",
  data() {
    return {
      list: [],
      is: true
    };
  },
  methods: {
    change() {
      this.is = false;
    },
    quxiao() {
      this.is = true;
    }
  },
  created() {
    var pram = this.$route.query;
    var token = sessionStorage.getItem("token");
    var info = "authorization=" + token + "&checkId=" + pram.id;
    this.axios.post(url.GET_CHECK_DETAIL, info).then(res => {
      if (!res.data.suc) {
        this.$router.push("/index");
      } else {
        console.log(res);
        this.list = res.data.result[0];
      }
    });
  }
};
</script>

<style scoped>
.detail {
  width: 100%;
  height: 100%;
  padding: 20px;
}
.header,
.footer {
  font-size: 12px;
  display: flex;
  justify-content: space-around;
}
ul {
  width: 100%;
  height: 70%;
}
ul li {
  height: 13%;
  width: 100%;
  margin-top: 10px;
  /* border: 1px solid black; */
}
ul li span {
  font-size: 14px;
  font-weight: 600;
  display: inline-block;
  width: 10%;
  text-align: left;
}
ul li textarea {
  width: 80%;
  height: 80%;
  font-size: 13px;
  vertical-align: top;
  resize: none;
  border: none;
  background-color: rgba(10, 10, 10, 0.1);
}
.pp {
  width: 100%;
  height: 30px;
  /* border: 1px solid black; */
}
.change {
  background-color: #fff;
  border: 1px solid black;
}
</style>