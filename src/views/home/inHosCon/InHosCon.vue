<template>
  <div class="emr">
    <input class="in" @keydown.enter="search" v-model="conName" type="text" placeholder="请输入用户名" />
    <input class="in" v-model.trim="seekTime" type="text" placeholder="请输入就诊时间" />
    <table>
      <thead>
        <tr>
          <th>
            <input type="checkbox" @change="change($event)" v-model="checkAll" />
          </th>
          <th>序号</th>
          <th>姓名</th>
          <th>性别</th>
          <th>年龄</th>
          <th>病房号</th>
          <th>就诊时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in list" :key="index">
          <td>
            <input type="checkbox" @change="changee($event)" v-model="item.isCheck" />
          </td>
          <td>{{index+1}}</td>
          <td>{{item.conName}}</td>
          <td>{{item.sex = 1 ? '男':'女'}}</td>
          <td>{{item.age}}</td>
          <td>2056</td>
          <td>{{item.seektime}}</td>
          <td>
            <van-button @click="detail(item.meId)" type="primary" size="mini">解决问题</van-button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 分页 -->
    <van-pagination
      class="page"
      v-model="currentPage"
      @change="jump()"
      :total-items="alls"
      :items-per-page="10"
      :show-page-size="5"
      force-ellipses
    />
    <!-- 批量删除 -->
    <van-button class="del" @click="del" type="primary" size="small">批量删除</van-button>
  </div>
</template>

<script>
import url from "../../../network/serve";

export default {
  name: "InHosCon",
  data() {
    return {
      list: [],
      checkAll: false,
      currentPage: 1,
      alls: 100,
      conName: "",
      seekTime: ""
    };
  },
  created() {
    this.getList();
    this.getListCount();
  },
  methods: {
    // 获取电子病历
    getList() {
      var info =
        "&pageNo=" +
        this.currentPage +
        "&pageSize=10" +
        "&conName=" +
        this.conName +
        "&seekTime=" +
        this.seekTime;
      this.axios.post(url.GET_MED_LIST, info).then(res => {
        if (!res.data.suc) {
          this.$router.push("/index");
        } else {
          console.log(res);
          res.data.result.forEach((item, index, arr) => {
            this.$set(item, "isCheck", false);
          });
          this.list = res.data.result;
        }
      });
    },
    // 获取电子病历行数
    getListCount() {
      var info = "&pageNo=" + this.currentPage + "&pageSize=20";
      this.axios.post(url.GET_MED_LIST_COUNT, info).then(res => {
        if (!res.data.suc) {
          this.$router.push("/index");
        } else {
          this.alls = res.data.result;
        }
      });
    },
    // 搜索
    search() {
      this.getList();
      this.getListCount();
      this.conName = "";
    },
    // 详情页跳转
    detail(meId) {
      
    },
    // 单选
    change(e) {
      this.list.forEach((item, index, arr) => {
        item.isCheck = e.target.checked;
      });
    },
    // 全选
    changee() {
      for (var i = 0; i < this.list.length; i++) {
        if (!this.list[i].isCheck) {
          this.checkAll = false;
          return;
        } else {
          this.checkAll = true;
        }
      }
    },
    // 删除
    del() {
      var length = this.list.length;
      if (confirm("确定删除吗")) {
        while (length > 0) {
          length--;
          if (this.list[length].isCheck) {
            var info = +"&meIds=" + this.list[length].meId;
            this.axios.post(url.DEL_MEDS, info).then(res => {
              if (!res.data.suc) {
                this.$router.push("/home");
              } else {
                this.list.splice(length, 1);
                this.currentPage = 1;
                this.getList();
                this.getListCount();
              }
            });
          }
        }
      }
    },
    // 页码跳转
    jump() {
      this.getList();
    }
  }
};
</script>

<style scoped>
.emr {
  /* position: relative; */
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
  padding: 8px 14px;
  border: 1px solid #e9e9e9;
  text-align: center;
}

th {
  background-color: #f7f7f7;
  color: #5c6b77;
  font-weight: 600;
}
.in {
  border-radius: 10px;
  border: 1px solid #cdcdcd;
  margin-left: 10px;
  margin-bottom: 5px;
}
.page {
  
  width: 300px;
  float: left;
}
.del {
  margin-left: 20px;
  margin-top: 5px;
  float: left;
}
</style>