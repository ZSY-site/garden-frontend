import React from "react";
import "./index.less";
import { Icon } from "antd";
import _ from "lodash";
import moment from "moment";

console.log(_.chunk(["a", "b", "c", "d"], 2));
// 设置语言为中文
moment.locale("zh-cn");
let r = moment().endOf("day").fromNow();
console.log(r); // 输出：距离今天结束还有几个小时

interface Props {
  history: any;
  children: any;
}

export default function NavHeader(props: Props) {
  return (
    <header className="nav-header">
      <Icon type="left" onClick={() => props.history.goBack()} />
      {props.children}
    </header>
  );
}
