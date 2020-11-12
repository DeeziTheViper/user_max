import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  orders: [],
  error: null,
  loading: false,
};

const getOrderStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getOrderSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.orders,
    error: null,
    loading: false,
  });
};

const getOrderFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};



const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ORDER_START:
      return getOrderStart(state, action);
    case actionTypes.GET_ORDER_SUCCESS:
      return getOrderSuccess(state, action);
    case actionTypes.GET_ORDER_FAIL:
      return getOrderFail(state, action);
    default:
      return state;
  }
};

export default reducer;
