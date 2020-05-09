<template>
  <div class="report-query-detail">
    <div class="pp">
      <van-button class="btn" v-show="is" @click="change()" type="primary" size="mini">修改信息</van-button>
      <van-button class="btn" v-show="!is" @click="quxiao()" type="primary" size="mini">取消</van-button>
      <van-button class="btn" v-show="!is" @click="baocun()" type="primary" size="mini">保存</van-button>
    </div>
    <div class="header">
      <p>医生姓名:张琳</p>
      <p>性别:{{list.gender == '1' ? '男' : '女'}}</p>
      <p>年龄:21</p>
      <p>出生日期:199-9</p>
      <p>联系电话：166 0335 6584</p>
    </div>
    <ul>
      <li>
        <span>就职医院:</span>
        <textarea :class="{change: !is}" :disabled="is" cols="30" rows="10">
          河南省郑州市第一人民医院
        </textarea>
      </li>
      <li>
        <span>医院级别:</span>
        <textarea :class="{change: !is}" :disabled="is" cols="30" rows="10">三甲</textarea>
      </li>
      <li>
        <span>医院地址:</span>
        <textarea :class="{change: !is}" :disabled="is" cols="30" rows="10">河南省郑州市荥阳市</textarea>
      </li>
      <li>
        <span>所属科室:</span>
        <textarea :class="{change: !is}" :disabled="is" cols="30" rows="10">外科</textarea>
      </li>
      <li>
        <span>医生简介:</span>
        <textarea :class="{change: !is}" :disabled="is" cols="30" rows="10">添加简介......</textarea>
      </li>
      <li>
        <span>工作简介:</span>
        <textarea  :class="{change: !is}" :disabled="is" cols="30" rows="10">添加简介......</textarea>
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
import url from '../../../network/serve'

export default {
  name: "Profile",
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
    // var pram = this.$route.query;
    // var token = sessionStorage.getItem("token");
    // var info = "authorization=" + token + "&checkId=" + pram.id;
    // this.axios.post(url.GET_CHECK_DETAIL, info).then(res => {
    //   if (!res.data.suc) {
    //     this.$router.push("/index");
    //   } else {
    //     console.log(res);
    //     this.list = res.data.result[0];
    //   }
    // });
  }
};
</script>

<style scoped>
.report-query-detail {
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
  height: 50%;
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