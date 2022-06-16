import { DECREMENT, INCREMENT, LOADING, LOAD_LOGGED_USER } from "redux/actions/appActions";

const initialState = {
  counter: 0,
  appLoading: false,
  userData: {},
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        appLoading: action.payload,
      };
    case INCREMENT:
      return {
        ...state,
        counter: state.counter + (action.payload || 1),
      };
    case DECREMENT:
      return {
        ...state,
        counter: state.counter - 1,
      };
    case LOAD_LOGGED_USER:
      console.log(`LOAD_LOGGED_USER`, action);
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
};
