import axios from "./index";
import { SliderData, LessonResult } from "@/typings";

export function getSliders() {
    return axios.get<SliderData, SliderData>("/slider/list");
}

/**
 * 获取所有的课程列表
 * @param currentCategory 当前的分类，可以是react vue等，默认值是 all
 * @param offset 从哪个索引开始获取
 * @param limit 限定要返回的条目数
 * @returns 
 */
export function getLessons(currentCategory: string = 'all', offset: number, limit: number) {
    return axios.get<LessonResult, LessonResult>(`/lesson/list?category=${currentCategory}&offset=${offset}&limit=${limit}`);
}


// 获取单个课程详情信息
export function getLesson<T>(id: string) {
    return axios.get<T, T>(`/lesson/${id}`);
}