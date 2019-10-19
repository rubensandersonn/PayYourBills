import { createStore } from "redux";
import { combineReducers } from "redux";

const INITIAL_PAGES_STATE = [
  { title: "cartão", id: 0 },
  { title: "cu", id: 1 },
  { title: "top", id: 2 }
];

// ESTE CARALHO DEVE SER UNICO, SENAO ELE NAO FAZ
const pagesActionTypes = {
  UPDATE: "UPDATE_PAGE",
  UPDATE_ALL: "UPDATE_ALL_PAGE",
  DELETE: "DELETE_PAGE",
  ADD: "ADD_PAGE"
};

// ACTIONS

export const actionUpdateAllPages = pages => {
  return { type: pagesActionTypes.UPDATE_ALL, payload: { pages: pages } };
};

// actions for a single page

export const actionUpdatePage = (page, id) => {
  return {
    type: pagesActionTypes.UPDATE,
    payload: { title: page.title, id: id }
  };
};
export const actionDeletePage = id => ({
  type: pagesActionTypes.DELETE,
  payload: { id: id }
});
export const actionAddPage = page => {
  return {
    type: pagesActionTypes.ADD,
    payload: { page: page }
  };
};

// REDUCER

export const pageReducer = (state = INITIAL_PAGES_STATE, action) => {
  switch (action.type) {
    case pagesActionTypes.UPDATE:
      return state.map(page =>
        page.id === action.payload.id ? action.payload.page : page
      );
    case pagesActionTypes.DELETE:
      return state.filter(page => page.id !== action.payload.id);

    case pagesActionTypes.ADD:
      return [
        ...state,
        {
          id: action.payload.page.id,
          title: action.payload.page.title
        }
      ];
    case pagesActionTypes.UPDATE_ALL:
      return action.payload.pages;
    default:
      return state;
  }
};

// const Reducers = combineReducers({
//   pagesState: pageReducer
// });

// export const Store = createStore(Reducers);
