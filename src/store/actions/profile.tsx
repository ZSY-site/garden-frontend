import { AnyAction } from "redux";
import * as actionTypes from '@/store/actions-types'
import { validate, register, login } from '@/api/profile'
import { push } from 'connected-react-router';
import { RegisterPayload, RegisterResult, LoginPayload, LoginResult } from "@/typings/user";
import { message } from "antd";

export default {
    // 验证token的合法性
    validate(): AnyAction {
        return {
            type: actionTypes.VALIDATE,
            // 下面的validate()执行返回的是promise，那么redux-promise中间件就起作用了，它发现payload返回的是promise，那么就会重新派发，不过此时的payload就是promise执行完毕后的结果了
            payload: validate(),
        };
    },

    // 退出
    logout() {
        // 下面为什么可以返回一个函数，靠的是 redux-thunk 中间件
        return function (dispatch: any) {
            sessionStorage.removeItem('access_token');
            dispatch({ type: actionTypes.LOGOUT });
            // 跳转到登录页面
            dispatch(push('/login'));
        }
    },

    // 注册
    register(values: RegisterPayload) {
        return function (dispatch: any) {
            (async function () {
                try {
                    let result: RegisterResult = await register<RegisterResult>(values);
                    if (result.success) {
                        // push方法会返回一个action
                        dispatch(push('/login'));
                    } else {
                        message.error(result.message);
                    }
                } catch (error) {
                    message.error('注册失败');
                }
            })();
        }
    },

    // 登录
    login(values: LoginPayload) {
        return function (dispatch: any) {
            (async function () {
                try {
                    let result: LoginResult = await login<LoginResult>(values);
                    if (result.success) {
                        sessionStorage.setItem('access_token', result.data.token);
                        dispatch(push('/profile'));
                    } else {
                        message.error(result.message);
                    }
                } catch (error) {
                    message.error('登录失败');
                }
            })();
        }
    },

    // 改变头像
    changeAvatar(avatar: string) {
        return {
            type: actionTypes.CHANGE_AVATAR,
            payload: avatar
        }
    },

    
};