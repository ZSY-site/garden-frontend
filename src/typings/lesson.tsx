export interface Lesson {
    id: string;
    title: string; // 标题
    video: string;  // 视频地址
    poster: string;  // 海报地址
    url: string;  // url地址
    price: string;  // 价格
    category: string;  // 分类
}

export interface LessonResult {
    success: boolean;
    data: {
        hasMore: boolean,  // 能否加载更多
        list: Lesson[]  // 当页数据
    };
}

export interface GetLessonData {
    success: boolean,
    data: Lesson
}