import React from "react";
import { connect } from "react-redux";
import actions from "@/store/actions/profile";
import { RouteComponentProps, Link } from "react-router-dom";
import NavHeader from "@/components/NavHeader";

import { Form, Icon, Input, Button, message } from "antd";

// props.form 的类型就是 FormComponentProps
import { FormComponentProps } from "antd/lib/form";
import { CombinedState, ProfileState } from "@/typings/state";
import "./index.less"; 
import { RegisterPayload } from "@/typings/user";
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
interface Params { }

type Props = RouteComponentProps<Params> &
    StateProps &
    DispatchProps &
    FormComponentProps<RegisterPayload>;

function Register(props: Props) {
    // 事件源是 HTMLFormElement 
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // 验证字段对不对，如果不对的话会自动滚动到不对的地方
        props.form.validateFields(async (errors: any, values: RegisterPayload) => {
            if (errors) {  // errors 有值表示有某字段校验不通过
                message.error("表单验证失败!");
            } else {  // 输入全部合法，则调用接口进行注册
                props.register(values);
            }
        });
    };
    // getFieldDecorator 也是一个高阶组件
    const { getFieldDecorator } = props.form;
    return (
        <>
            <NavHeader history={props.history}>用户注册</NavHeader>
            <Form onSubmit={handleSubmit} className="login-form">
                <Form.Item>
                    {/* 使用getFieldDecorator进行表单验证，getFieldDecorator是一个高阶组件 */}
                    {getFieldDecorator("username", {
                        rules: [{ required: true, message: "请输入你的用户名!" }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                            placeholder="用户名"
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator("password", {
                        rules: [{ required: true, message: "请输入你的密码!" }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                            type="password"
                            placeholder="密码"
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator("confirmPassword", {
                        rules: [{ required: true, message: "请输入你的确认密码!" }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                            type="password"
                            placeholder="确认密码"
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator("email", {
                        rules: [{ required: true, message: "请输入你的邮箱!" }, {
                            pattern: /@/, message: "邮箱格式不正确"
                        }],
                    })(
                        <Input
                            prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
                            type="email"
                            placeholder="邮箱"
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >
                        注册
                    </Button>
                    或者 <Link to="/login">立刻登录!</Link>
                </Form.Item>
            </Form>
        </>
    );
}

// 可以把一个组件传给 Form.create() 的返回值。WrappedRegister就是包装后的组件,是高阶组件，它会向来的 Register 组件传递属性form
// 下面的 name 一般没有用
const WrappedRegister = Form.create({ name: "login" })(Register);

let mapStateToProps = (state: CombinedState): ProfileState => state.profile;
export default connect(
    mapStateToProps,
    actions
)(WrappedRegister);