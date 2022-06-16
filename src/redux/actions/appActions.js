// You can use CONSTANTS.js file for below definitions of constants and import here.
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const LOADING = "LOADING";
export const LOAD_LOGGED_USER = "LOAD_LOGGED_USER";
// Without THUNK MIDDLEWARE only actions can be dispatched.
export const incrementAction = (payload) => ({
  type: INCREMENT,
  payload
});

// THUNK MIDDLEWARE enables dispatch within action function's return method.
export const increment = (step) => {
  return (dispatch) => {
    console.log("dispatch=", dispatch);
    dispatch(incrementAction(step));
  };
};

export const decrementAction = () => ({
  type: DECREMENT,
});


export const setAppLoadingAction = (payload) => ({
  type: LOADING,
  payload,
});

export const setAppLoading = (isLoading) => {
  return (dispatch) => {
    dispatch(setAppLoadingAction(isLoading));
  };
};


export const setAppLoadUserAction = (payload) => ({
  type: LOAD_LOGGED_USER,
  payload,
});

export const setAppLoadUser = (user) => {
  return (dispatch) => {
    dispatch(setAppLoadUserAction(user));
  };
};



