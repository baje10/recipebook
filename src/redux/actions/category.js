import axios from 'axios';
import * as types from '../types';

export const addCategory = (name) => async (dispatch, getState) => {
  try {
    dispatch({ type: types.CATEGORY_ADD_REQUEST, payload: { name } });
    const { userSignin: { user }, } = getState();
    const { data } = await axios.post('/category/create/' + user._id,  { name }, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    dispatch({ type: types.CATEGORY_ADD_SUCCESS, payload: data });
    return data
  } catch (error) {
    console.log(error)
    dispatch({type: types.CATEGORY_ADD_FAIL, payload: error.response.data.error });
  }
}

export const listCategories = () => async (dispatch) => {
  try{
    dispatch({type: types.CATEGORY_LIST_REQUEST});
    const { data } = await axios.get('/category');
    dispatch({type: types.CATEGORY_LIST_SUCCESS, payload: data});
    return data
  }
  catch(error){
    dispatch({type: types.CATEGORY_LIST_FAIL, payload: error.message})
  }
}
