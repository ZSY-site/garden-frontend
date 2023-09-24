import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from 'antd'
import './index.less'

function Tabs() {
    return (
        <footer>
            <NavLink exact to="/">
                <Icon type="home" />
                <span>首页</span>
            </NavLink>
            <NavLink to="/cart">
                <Icon type="shopping-cart" />
                <span>购物车</span>
            </NavLink>
            <NavLink to="/profile">
                <Icon type="user" />
                <span>个人中心</span>
            </NavLink>
        </footer>
    )
}

export default Tabs