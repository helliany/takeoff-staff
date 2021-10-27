import {authAPI} from "../api/api";

const SET_USER = 'SET_USER';

let initialState = {
  isAuth: localStorage.getItem('token'),
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
}

export const setAuthUser = (isAuth) => ({
  type: SET_USER, payload: {isAuth}
});

export const signup = (username, password) => async (dispatch) => {
  const response = await authAPI.signup(username, password);
  if (response && response.status === 201) {
    dispatch(setAuthUser(true));
    console.log(response)
    localStorage.setItem('token', response.data.accessToken);
  } else {
    console.log('message')
    // let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
    // dispatch(stopSubmit("login", {_error: message}));
  }
}

export const login = (username, password) => async (dispatch) => {
  const response = await authAPI.login(username, password);
  if (response && response.status === 201) {
    dispatch(setAuthUser(true));
    console.log(response)
    localStorage.setItem('token', response.data.accessToken);
  } else {
    console.log('message')
    // let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
    // dispatch(stopSubmit("login", {_error: message}));
  }
}

export const logout = () => async (dispatch) => {
  dispatch(setAuthUser(false));
  localStorage.removeItem('token');
}

export default authReducer;
