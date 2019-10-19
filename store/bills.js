import { createStore } from "redux";
import { combineReducers } from "redux";

const INITIAL_BILLS_STATE = [
  // { title: "cartão", bill: 945, paid: false, id: 0 }
];

const billsActionTypes = {
  UPDATE: "UPDATE",
  UPDATE_ALL: "UPDATE_ALL",
  DELETE: "DELETE",
  ADD: "ADD"
};

// ACTIONS

export const actionUpdateAllBills = bills => {
  return { type: billsActionTypes.UPDATE_ALL, payload: { bills: bills } };
};

// actions for a single bill

export const actionUpdateBill = (bill, id) => {
  return { type: billsActionTypes.UPDATE, payload: { bill: bill, id: id } };
};
export const actionDeleteBill = id => ({
  type: billsActionTypes.DELETE,
  payload: { id: id }
});
export const actionAddBill = bill => {
  return {
    type: billsActionTypes.ADD,
    payload: { bill: bill }
  };
};

// REDUCER

export const billReducer = (state = INITIAL_BILLS_STATE, action) => {
  switch (action.type) {
    case billsActionTypes.UPDATE:
      return state.map(bill =>
        bill.id === action.payload.id ? action.payload.bill : bill
      );
    case billsActionTypes.DELETE:
      return state.filter(bill => bill.id !== action.payload.id);

    case billsActionTypes.ADD:
      return [
        ...state,
        {
          id: action.payload.bill.id,
          title: action.payload.bill.title,
          bill: action.payload.bill.bill,
          paid: action.payload.bill.paid
        }
      ];
    case billsActionTypes.UPDATE_ALL:
      return action.payload.bills;
    default:
      return state;
  }
};

// const Reducers = combineReducers({
//   billsState: billReducer
// });

// export const Store = createStore(Reducers);
