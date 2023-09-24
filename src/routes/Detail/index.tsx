import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Card, Button } from 'antd';
import NavHeader from "@/components/NavHeader";
import { getLesson } from '@/api/home';
import { RouteComponentProps } from 'react-router';
import { Lesson } from '@/typings/lesson';
import { StaticContext } from 'react-router';
import { GetLessonData } from '@/typings/lesson';
import { CombinedState } from '@/typings/state'
import actions from '@/store/actions/cart'
const { Meta } = Card;
interface Params { id: string }

type RouteProps = RouteComponentProps<Params, StaticContext, Lesson>;
type Props = RouteProps & {
    children?: any
}


function Detail(props: Props) {
    let [lesson, setLesson] = useState<Lesson>({} as Lesson);
    useEffect(() => {
        (async () => {
            let lesson: Lesson = props.location.state;
            if (!lesson) {
                let id = props.match.params.id;
                let result: GetLessonData = await getLesson<GetLessonData>(id);
                if (result.success)
                    lesson = result.data;
            }
            setLesson(lesson);
        })();
    }, []);

    // 加入购物车
    const addCartItem = (lesson: Lesson) => {
        //https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect
        // let video: HTMLVideoElement = document.querySelector('#lesson-video');

        let cover: HTMLDivElement = document.querySelector('.ant-card-cover');
        let cart: HTMLSpanElement = document.querySelector('.anticon.anticon-shopping-cart');
        let clonedVideo: HTMLVideoElement = cover.cloneNode(true) as HTMLVideoElement;
        let coverWidth = cover.offsetWidth;
        let coverHeight = cover.offsetHeight;
        let cartWidth = cart.offsetWidth;
        let cartHeight = cart.offsetHeight;
        let coverLeft = cover.getBoundingClientRect().left;
        let coverTop = cover.getBoundingClientRect().top;
        let cartRight = cart.getBoundingClientRect().right;
        let cartBottom = cart.getBoundingClientRect().bottom;
        clonedVideo.style.cssText = `
                  z-index: 1000;
                  opacity:0.8;
                  position:fixed;
                  width:${coverWidth}px;
                  height:${coverHeight}px;
                  top:${coverTop}px;
                  left:${coverLeft}px;
                  transition: all 2s ease-in-out;
                `;
        document.body.appendChild(clonedVideo);
        setTimeout(function () {
            clonedVideo.style.left = (cartRight - (cartWidth / 2)) + 'px';
            clonedVideo.style.top = (cartBottom - (cartHeight / 2)) + 'px';
            clonedVideo.style.width = `0px`;
            clonedVideo.style.height = `0px`;
            clonedVideo.style.opacity = '50';
        }, 0);
        props.addCartItem(lesson);
    }
    return (
        <>
            <NavHeader history={props.history}>课程详情</NavHeader>
            <Card
                hoverable
                style={{ width: '100%' }}
                cover={<img src={lesson.poster} />}
            >
                <Meta title={lesson.title} description={
                    <>
                        <p>{`价格：${lesson.price}`}</p>
                        <p>
                            <Button
                                className='add-cart'
                                icon='shopping-cart'
                                onClick={() => addCartItem(lesson)}
                            >
                                加入购物车
                            </Button>
                        </p>
                    </>
                }
                />
            </Card>
        </>
    )
}

let mapStateToProps = (state: CombinedState): CombinedState => state;
export default connect(
    mapStateToProps,
    actions
)(Detail);

/**
 * https://cubic-bezier.com/#0,0,1,1
 * linear:cubic-bezier(0,0,1,1)             匀速运动
 * ease:cubic-bezier(0.25,0.1,0.25,1)       先慢后快再慢
 * ease-in:cubic-bezier(0.42,0,1,1)         先慢后快
 * ease-out:cubic-bezier(0,0,0.58,1)        先快后慢
 * ease-in-out:cubic-bezier(0.42,0,0.58,1)  先慢后快再慢
 */
