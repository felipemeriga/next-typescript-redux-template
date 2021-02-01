import {AnyAction} from "redux";
import {HYDRATE} from "next-redux-wrapper";
import ITickState from "./index";


const initialState: ITickState = {
    message: 'init'
};


export function tick(state: ITickState = initialState, action: AnyAction): ITickState {
    switch (action.type) {
        case HYDRATE:
            // Attention! This will overwrite client state! Real apps should use proper reconciliation.
            return {...state};
        case 'TICK':
            return {...state, message: action.payload};
        default:
            return state;
    }
}
