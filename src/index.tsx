import React from "react";
import ReactDOM from "react-dom";
import { Switch, Route, Redirect } from "react-router-dom";
import store from "./store";
// 多语言配置文件
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { dynamic } from "./utils";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import "./assets/css/common.less";
import Tabs from "./components/Tabs";

// 首页
const LazyHome = dynamic(
  () => import(/* webpackPrefetch: true */ "./routes/Home")
);

import Mine from "./routes/Mine"; // 我的课程
import Profile from "./routes/Profile"; // 个人中心
import Detail from "./routes/Detail"; // 课程详情页
import Cart from "./routes/Cart"; // 购物车

// 路由库
import Register from "./routes/Register";
import Login from "./routes/Login";

import { ConnectedRouter } from "connected-react-router";
import history from "@/history"; // 通过@的方式，ts会报错，只需要在 tsconfig.json 中进行配置就好了

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ConfigProvider locale={zh_CN}>
        <main className="main-container">
          <Switch>
            {/* /的时候是 Home组件 */}
            <Route path="/" exact component={Home} />
            {/* <Route path="/mine" exact component={Mine} /> */}
            <Route path="/profile" exact component={Profile} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/detail/:id" component={Detail} />
            <Route path="/cart" component={Cart} />
          </Switch>
        </main>
        <Tabs />
      </ConfigProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
