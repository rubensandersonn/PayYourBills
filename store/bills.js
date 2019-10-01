import { createStore } from "redux";
import { combineReducers } from "redux";

const INITIAL_BILLS_STATE = [
  { title: "cartão", bill: 945, paid: false, id: 0 }
];

const billsActionTypes = {
  UPDATE: "UPDATE",
  UPDATE_ALL: "UPDATE_ALL",
  DELETE: "DELETE",
  ADD: "ADD"
};

// ACTIONS

export const actionUpdateAllBills = bills => {
  console.log("updating...");
  return { type: billsActionTypes.UPDATE_ALL, bills: bills };
};

// actions for a single bill

export const actionUpdateBill = (bill, id) => {
  console.log("updating...");
  return { type: billsActionTypes.UPDATE, bill: bill, id: id };
};
export const actionDeleteBill = id => ({
  type: billsActionTypes.DELETE,
  id: id
});
export const actionAddBill = (bill, id) => ({
  type: billsActionTypes.ADD,
  bill: bill,
  id: id
});

// REDUCER

const billReducer = (state = INITIAL_BILLS_STATE, action) => {
  switch (action.type) {
    case billsActionTypes.UPDATE:
      return state.map(bill =>
        bill.id === action.id ? action.bill : state.bill
      );
    case billsActionTypes.DELETE:
      return state.filter(bill => bill.id === action.id);
    case billsActionTypes.ADD:
      return [...state, action.bill];
    default:
      return state;
  }
};

const allBillsReducer = (state = INITIAL_BILLS_STATE, action) => {
  switch (action.type) {
    case billsActionTypes.UPDATE_ALL:
      return action.bills;
    default:
      return state;
  }
};

const Reducers = combineReducers({
  billsState: billReducer
});

export const Store = createStore(Reducers);
