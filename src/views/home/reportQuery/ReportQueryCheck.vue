<template>
  <div id>
    <h1>病历查看</h1>
    <div class="upload">
      <input type="file" accept="image/*" @change="upload($event)" />
      <button @click="show">查看</button>
      <div class="mask" v-show="is"></div>
    </div>
  </div>
</template>

<script>
import url from '../../../network/serve'

export default {
  name: "ReportQueryCheck",
  data() {
    return {
      is: false
    };
  },
  methods: {
    upload(e) {
      var img = e.target.files[0];
      var data = new FormData();
      var token = sessionStorage.getItem("token");
      data.append("file", img);
      data.append("authorization", token);

      this.axios.post(url.UPLOAD, data).then(res => {
        console.log(res);
      });
    },
    show() {
      this.is = true;
    }
  }
};
</script>

<style scoped>
.upload {
  width: 300px;
  height: 150px;
  border: 1px solid #cdcdcd;
  background-image: url("../../../assets/logo.png");
  background-size: 30%;
  background-repeat: no-repeat;
  background-position: center;
}
.upload input {
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
}
.mask {
  width: 400px;
  height: 400px;
  position: fixed;
  top: 100px;
  left: 50%;
  background: rgba(0, 0, 0, 0.5);
}
</style>