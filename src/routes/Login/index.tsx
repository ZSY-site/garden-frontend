import React from "react";
import { connect } from "react-redux";
import actions from "@/store/actions/profile";
import { Link, RouteComponentProps } from "react-router-dom";
import NavHeader from "@/components/NavHeader";
import { Form, Icon, Input, Button, message } from "antd";
import { FormComponentProps } from "antd/lib/form";
import "./index.less";
import { CombinedState } from "@/typings/state";
import { ProfileState } from "@/store/reducers/profile";
import { LoginPayload } from "@/typings/user";
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
interface Params { }
type Props = RouteComponentProps<Params> &
    StateProps &
    DispatchProps &
    FormComponentProps<LoginPayload>;


function Register(props: Props) {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.form.validateFields(async (errors: any, values: LoginPayload) => {
            if (errors) {
                message.error("表单验证失败!");
            } else {
                props.login(values);
            }
        });
    };

    const { getFieldDecorator } = props.form;

    return (
        <>
            <NavHeader history={props.history}>用户登录</NavHeader>
            <Form onSubmit={handleSubmit} className="login-form">
                <Form.Item>
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
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >
                        登录
                    </Button>
                    或者 <Link to="/register">立刻注册!</Link>
                </Form.Item>
            </Form>
        </>
    );
}

const WrappedRegister = Form.create({ name: "login" })(Register);
const mapStateToProps = (state: CombinedState): ProfileState => state.profile;
export default connect(mapStateToProps, actions)(WrappedRegister);
