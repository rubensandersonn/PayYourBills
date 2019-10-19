import { createStore } from "redux";
import { combineReducers } from "redux";
import { billReducer } from "./bills";
import { pageReducer } from "./pages";

const Reducers = combineReducers({
  pagesState: pageReducer,
  billsState: billReducer
});

export const Store = createStore(Reducers);
