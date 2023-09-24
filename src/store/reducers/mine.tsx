import { AnyAction } from "redux";
import { MineState } from '@/typings/state'

let initialState: MineState = {};

export default function (
    state: MineState = initialState,
    action: AnyAction
): MineState {
    switch (action.type) {
        default:
            return state;
    }
}