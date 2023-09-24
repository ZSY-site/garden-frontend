import { RouterState } from 'connected-react-router';
import { Slider } from './slider';
import { Lesson } from './lesson'
import { CartState } from './cart';

export interface Lessons {
    loading: boolean, // 结果正在加载中的话，loading就设为true
    list: Lesson[],
    hasMore: boolean,  // 刚开始肯定为true，如果服务器还有更多的数据，也为true
    offset: number, // 下次去服务器接收数据的时候从哪个索引开始拉
    limit: number  // 限定每次拉的条数
}

export interface HomeState {
    currentCategory: string,
    sliders: Slider[],
    lessons: Lessons
}

export interface MineState { }

export interface User {
    id: string,
    username: string,
    email: string,
    avatar: string
}

export enum LOGIN_TYPES {
    UN_VALIDATE = 'UN_VALIDATE',  // 尚未验证登录状态
    LOGINED = 'LOGINED',  // 已经登录
    UN_LOGINED = 'UN_LOGINED'  // 的确没有登录

}

export interface ProfileState {
    loginState: LOGIN_TYPES,  // 当前的登录状态
    user: User,  // 当前的登录用户
    error: string | null  // 当前的错误信息
}

// RootState的第一种写法
export interface CombinedState {
    home: HomeState,
    mine: MineState,
    profile: ProfileState,
    router: RouterState<any>,
    cart: CartState
}
