import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

const Home = () => import('../views/home/Home.vue')
const Index = () => import('../views/index/Index.vue')

const MyPatient = () => import('../views/home/myPatient/MyPatient.vue')
const Emr = () => import('../views/home/emr/Emr.vue')
const EmrDetail = () => import('../views/home/emr/EmrDetail.vue')
const InHosCon = () => import('../views/home/inHosCon/InHosCon.vue')
const ReportQuery = () => import('../views/home/reportQuery/ReportQuery.vue')
const ReportQueryDetail = () => import('../views/home/reportQuery/ReportQueryDetail.vue')
const ReportQueryCheck = () => import('../views/home/reportQuery/ReportQueryCheck.vue')
const Add = () => import('../components/Add.vue')
const OutHosCon = () => import('../views/home/outHosCon/OutHosCon.vue')
const OutHosConDetail = () => import('../views/home/outHosCon/OutHosConDetail.vue')
const PrescriptionCon = () => import('../views/home/prescriptionCon/PrescriptionCon.vue')
const DoctorConsult = () => import('../views/home/doctorConsult/DoctorConsult.vue')
const Profile = () => import('../views/home/profile/Profile.vue')

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
        redirect: '/myPatient'
      },
      {
        path: '/myPatient',
        component: MyPatient
      },
      {
        path: '/emr',
        component: Emr
      },
      {
        path: '/emrDetail',
        component: EmrDetail,
        name: 'EmrDetail'
      },
      {
        path: '/inHosCon',
        component: InHosCon
      },
      {
        path: '/reportQuery',
        component: ReportQuery
      },
      {
        path: '/reportQueryCheck',
        component: ReportQueryCheck,
        name: 'ReportQueryCheck'
      },
      {
        path: '/reportQueryDetail',
        component: ReportQueryDetail,
        name: 'ReportQueryDetail'
      },
      {
        path: '/add',
        component: Add,
        name: 'Add'
      },
      {
        path: '/outHosCon',
        component: OutHosCon,
        name: 'OutHosCon'
      },
      {
        path: '/outHosConDetail',
        component: OutHosConDetail,
        name: 'OutHosConDetail'
      },
      {
        path: '/doctorConsult',
        component: DoctorConsult,
        name: 'DoctorConsult'
      },
      {
        path: '/prescriptionCon',
        component: PrescriptionCon,
        name: 'PrescriptionCon'
      },
      {
        path: '/profile',
        component: Profile,
        name: 'Profile'
      },
    ]
  },

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

// 全局导航守卫
router.beforeEach((to, from, next) => {

  if (to.path == "/myPatient") {
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