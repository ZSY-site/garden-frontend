export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY'

export const VALIDATE = 'VALIDATE'
export const LOGOUT = 'LOGOUT'

export const CHANGE_AVATAR = 'CHANGE_AVATAR';


export const GET_SLIDERS = 'GET_SLIDERS';
export const GET_LESSONS = 'GET_LESSONS'
export const SET_LESSONS_LOADING = 'SET_LESSONS_LOADING';
export const SET_LESSONS = 'SET_LESSONS';  // 把数据同步到仓库中
export const REFRESH_LESSONS = 'REFRESH_LESSONS';



export const ADD_CART_ITEM = 'ADD_CART_ITEM'  // 向购物车里添加一个商品
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'  // 从购物车里删除一个商品
export const CLEAR_CART_ITEM = 'CLEAR_CART_ITEM'  // 清空购物车商品
export const CHANGE_CART_ITEM_COUNT = 'CHANGE_CART_ITEM_COUNT'  // 修改购物车里某件商品的数量
export const CHANGE_CHECKED_CART_ITEMS = 'CHANGE_CHECKED_CART_ITEMS'  // 修改哪件商品被选中
export const SETTLE = 'SETTLE'  // 结算，结算的时候，会把选中的商品添加到订单里，并且从购物车中删除
