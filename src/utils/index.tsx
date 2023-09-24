import React, { Suspense, lazy } from "react";

// 上拉加载更多。 ele 要实现此功能 DOM 对象, callback 加载更多的方法
export function loadMore(element: any, callback: any) {
  function _loadMore() {
    // 容器高度
    let clientHeight = element.clientHeight;

    // 向上卷去的高度, scrollTop也可以认为是滚动条滚动了多少
    let scrollTop = element.scrollTop;
    // console.log(scrollTop)

    // 内容的高度
    let scrollHeight = element.scrollHeight;
    console.log("内容的高度:", scrollHeight);

    // +10 可以实现距离底部还有10的时候就加载
    if (clientHeight + scrollTop + 10 >= scrollHeight) {
      // 说明到底部了
      callback();
    }
  }
  // debounce是防抖。使用防抖优化上拉课程菜单
  element.addEventListener("scroll", debounce(_loadMore, 300));
}

// 下拉刷新。
export function downRefresh(element: HTMLDivElement, callback: Function) {
  let startY: number; // 变量，存储接下时候的纵坐标
  let distance: number; // 本次下拉的距离
  let originalTop = element.offsetTop; // 最初此元素距离顶部的距离，在此项目中iphone下就是 50
  let startTop: number;
  let $timer: any = null;

  // touchstart(触摸开始)
  element.addEventListener("touchstart", function (event: TouchEvent) {
    if ($timer) clearInterval($timer);
    let touchMove = throttle(_touchMove, 30);

    //只有当此元素处于原始位置才能下拉，如果处于回弹的过程则不能拉了.并且此元素向上卷去的高度==0
    if (element.offsetTop === originalTop && element.scrollTop === 0) {
      startTop = element.offsetTop;
      startY = event.touches[0].pageY; // 记录当前点击的纵坐标
      element.addEventListener("touchmove", touchMove);
      element.addEventListener("touchend", touchEnd);
    }

    function _touchMove(event: TouchEvent) {
      let pageY = event.touches[0].pageY; // 拿到最新的纵坐标
      if (pageY > startY) {
        // 新的y比旧的y大, 说明是客户是在往下拉，我们想要实现的是下拉刷新
        distance = pageY - startY;
        element.style.top = startTop + distance + "px";
      } else {
        element.removeEventListener("touchmove", touchMove);
        element.removeEventListener("touchend", touchEnd);
      }
    }

    // 客户往下拉了一段距离，就得回弹了。
    function touchEnd(_event: TouchEvent) {
      element.removeEventListener("touchmove", touchMove);
      element.removeEventListener("touchend", touchEnd);
      if (distance > 30) {
        callback();
      }
      $timer = setInterval(() => {
        let currentTop = element.offsetTop;
        if (currentTop - originalTop > 1) {
          element.style.top = currentTop - 1 + "px";
        } else {
          element.style.top = originalTop + "px";
        }
      }, 13);
    }
  });
}

// 防抖
export function debounce(fn: any, wait: number) {
  var timeout: any = null;
  return function () {
    if (timeout !== null) clearTimeout(timeout);
    timeout = setTimeout(fn, wait);
  };
}

// 节流
export function throttle(func: any, delay: number) {
  var prev = Date.now();
  return function () {
    var context = this;
    var args = arguments;
    var now = Date.now();
    if (now - prev >= delay) {
      func.apply(context, args);
      prev = Date.now();
    }
  };
}

export const store = {
  set(key: string, val: string) {
    sessionStorage.setItem(key, val);
  },
  get(key: string) {
    return sessionStorage.getItem(key);
  },
};

const loading = () => <div>Loading...</div>;

/**
 * 实现路由的分割
 * @param {*} loadComponent () => import("./components/Home")
 * @returns
 */
export const dynamic = (loadComponent) => {
  let LazyComponent = lazy(loadComponent);
  return () => (
    <Suspense fallback={loading}>
      <LazyComponent />
    </Suspense>
  );
};
