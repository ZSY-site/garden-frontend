import { AnyAction } from "redux";
import * as ActinoTypes from "@/store/actions-types";
import { LOGIN_TYPES } from "@/typings/state";
export interface ProfileState {
    loginState: LOGIN_TYPES;
    user: any;
    error: string | null;
}

let initialState: ProfileState = {
    loginState: LOGIN_TYPES.UN_VALIDATE,
    user: null,
    error: null,
};
export default function (
    state: ProfileState = initialState,
    action: AnyAction
): ProfileState {
    switch (action.type) {
        case ActinoTypes.VALIDATE:
            if (action.payload.success) {  // 请求路径为：/user/validate 成功了
                return {
                    ...state,
                    loginState: LOGIN_TYPES.LOGINED,
                    user: action.payload.data,
                    error: null,
                };
            } else {   // 请求路径为：/user/validate  失败了
                return {
                    ...state,
                    loginState: LOGIN_TYPES.UN_LOGINED,
                    user: null,
                    error: action.payload,
                };
            }

        // 退出
        case ActinoTypes.LOGOUT:
            return {
                ...state,
                loginState: LOGIN_TYPES.UN_LOGINED,
                user: null,
                error: null,
            };

        case ActinoTypes.CHANGE_AVATAR:
            return {
                ...state,
                user: {
                    ...state.user,
                    avatar: action.payload
                }
            };
        default:
            return state;
    }
    return state
}