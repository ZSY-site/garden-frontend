import React, { useState, CSSProperties } from 'react';
import './index.less';
import { Icon } from 'antd';
import classnames from 'classnames';
// 动画库
import { Transition } from 'react-transition-group';
/**
 * 动哈是怎么实现的：
 * 1. 动态的给一个元素增加和删除类名，不同的类名对应不同的样式
 * 2. 另外再加一个transition效果就可以了
 */


//ts 不认识图片，只认识js jsx tsx
// import logo from '@/assets/images/logo.png';


//如果你非要用import如何解决?

const duration = 1000;  // 动画的持续时间
const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
}

interface TransitionStyles {
    entering: CSSProperties;
    entered: CSSProperties;
    exiting: CSSProperties;
    exited: CSSProperties;
}

// 动画的生命周期
const transitionStyles: TransitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
};

interface Props {
    currentCategory: string;//当前选中的分类 此数据会放在redux仓库中
    setCurrentCategory: (currentCategory: string) => any; // 改变分类，也会放在仓库中
    refreshLessons: any;
}

function HomeHeader(props: Props) {
    //控制下拉菜单是否显示
    let [isMenuVisible, setIsMenuVisible] = useState(false);

    // 设置当前的分类
    const setCurrentCategory = (event: React.MouseEvent<HTMLUListElement>) => {
        let target: HTMLUListElement = event.target as HTMLUListElement;
        let category = target.dataset.category;
        // 设置当前的分类
        props.setCurrentCategory(category);
        // 然后去重新刷新加载课程
        props.refreshLessons();
        setIsMenuVisible(false);  // 关掉下拉菜单
    }
    return (
        <header className="home-header">
            <div className="logo-header">
                <img src={require('../../../../assets/images/logo.png')} />
                <Icon type="bars" onClick={() => setIsMenuVisible(!isMenuVisible)} />
            </div>
            <Transition in={isMenuVisible} timeout={duration}>
                {
                    (state: keyof TransitionStyles) => (
                        <ul
                            className="category"
                            onClick={setCurrentCategory}  // 给ul绑定，点击li的时候就会冒泡到ul
                            style={{
                                ...defaultStyle,
                                ...transitionStyles[state]
                            }}
                        >
                            <li data-category="all" className={classnames({ active: props.currentCategory === 'all' })}>全部课程</li>
                            <li data-category="react" className={classnames({ active: props.currentCategory === 'react' })}>React课程</li>
                            <li data-category="vue" className={classnames({ active: props.currentCategory === 'vue' })}>Vue课程</li>
                        </ul>
                    )
                }
            </Transition>
        </header>
    )
}
export default HomeHeader;