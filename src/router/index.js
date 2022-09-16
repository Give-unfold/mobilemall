import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('../views/Home')
const Cart = () => import('../views/Cart')
const Me = () => import('../views/Me')
const Login = () => import('../views/Login')

let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重写push方法 第一个参数
VueRouter.prototype.push = function (location, resolve, reject) {
  // console.log(this);//实例
  // 判断如果成功或失败回调已经传了
  if (resolve && reject) {
    // call 调用函数一次  改变this指向
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => { }, () => { })
  }
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    name: 'Home',
    path: '/home',
    component: Home,
    meta: {
      isShow: true
    }
  },
  {
    path: '/productInfo',
    name: 'CartItem',
    component: () => import('../views/CartItem.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
    meta: {
      isLogin: true
    }
  },
  {
    path: '/likelist',
    name: 'LikeList',
    component: () => import('../views/LikeList'),
    meta: {
      isLogin: true
    }
  },
  {
    path: '/orderConfirm',
    name: 'OrderConfirm',
    component: () => import('../views/OrderConfirm'),
    meta: {
      isLogin: true
    }
  },
  {
    path: '/addressList',
    name: 'AddressList',
    component: () => import('../views/AddressList'),
    meta: {
      isLogin: true
    }
  },
  {
    path: '/success',
    name: 'Success',
    component: () => import('../views/Success'),
    meta: {
      isLogin: true
    }
  },
  {
    path: '/addressEdit',
    name: 'AddressEdit',
    component: () => import('../views/AddressEdit'),
    meta: {
      isLogin: true
    }
  },
  {
    path: '/orderList',
    name: 'OrderList',
    component: () => import('../views/OrderList'),
    meta: {
      isLogin: true
    }
  },
  {
    path: '/orderInfo',
    name: 'OrderInfo',
    component: () => import('../views/OrderInfo'),
    meta: {
      isLogin: true
    }
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('../views/Setting'),
    meta: {
      isLogin: true
    }
  },
  {
    path: '/setUserName',
    name: 'SetUserName',
    component: () => import('../views/SetUserName'),
    meta: {
      isLogin: true
    }
  },
  {
    path: '/setAvatar',
    name: 'SetAvatar',
    component: () => import('../views/SetAvatar'),
    meta: {
      isLogin: true
    }
  },
  {
    path: '/setPassword',
    name: 'SetPassword',
    component: () => import('../views/SetPassword'),
    meta: {
      isLogin: true
    }
  },
  {
    path: '/SetPayPasswords',
    name: 'setPayPasswords',
    component: () => import('../views/SetPayPasswords'),
    meta: {
      isLogin: true
    }
  },
  {
    path: '/me',
    name: 'me',
    component: Me,
    meta: {
      isShow: true
    }
  },
  {
    path: '/citylist',
    name: 'Citylist',
    component: () => import('../views/CityList.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('../views/NotFound')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.isLogin) {
    if (sessionStorage.getItem('token')) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
