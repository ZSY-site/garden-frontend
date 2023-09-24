import { Lesson } from './lesson'

// 购物车的一项的类型
export interface CartItem {
    lesson: Lesson,
    count: number,
    checked: boolean
}

export type CartState = CartItem[]