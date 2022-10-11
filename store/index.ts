import { Context, createWrapper } from "next-redux-wrapper";
import { createStore, Store, applyMiddleware, AnyAction} from "redux";
import { reducer, RootState } from "./reducers";
import thunk from "redux-thunk";
import { ThunkDispatch } from "redux-thunk";

const makeStore = (context: Context) => createStore(reducer, applyMiddleware(thunk));

export const wrapper = createWrapper<Store<RootState>>(makeStore, {debug:true});

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;
