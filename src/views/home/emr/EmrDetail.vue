<template>
  <div class="two-detail">
    <div></div>
    <div class="item" @click="check()" v-for="(item,index) in list" :key="index">
      <p>
        就诊时间:
        <span>{{item.seektime}}</span>
      </p>
    </div>
  </div>
</template>

<script>
import url from '../../../network/serve'

export default {
  name: "EmrDetail",
  data() {
    return {
      list: []
    };
  },
  methods: {
    check() {
      this.$router.push('/check');
    }
  },
  created() {
    var meId = this.$route.query.meId;
    var token = sessionStorage.getItem("token");
    var info = "authorization=" + token + "&meId=" + meId;
    this.axios.post(url.GET_MED_LIST_DETAIL, info).then(res => {
      if (!res.data.suc) {
        this.$router.push("/index");
      } else {
        console.log(res.data.result);
        this.list = res.data.result;
      }
    });
  }
};
</script>

<style scoped>
.item {
  width: 20%;
  height: 20%;
  border: 1px solid black;
  cursor: pointer;
}
.two-detail {
  width: 100%;
  height: 100%;
  padding: 25px;
}
</style>