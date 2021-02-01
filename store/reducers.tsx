import {combineReducers} from "redux";
import {tick} from "./tick/reducers";
import ITickState from "./tick";

export interface IStoreState {
    tick: ITickState;
}

export const reducers = combineReducers( {
   tick: tick
});


