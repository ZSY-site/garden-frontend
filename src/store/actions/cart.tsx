import * as actionTypes from "@/store/actions-types";
import { Lesson } from "@/typings/lesson";
import { message } from "antd";
import { push } from "connected-react-router";
// import { StoreGetState, StoreDispatch } from "../index";

export default {
    addCartItem(lesson: Lesson) {
        return function (dispatch: any) {
            dispatch({
                type: actionTypes.ADD_CART_ITEM,
                payload: lesson,
            });
            message.info("添加课程成功");
        };
    },
    removeCartItem(id: string) {
        return {
            type: actionTypes.REMOVE_CART_ITEM,
            payload: id,
        };
    },
    clearCartItems() {
        return {
            type: actionTypes.CLEAR_CART_ITEM,
        };
    },
    changeCartItemCount(id: string, count: number) {
        return {
            type: actionTypes.CHANGE_CART_ITEM_COUNT,
            payload: {
                id,
                count,
            },
        };
    },
    changeCheckedCartItems(checkedIds: string[]) {
        return {
            type: actionTypes.CHANGE_CHECKED_CART_ITEMS,
            payload: checkedIds,
        };
    },
    settle() {
        return function (dispatch: any, getState: any) {
            dispatch({
                type: actionTypes.SETTLE,
            });
            dispatch(push("/"));
        };
    },
};
