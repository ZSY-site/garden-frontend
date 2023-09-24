import React, { PropsWithChildren, useEffect, useState } from "react";
import { connect } from "react-redux";
import { CombinedState, ProfileState, LOGIN_TYPES } from "@/typings/state";
import actions from "../../store/actions/profile";
import { RouteComponentProps } from "react-router-dom";
import { Descriptions, Button, Alert, message, Upload, Icon } from "antd";
import NavHeader from "../../components/NavHeader";
import { AxiosError } from "axios";
import "./index.less";
//当前的组件有三个属性来源
//1.mapStateToProps的返回值 2.actions对象类型 3. 来自路由 4.用户传入进来的其它属性
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
interface Params { }
type RouteProps = RouteComponentProps<Params>;
type Props = PropsWithChildren<StateProps & DispatchProps & RouteProps>;

function Profile(props: Props) {
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    // props.validate().catch((error: AxiosError) => message.error(error.message))
    props.validate()
  }, []);

  // 每当图片变更就会执行该回调
  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {  // 说明是在上传中
      setLoading(true);
    } else if (info.file.status === 'done') {  // 说明上传完了
      // info.file.response 就是上传接口返回的响应体
      // data 是服务器端返回的图片路径
      let { success, data, message } = info.file.response;
      if (success) {
        setLoading(false);
        props.changeAvatar(data);
      } else {
        message.error('上传图片失败', message);
      }
    }
  };

  let content; // 存放着要渲染的内容
  if (props.loginState == LOGIN_TYPES.UN_VALIDATE) {  // 尚未验证
    content = null;
  } else if (props.loginState == LOGIN_TYPES.LOGINED) {  // 已经登录
    const uploadButton = (
      <div>
        {/* plus是个加号 */}
        <Icon type={loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传</div>
      </div>
    );

    content = (
      <div className="user-info">
        <Descriptions title="当前登录用户">
          <Descriptions.Item label="用户名">{props.user.username}</Descriptions.Item>
          <Descriptions.Item label="邮箱">{props.user.email}</Descriptions.Item>
          <Descriptions.Item label="头像">
            <Upload
              name="avatar"  // 字段名
              listType="picture-card"
              className="avatar-uploader" // antd内部提供
              showUploadList={false}
              action="http://localhost:8001/user/uploadAvatar"
              beforeUpload={beforeUpload}
              data={{ userId: props.user.id }}
              onChange={handleChange}
            >
              {
                // props.user.avatar ? <img src={props.user.avatar} alt="avatar" style={{ width: '100%' }} /> : uploadButton
                <img src='http://localhost:8001/uploads/111.png' alt="avatar" style={{ width: '100%' }} />
              }
            </Upload>
          </Descriptions.Item>
        </Descriptions>
        <Button type="danger" onClick={async () => {
          await props.logout();
          props.history.push('/login');
        }}>退出登录</Button>
      </div>
    );
  } else {  // 的确没有登录
    content = (
      <div className="user-info">
        <Alert
          type="warning"
          message="当前未登录"
          description="亲爱的用户你好，你当前尚未登录，请你选择注册或者登录"
        />
        <div style={{ textAlign: "center", padding: ".5rem" }}>
          <Button type="dashed" onClick={() => props.history.push("/login")}>
            登录
          </Button>
          <Button
            type="dashed"
            style={{ marginLeft: ".5rem" }}
            onClick={() => props.history.push("/register")}
          >
            注册
          </Button>
        </div>
      </div>
    );
  }
  return (
    <section>
      <NavHeader history={props.history}>个人中心</NavHeader>
      {content}
    </section>
  );
}


// 判断文件是否合法
function beforeUpload(file: any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('你只能上传JPG或PNG 文件!');
  }

  const isLessThan2M = file.size / 1024 / 1024 < 2;
  if (!isLessThan2M) {
    message.error('图片必须小于2MB!');
  }
  return isJpgOrPng && isLessThan2M;
}

let mapStateToProps = (state: CombinedState): ProfileState => state.profile;
export default connect(mapStateToProps, actions)(Profile);