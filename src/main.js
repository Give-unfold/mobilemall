import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './vant/index.js'
import { reqPositionCity, reqCityList } from './ajax/Api'
import { VueJsonp } from 'vue-jsonp'
Vue.use(VueJsonp)

navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
  reqPositionCity(latitude, longitude).then(({ result: { addressComponent: { city } } }) => {
    store.dispatch('syncChangePositionCity', city)
  })
})

reqCityList().then(({ cities }) => {
  store.dispatch('syncChangeCityList', cities)
})

store.dispatch('syncChangeUserInfo')

Vue.config.productionTip = false
Vue.prototype.$http = axios;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')