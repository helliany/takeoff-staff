import {authAPI} from "../api/api";

const SET_USER = 'SET_USER';
const SET_SIGNED_UP_USER = 'SET_SIGNED_UP_USER';

let initialState = {
  isAuth: localStorage.getItem('logintoken'),
  isSignedUp: localStorage.getItem('token'),
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload
      }
    case SET_SIGNED_UP_USER:
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

export const setSignedUpUser = (isSignedUp) => ({
  type: SET_SIGNED_UP_USER, payload: {isSignedUp}
});

export const signup = (username, password) => async (dispatch) => {
  const response = await authAPI.signup(username, password);
  if (response && response.status === 201) {
    dispatch(setAuthUser(true));
    dispatch(setSignedUpUser(true));
    localStorage.setItem('token', response.data.accessToken);
    localStorage.setItem('logintoken', response.data.accessToken);
  }
}

export const login = (username, password) => async (dispatch) => {
  const response = await authAPI.login(username, password);
  if (response && response.status === 200) {
    dispatch(setAuthUser(true));
    localStorage.setItem('logintoken', response.data.accessToken);
  }
}

export const logout = () => async (dispatch) => {
  dispatch(setAuthUser(false));
  localStorage.removeItem('logintoken');
}

export default authReducer;
