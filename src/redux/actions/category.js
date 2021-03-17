import axios from 'axios';
import * as types from '../types';

export const addCategory = (payload) => async (dispatch, getState) => {
  try {
    dispatch({ type: types.CATEGORY_ADD_REQUEST, payload: { payload } });
    const { userSignin: { user }, } = getState();
    const bodyFormData = new FormData();

    Object.keys(payload).map(fld => {
      bodyFormData.append(fld, payload[fld]);
      return fld;
    });

    const { data } = await axios.post('/api/category/create/' + user._id, bodyFormData , {
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'multipart/form-data',
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
    const { data } = await axios.get('/api/category');
    dispatch({type: types.CATEGORY_LIST_SUCCESS, payload: data});
    return data
  }
  catch(error){
    dispatch({type: types.CATEGORY_LIST_FAIL, payload: error.message})
  }
}
