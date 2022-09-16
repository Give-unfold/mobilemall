import { requst } from "./request";
import Vue from "vue";

export const reqHomeData = (params) => {
  return requst({
    url: '/product/pagination',
    method: 'get',
    params
  })
}

export const reqCartItem = (id) => requst({
  url: "/product",
  params: { id }
})

export const reqPositionCity = (latitude, longitude) => {
  return Vue.prototype.$jsonp(`http://api.map.baidu.com/geocoder/v2/?ak=C93b5178d7a8ebdb830b9b557abce78b&callback=renderReverse&location=${latitude},${longitude}&output=json&pois=0`)
}

export const reqCityList = () => requst({
  url: '/data/city'
})

// 登录请求
export const reqLogin = (data) => requst({
  url: '/user/signin',
  method: 'post',
  data
})

// 获取用户信息对象
export const reqUserInfo = () => requst({
  url: '/user/info'
})

// 添加收藏
export const addLike = (product_id) => requst({
  url: '/product_like/create',
  method: 'post',
  data: { product_id }
})

// 取消收藏
export const deletLike = (product_id) => requst({
  url: '/product_like/delete',
  params: { product_id }
})

// 购物车列表
export const reqCartList = () => requst({
  url: '/cart/all'
})

// 更新购物车
export const updataCartList = (data) => requst({
  url: '/cart/update',
  method: 'post',
  data
})

// 删除购物车
export const deleteCartList = (product_id) => requst({
  url: '/cart/delete',
  params: { product_id }
})

// 获取带地区编码的城市列表
export const reqAreaList = () => requst({
  url: '/data/area'
})

// 新增收货地址
export const addCreate = (data) => requst({
  url: '/user_address/create',
  method: 'post',
  data
})

// 修改收货地址
export const updaCreate = (id, data) => requst({
  url: '/user_address/update?id=' + id,
  method: 'post',
  data
})

// 删除收货地址
export const deleteCreate = (id) => requst({
  url: "/user_address/delete",
  params: { id }
})

// 下单
export const getOrderCreate = (data) => requst({
  url: '/order/create',
  method: "post",
  data
})

// 付款
export const getOrderPay = (order_id, pay_password) => requst({
  url: '/order/pay?order_id=' + order_id,
  method: 'post',
  data: { pay_password }
})

// 获取单个订单
export const getOrderInfo = (id) => requst({
  url: '/order?id=' + id
})

// 获取订单列表
export const getOrderList = (params) => requst({
  url: '/order/pagination',
  params
})

// 获取收藏夹列表
export const getLikeList = () => requst({
  url: '/product_like/all'
})

// 修改用户昵称
export const updataUsername = (nickname) => requst({
  url: '/user/setting',
  method: 'post',
  data: { nickname }
})

// 上传头像
export const uploadAvatar = (fromData) => requst({
  url: '/user/avatar',
  method: 'post',
  data: fromData
})

// 修改登录密码
export const updataPassword = (data) => requst({
  url: '/user/updatePassword',
  method: 'post',
  data
})

// 修改支付密码
export const updataPayPassword = (data) => requst({
  url: '/user/updatePayPassword',
  method: 'post',
  data
})