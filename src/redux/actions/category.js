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

export const listAllCategorysPaginate = (pageIndex = 1, pageSize = 5, search= '') => async (dispatch) => {
  try{
    dispatch({type: types.CATEGORY_LIST_REQUEST});
    const { data } = await axios.get(
    '/api/category/listpaginate?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&name=' + search
     );
    dispatch({type: types.CATEGORY_LIST_SUCCESS, payload: data});
    return data
  }
  catch(error){
    dispatch({type: types.CATEGORY_LIST_FAIL, payload: error.message})
  }
}

export const updateCategory = (payload) => async (dispatch, getState) => {
  try {
    dispatch({ type: types.CATEGORY_UPDATE_REQUEST, payload: { payload } });
    const { userSignin: { user }, } = getState();
    const bodyFormData = new FormData();

    Object.keys(payload).forEach(fld => {
      if (Array.isArray(payload[fld])) {
        payload[fld].forEach(item => {
          bodyFormData.append(fld, item);
        });
      } else if (payload[fld] !== undefined && payload[fld] !== null) {
        bodyFormData.append(fld, payload[fld]);
      }
    });

    const { data } = await axios.put(`/api/category/update/${payload.id}/${user._id}`, bodyFormData, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    dispatch({ type: types.CATEGORY_UPDATE_SUCCESS, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    dispatch({ type: types.CATEGORY_UPDATE_FAIL, payload: error.response.data.error });
  }
};

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

export const deleteCategory = (categoryById) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { user },
    } = getState();
    dispatch({ type: types.CATEGORY_DEL_REQUEST, payload: categoryById });
    const { data } = await axios.delete(`/api/category/delete/${categoryById}/${user._id}`, {
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
    });
    dispatch({ type: types.CATEGORY_DEL_SUCCESS, payload: data});
    return data
  } catch (error) {
    dispatch({ type: types.CATEGORY_DEL_FAIL, payload: error.message });
  }
};
