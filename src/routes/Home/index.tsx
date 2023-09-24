import React, { PropsWithChildren, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import mapDispatchToProps from "@/store/actions/home";

import LessonList from "./components/ProductList";
import { loadMore, downRefresh, store } from "@/utils";

import { CombinedState } from "@/typings/state";
import HomeHeader from "./components/HomeHeader";
import HomeSliders from "./components/HomeSliders";

import "./index.less";

type Props = PropsWithChildren<
  RouteComponentProps &
    ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps
>;

// 该组件是路由组件，所以它的props属性会包括路由属性，所以需要用到 RouteComponentProps
// 同时该组件需要连接仓库，所以需要使用到 connect
function Home(props: Props) {
  let homeContainerRef = useRef<HTMLDivElement>(null);

  const lessonListRef = useRef(null);
  useEffect(() => {
    // 上拉加载更多
    loadMore(homeContainerRef.current, props.getLessons);

    // 下拉刷新
    downRefresh(homeContainerRef.current, props.refreshLessons);
    homeContainerRef.current.addEventListener("scroll", () => {
      lessonListRef.current();
    });

    // if (props.lessons) {
    //     homeContainerRef.current.scrollTop = store.get('homeScrollTop');
    // }

    // return () => {
    //     store.set('homeScrollTop', homeContainerRef.current.scrollTop);
    // }
  }, []);
  return (
    <>
      <HomeHeader
        currentCategory={props.currentCategory}
        setCurrentCategory={props.setCurrentCategory}
        refreshLessons={props.refreshLessons}
      />

      <div className="home-container" ref={homeContainerRef}>
        {/* 轮播图组件 */}
        <HomeSliders sliders={props.sliders} getSliders={props.getSliders} />

        {/* 课程列表组件 */}
        <LessonList
          ref={lessonListRef}
          container={homeContainerRef}
          lessons={props.lessons}
          getLessons={props.getLessons}
        />
      </div>
    </>
  );
}

const mapStateToProps = (state: CombinedState) => state.home;
export default connect(mapStateToProps, mapDispatchToProps)(Home);
