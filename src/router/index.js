import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

const Home = () => import('../views/home/Home.vue')
const Index = () => import('../views/index/Index.vue')
const One = () => import('../components/One.vue')
const Two = () => import('../components/Two.vue')
const Three = () => import('../components/Three.vue')
const Fore = () => import('../components/Fore.vue')
const Detail = () => import('../components/Detail.vue')
const TwoDetail = () => import('../components/TwoDetail.vue')
const Check = () => import('../components/Check.vue')
const Add = () => import('../components/Add.vue')

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'Index',
    component: Index
  },
  {
    path: '/home',
    component: Home,
    children: [{
        path: '/',
        redirect: '/one'
      },
      {
        path: '/one',
        component: One
      },
      {
        path: '/two',
        component: Two
      },
      {
        path: '/three',
        component: Three
      },
      {
        path: '/fore',
        component: Fore
      },
      {
        path: '/check',
        component: Check,
        name: 'Check'
      },
      {
        path: '/twoDetail',
        component: TwoDetail,
        name: 'TwoDetail'
      },
      {
        path: '/Detail',
        component: Detail,
        name: 'Detail'
      },
      {
        path: '/Add',
        component: Add,
        name: 'Add'
      }
    ]
  },

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

// 全局导航守卫
router.beforeEach((to, from, next) => {

  if (to.path == "/one") {
    sessionStorage.setItem("active", to.path);
    sessionStorage.setItem("title", "我的病人");
  }

  var token = sessionStorage.getItem('token');
  if (to.path == '/index') {
    if (token) {
      store.dispatch('logOut');
      next();
    } else {
      next();
    }
  } else {
    if (token) {
      next();
    } else {
      next('/index');
    }
  }
})

export default router