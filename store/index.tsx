import thunk, {ThunkAction, ThunkMiddleware} from "redux-thunk";
import {ActionCreator, AnyAction, applyMiddleware, createStore} from "redux";
import {Context, createWrapper, MakeStore} from "next-redux-wrapper";
import {IStoreState, reducers} from "./reducers";
import {composeWithDevTools} from "redux-devtools-extension";
import {updateTick} from "./tick/actions";

// Instantiating ThunkMiddleware object with the StoreState interface and AnyAction from Redux
const thunkMiddleware = thunk.withExtraArgument({}) as ThunkMiddleware<IStoreState, AnyAction>;

// create a makeStore function
// @ts-ignore
// This makeStore is needed for the wrapper, for every new page that is called, a new store with the current values will be created
const makeStore: MakeStore<IStoreState> = (context: Context) => createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export type ExtraArgument = {};

export type ThunkCreator<R = Promise<any>> = ActionCreator<ThunkAction<R, IStoreState, ExtraArgument, AnyAction>>;

// This is an example Thunk async function, to modify the state as a pragmatical example
export const thunkAsyncFunction: ThunkCreator<Promise<any>> =  () => {
    return async (dispatch, getState) => {
        // @ts-ignore
        // If you want to interact with the state, you can do it using getState();
        const state = getState();

        dispatch(updateTick('updating from thunk...'))
    }
};

// export an assembled wrapper
// this wrapper will be used to every page's component, for injecting the store and actions into it.
const wrapper = createWrapper<IStoreState>(makeStore, {debug: false});

export default wrapper;
