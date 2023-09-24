import React, { PropsWithChildren, useState } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import {
    Table,
    Button,
    InputNumber,
    Popconfirm,
    Icon,
    Row,
    Col,
    Badge,
    Modal,
} from "antd";

import { CombinedState } from "@/typings/state";
import NavHeader from "@/components/NavHeader";
import { Lesson } from "@/typings/lesson";
import { StaticContext } from "react-router";
import actions from "@/store/actions/cart";
import { CartItem } from "@/typings/cart";
interface Params {
    id: string;
}
type RouteProps = RouteComponentProps<Params, StaticContext, Lesson>;
interface Params {
    id: string;
}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
type Props = PropsWithChildren<RouteProps & StateProps & DispatchProps>;
function Cart(props: Props) {
    let [settleVisible, setSettleVisible] = useState(false);
    const confirmSettle = () => {
        setSettleVisible(true);
    };
    const handleOk = () => {
        setSettleVisible(false);
        props.settle();
    };
    const handleCancel = () => {
        setSettleVisible(false);
    };
    const columns = [
        {
            title: "商品",
            dataIndex: "lesson",
            render: (val: Lesson, row: CartItem) => (
                <>
                    <p>{val.title}</p>
                    <p>单价:{val.price}</p>
                </>
            ),
        },
        {
            title: "数量",
            dataIndex: "count",
            render: (val: number, row: CartItem) => (
                <InputNumber
                    size="small"
                    min={1}
                    max={10}
                    value={val}
                    onChange={(value) => props.changeCartItemCount(row.lesson.id, value)}
                />
            ),
        },
        {
            title: "操作",
            render: (val: any, row: CartItem) => (
                <Popconfirm
                    title="是否要删除商品?"
                    onConfirm={() => props.removeCartItem(row.lesson.id)}
                    okText="是"
                    cancelText="否"
                >
                    <Button size="small" type="danger">
                        删除
                    </Button>
                </Popconfirm>
            ),
        },
    ];
    const rowSelection = {
        selectedRowKeys: props.cart
            .filter((item: CartItem) => item.checked)
            .map((item: CartItem) => item.lesson.id),
        onChange: (selectedRowKeys: string[]) => {
            props.changeCheckedCartItems(selectedRowKeys);
        },
    };
    let totalCount: number = props.cart
        .filter((item: CartItem) => item.checked)
        .reduce((total: number, item: CartItem) => total + item.count, 0);
    let totalPrice = props.cart
        .filter((item: CartItem) => item.checked)
        .reduce(
            (total: number, item: CartItem) =>
                total + Number(item.lesson.price) * item.count,
            0
        );
    return (
        <>
            <NavHeader history={props.history}>购物车</NavHeader>
            <Table
                rowKey={(row) => row.lesson.id}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={props.cart}
                pagination={false}
                size="small"
            />
            <Row style={{ padding: "5px" }}>
                <Col span={4}>
                    <Button type="danger" size="small" onClick={props.clearCartItems}>
                        清空
                    </Button>
                </Col>
                <Col span={9}>
                    已经选择{totalCount > 0 ? <Badge count={totalCount} /> : 0}件商品
                </Col>
                <Col span={7}>总价: ¥{totalPrice}元</Col>
                <Col span={4}>
                    <Button type="danger" size="small" onClick={confirmSettle}>
                        去结算
                    </Button>
                </Col>
            </Row>
            <Modal
                title="去结算"
                visible={settleVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>请问你是否要结算?</p>
            </Modal>
        </>
    );
}

let mapStateToProps = (state: CombinedState): CombinedState => state;
export default connect(mapStateToProps, actions)(Cart);
