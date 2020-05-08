import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import url from '../network/serve'
// axios.defaults.baseURL = "http://www.kuaiyunwl.com:9906";
axios.defaults.baseURL = "http://39.97.245.166:9900";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: sessionStorage.getItem('token') || '',
    uname: sessionStorage.getItem('uname') || '',
  },
  mutations: {
    setToken(state, a) {
      state.token = a;
      sessionStorage.setItem('token', a);
    },
    setName(state, a) {
      state.uname = a;
      sessionStorage.setItem('uname', a);
    },
    // 清空token
    clearToken(state) {
      state.token = "";
      state.uname = "";
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('uname');
    }
  },
  actions: {
    // 登录
    login(store, a) {
      return new Promise(callback => {
        axios.post(url.LOGIN, a).then(res => {
          console.log(res);
          if (res.data.suc) {
            // name和token 存到state和游览器中
            store.commit('setToken', res.data.result.token);
            store.commit('setName', res.data.result.name);
            callback();
          } else {
            alert(res.data.msg);
          }
        })
      })
    },
    // 注销
    logOut(store) {
      var info = 'authorization=' + store.state.token;
      return new Promise(callback => {
        axios.post(url.LOGIN_OUT, info).then(res => {
          // console.log(res);
          store.commit('clearToken');
          callback();
        })
      })
    }
  },
})