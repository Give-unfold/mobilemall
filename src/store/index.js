import Vue from 'vue'
import Vuex from 'vuex'
import { reqUserInfo, updataPassword, updataUsername } from "../ajax/Api";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    positionCity: "定位中...",
    cityList: [],
    userInfo: {}
  },
  getters: {
    isLogin() {
      return !!sessionStorage.getItem('token')
    }
  },
  mutations: {
    changePositionCity(state, city) {
      state.positionCity = city
    },
    changeCityList(state, cityList) {
      state.cityList = cityList
    },
    changeUserInfo(state, data) {
      state.userInfo = data
    },
    updataUserInfo(state, { type, obj }) {
      const { likeList } = state.userInfo
      type ? likeList.push(obj) : state.userInfo.likeList = state.userInfo.likeList.filter(item => item.product_id != obj.product_id)
    },
    updataUsername(state, name) {
      state.userInfo.nickname = name
    },
    updataAvatar(state, img) {
      state.userInfo.avatar = img
    },
    updataPassword(state, obj) {
      if (obj.type == 'pay') return state.userInfo.pay_password = obj.password
      state.userInfo.password = obj.password
    }
  },
  actions: {
    syncChangePositionCity({ commit }, city) {
      commit('changePositionCity', city)
    },
    syncChangeCityList({ commit }, list) {
      commit('changeCityList', list)
    },
    async syncChangeUserInfo({ commit }) {
      const res = await reqUserInfo()
      commit('changeUserInfo', res)
    },
    syncUpdataUserInfo({ commit }, parmas) {
      commit('updataUserInfo', parmas)
    },
    syncUpdataAvatar({ commit }, img) {
      commit("updataAvatar", img)
    },
    syncUpdataPassword({ commit }, obj) {
      commit("updataPassword", obj)
    }
  },
  modules: {
  }
})
