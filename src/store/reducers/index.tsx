import { ReducersMapObject, AnyAction, Reducer } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import history from '@/history';
import home from './home';
import mine from './mine';
import profile from './profile';
import cart from './cart';
import produce from 'immer';
import { combineReducers } from 'redux-immer'

// RootState的第一种写法,见 @/typings/state 文件
import { CombinedState } from '@/typings/state'

let reducers: ReducersMapObject<CombinedState, AnyAction> = {
    home,
    mine,
    profile,
    cart,
    router: connectRouter(history)
}

let rootReducer: Reducer<CombinedState, AnyAction> = combineReducers(produce, reducers);


// RootState的第二种写法，感觉这个更好理解欸
// export type RootState = {
//     // typeof reducers 拿到的是 reducers对象的类型声明，也就长这样：{home: 函数的类型声明, mime: xxx, ......}
//     // keyof typeof reducers 拿到的是reducers对象的类型声明中的属性的联合声明: 'home' | 'mine' | ......
//     [key in keyof typeof reducers]: ReturnType<typeof reducers[key]>
// }

export default rootReducer;