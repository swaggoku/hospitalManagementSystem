import axios from 'axios'
import Vue from 'vue'
import {
  Toast
} from 'vant';

Vue.use(Toast);

// 创建axios实例对象
var instance = axios.create();

instance.defaults.baseURL = "http://39.97.245.166:9900";
// axios拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  var token = sessionStorage.getItem("token");
  if (config.method == 'post') {
    config.data += "&authorization=" + token
  } else if (config.method == 'get') {
    config.params.authorization = token
  }

  Toast.loading({
    message: '加载中...',

    duration: 0
  });

  // console.log("开始发请求", config);
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // console.log("请求完成", response);
  Toast.clear();
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});



export default instance;