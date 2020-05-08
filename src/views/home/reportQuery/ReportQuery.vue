<template>
  <div class="fore">
    <table>
      <thead>
        <tr>
          <th>
            <van-checkbox v-model="checked" icon-size="13px"></van-checkbox>
          </th>
          <th>序号</th>
          <th>姓名</th>
          <th>性别</th>
          <th>年龄</th>
          <th>就诊科室</th>
          <th>诊断类型</th>
          <th>检查时间</th>
          <th>检查项目</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr class="bgc" v-for="(item,index) in list" :key="index">
          <td>
            <van-checkbox v-model="checked" icon-size="13px"></van-checkbox>
          </td>
          <td>{{index + 1}}</td>
          <td>{{item.conName}}</td>
          <td>{{item.gender == '1' ? '男':'女'}}</td>
          <td>{{item.age}}</td>
          <td>{{item.deName}}</td>
          <td>{{item.diType}}</td>
          <td>{{item.seektime}}</td>
          <td>{{item.insp}}</td>
          <td>
            <van-button @click="de(item.checkId)" type="primary" size="mini">查看详情</van-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import url from '../../../network/serve'

export default {
  name: "ReportQuery",
  data() {
    return {
      checked: "",
      list: []
    };
  },
  created() {
    var token = sessionStorage.getItem("token");
    var info = "authorization=" + token + "&pageNo=1&pageSize=5";
    this.axios.post(url.GET_CHECK_REPORT_LIST, info).then(res => {
      if (!res.data.suc) {
        this.$router.push("/index");
      } else {
        // console.log(res);
        this.list = res.data.result;
      }
    });
  },
  methods: {
    de(id) {
      this.$router.push({
        name: "ReportQueryDetail",
        query: {
          id: id
        }
      });
    }
  }
};
</script>

<style scoped>
.fore {
  padding: 30px;
}
table {
  width: 100%;
  border: 1px solid #e9e9e9;
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 12px;
}

th,
td {
  padding: 6px;
  border: 1px solid #e9e9e9;
  text-align: center;
}

th {
  background-color: #f7f7f7;
  color: #5c6b77;
  font-weight: 600;
}
</style>