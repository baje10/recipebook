import axios from 'axios';
import Cookie from 'js-cookie';
import * as types from '../types';

export const register = (name, email, password, password2) => async (dispatch) => {
  dispatch({ type: types.USER_SIGNUP_REQUEST, payload: { name, email, password, password2 } });
  try {
    const { data } = await axios.post('/auth/signup', { name, email, password, password2 });
    dispatch({ type: types.USER_SIGNUP_SUCCESS, payload: data });
    localStorage.setItem('token',JSON.stringify(data));
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: types.USER_SIGNUP_FAIL, payload: error.response.data.error });
  }
}

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: types.USER_SIGNIN_REQUEST, payload: {email, password} });
  try{
    const { data } = await axios.post('/auth/signin', {email, password});
    dispatch({ type: types.USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('jwt',JSON.stringify(data));
    Cookie.set('user', JSON.stringify(data));
  } catch (error){
    dispatch({ type: types.USER_SIGNIN_FAIL, payload: error.response.data.error });
  }
}

export const logout = ( data ) => async (dispatch) => {
  Cookie.remove('user');
  localStorage.removeItem('jwt');
  Cookie.remove('userInfo');
  localStorage.removeItem('token');
  dispatch({ type: types.USER_SIGNOUT, payload: '' });
}
