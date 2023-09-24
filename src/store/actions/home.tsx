import * as actionTypes from "@/store/actions-types";
import { getSliders, getLessons } from "@/api/home";

export default {
  setCurrentCategory(currentCategory: string) {
    return {
      type: actionTypes.SET_CURRENT_CATEGORY,
      payload: currentCategory,
    };
  },

  getSliders() {
    return {
      type: actionTypes.GET_SLIDERS,
      // getSliders 会返回一个promise，redux-promise中间件会等待promise完成，完成之后会再次向仓库派发action, 其type还是actionTypes.GET_SLIDERS，而payload就是promise成功的结果
      payload: getSliders(),
    };
  },

  getLessons() {
    return (dispatch: any, getState: any) => {
      (async function () {
        let {
          currentCategory,
          lessons: { hasMore, offset, limit, loading },
        } = getState().home;
        if (hasMore && !loading) {
          // 把 loading 置为true, 表示加载中
          dispatch({ type: actionTypes.SET_LESSONS_LOADING, payload: true });
          let result = await getLessons(currentCategory, offset, limit);

          // 再把loading置为true
          dispatch({ type: actionTypes.SET_LESSONS, payload: result.data });
        }
      })();
    };
  },

  // 下拉刷新，更新课程
  refreshLessons() {
    return (dispatch: any, getState: any) => {
      (async function () {
        let {
          currentCategory,
          lessons: { limit, loading },
        } = getState().home;
        if (!loading) {
          dispatch({ type: actionTypes.SET_LESSONS_LOADING, payload: true });
          let result = await getLessons(currentCategory, 0, limit);
          dispatch({ type: actionTypes.REFRESH_LESSONS, payload: result.data });
        }
      })();
    };
  },
};
