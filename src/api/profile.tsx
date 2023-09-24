import axios from "./index";
import { RegisterPayload, LoginPayload } from '../typings/user';

export function validate() {
    // axios.get() 执行返回的是promise
    return axios.get("/user/validate");
}

// 注册接口. 下面的T其实代表的就是真正的返回的数据
export function register<T>(values: RegisterPayload) {
    return axios.post<T, T>('/user/register', values);
}

// 登录接口
export function login<T>(values: LoginPayload) {
    return axios.post<T, T>('/user/login', values);
}
