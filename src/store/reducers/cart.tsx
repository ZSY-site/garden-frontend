import { AnyAction } from "redux";
import { CartState } from "@/typings/cart";
import * as actionTypes from "@/store/actions-types";
let initialState: CartState = [];
export default function (
    state: CartState = initialState,
    action: AnyAction
): CartState {
    switch (action.type) {
        // 向购物车添加条目，如果已经有商品，则数量加1，没有则添加一个条目
        case actionTypes.ADD_CART_ITEM:
            let oldIndex = state.findIndex(
                (item) => item.lesson.id === action.payload.id
            );
            if (oldIndex == -1) {
                return [
                    ...state,
                    {
                        checked: false,
                        count: 1,
                        lesson: action.payload,
                    },
                ];
            } else {
                let lesson = state[oldIndex];
                return [
                    ...state.slice(0, oldIndex),
                    { ...lesson, count: lesson.count + 1 },
                    ...state.slice(oldIndex + 1),
                ];
            }

        // 删除条目
        case actionTypes.REMOVE_CART_ITEM:   // {type: REMOVE_CART_ITEM, payload: id}
            let removeIndex = state.findIndex(
                (item) => item.lesson.id === action.payload
            );
            return [...state.slice(0, removeIndex), ...state.slice(removeIndex + 1)];

        // 清空购物车
        case actionTypes.CLEAR_CART_ITEM:
            return [];

        // 改变购物车数量
        case actionTypes.CHANGE_CART_ITEM_COUNT:
            return state.map((item) => {
                if (item.lesson.id === action.payload.id) {
                    item.count = action.payload.count;
                }
                return item;
            });

        // 改变选中的条目
        case actionTypes.CHANGE_CHECKED_CART_ITEMS:
            let checkedIds = action.payload;
            return state.map((item) => {
                if (checkedIds.includes(item.lesson.id)) {
                    item.checked = true;
                } else {
                    item.checked = false;
                }
                return item;
            });

        // 结算
        case actionTypes.SETTLE:
            return state.filter((item) => !item.checked);
        default:
            return state;
    }
}
