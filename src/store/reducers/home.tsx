import { AnyAction } from "redux";
import { HomeState } from '@/typings/state'
import * as actionTypes from '@/store/actions-types'
// import { Slider } from '@/typings/slider'

let initialState: HomeState = {
    currentCategory: 'all',
    sliders: [],
    lessons: {
        loading: false,
        list: [],
        hasMore: true,
        offset: 0,
        limit: 5
    }
};

export default function (
    state: HomeState = initialState,
    action: AnyAction
): HomeState {
    switch (action.type) {
        case actionTypes.SET_CURRENT_CATEGORY:
            return { ...state, currentCategory: action.payload }
        case actionTypes.GET_SLIDERS:
            return { ...state, sliders: action.payload.data };
        case actionTypes.SET_LESSONS_LOADING:
            state.lessons.loading = action.payload;
            return state;

        // 原本下面是不行的，因为redux规定reducer不要改对象，永远都会返回一个新对象，这是优化，如果想要实现如下的效果，那么就得使用 immer
        case actionTypes.SET_LESSONS:
            state.lessons.loading = false;
            state.lessons.hasMore = action.payload.hasMore;
            state.lessons.list = [...state.lessons.list, ...action.payload.list];
            state.lessons.offset = state.lessons.offset + action.payload.list.length;
            return state;
        case actionTypes.REFRESH_LESSONS:
            state.lessons.loading = false;
            state.lessons.hasMore = action.payload.hasMore;
            state.lessons.list = action.payload.list;
            state.lessons.offset = action.payload.list.length;
            return state;
        default:
            return state;
    }
}
