<template>
  <div class="container">
    <h3>悯农</h3>
    <h4>
      春种一粒粟，秋收万颗子。
      <br />四海无闲田，农夫犹饿死。
      <br />锄禾日当午，汗滴禾下土。
      <br />谁知盘中餐，粒粒皆辛苦。
      <br />
    </h4>
    <div class="hiddens">
      <van-button @click="print" type="primary" size="small">打印证明</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "OutHosConDetail",
  data() {
    return {};
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
      var hiddenHtml = document.getElementsByClassName('hiddens')[0];
      // 6.隐藏
      hiddenHtml.classList.add('printHidden');
      // 7.打印
      window.print();
      // 8.重置HTML页面
      document.body.innerHTML = oldHtml;
      // 9.刷新页面
      location.reload();
    }
  }
};
</script>

<style scoped>
.printHidden {
  display: none;
}
</style>